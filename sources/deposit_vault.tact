import "@stdlib/ownable";
import "./library/jetton_wallet";
import "./messages";
import "./data";


trait BaseDepositVault with OwnableTransferable {

    owner: Address; // from OwnableTransferable

    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_amount: Int;
    claimed_bonus_amount: Int;

    active: Bool;
    min_claim_amount: Int;
    bonus_percentage: Int;

    receive(msg: JettonNotification) {
        require(sender() == self._get_jetton_wallet_address(), "Invalid sender");

        self.jetton_amount += msg.amount;

        if (msg.forward_payload.bits() == 267 + 267) {
            let beneficiary: Address = msg.forward_payload.loadAddress();
            let referrer: Address = msg.forward_payload.loadAddress();
            
            let bonus_amount: Int = msg.amount * self.bonus_percentage / 100;
            let sinit: StateInit = self._get_account_init(beneficiary);
            self.forward(
                contractAddress(sinit),
                DepositInternal {
                    delegator: msg.from,
                    referrer: referrer,
                    deposit_amount: msg.amount,
                    bonus_amount: bonus_amount
                }.toCell(),
                false,
                sinit,
            );
        }
    }

    receive(msg: RequestBonusInternal) {
        require(self.active, "Not active");
        require(sender() == self._get_account_address(msg.beneficiary), "Invalid sender");
        require(msg.amount >= self.min_claim_amount, "Invalid claim amount");
        require(self.jetton_amount >= msg.amount, "Insufficient funds");

        self.jetton_amount -= msg.amount;
        self.claimed_bonus_amount += msg.amount;

        nativeReserve(self.storageReserve, ReserveExact);
        send(SendParameters {
            bounce: false,
            to: self._get_jetton_wallet_address(),
            value: 0,
            mode: SendRemainingBalance,
            body: JettonTransfer {
                query_id: 0,
                amount: msg.amount,
                destination: msg.beneficiary,
                response_destination: msg.beneficiary,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: emptySlice()
            }.toCell(),
        });
    }

    receive(msg: SetDepositVaultParams) {
        self.requireOwner();

        if (msg.active != null) {
            self.active = msg.active!!;
        }
        if (msg.min_claim_amount != null) {
            self.min_claim_amount = msg.min_claim_amount!!;
        }
        if (msg.bonus_percentage != null) {
            self.bonus_percentage = msg.bonus_percentage!!;
        }

        // refund gas
        self.notify(null);
    }

    inline fun _get_jetton_wallet_address(): Address {
        let sinit: StateInit = get_jetton_wallet_state_init(
            myAddress(),
            self.jetton_master,
            self.jetton_wallet_code
        );
        return compute_jetton_wallet_address(sinit);
    }

    inline fun _get_account_address(owner: Address): Address {
        let sinit: StateInit = self._get_account_init(owner);
        return contractAddress(sinit);
    }

    abstract inline fun _get_account_init(owner: Address): StateInit;

    // === GETTERS ===

    get fun get_data(): DepositVaultData {
        return DepositVaultData {
            owner: self.owner,
            jetton_master: self.jetton_master,
            jetton_wallet_code: self.jetton_wallet_code,
            jetton_amount: self.jetton_amount,
            claimed_bonus_amount: self.claimed_bonus_amount,
            active: self.active,
            min_claim_amount: self.min_claim_amount,
            bonus_percentage: self.bonus_percentage
        };
    }
}