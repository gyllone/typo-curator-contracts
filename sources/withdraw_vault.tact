import "@stdlib/ownable";
import "./library/jetton_wallet";
import "./messages";
import "./data";


trait BaseWithdrawVault with OwnableTransferable {

    owner: Address; // from OwnableTransferable

    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_amount: Int;
    withdrawn_amount: Int;

    active: Bool;
    pubkey: Int;

    receive(msg: SetWithdrawVaultParams) {
        self.requireOwner();

        if (msg.active != null) {
            self.active = msg.active!!;
        }
        if (msg.pubkey != null) {
            self.pubkey = msg.pubkey!!;
        }

        // refund gas
        self.notify(null);
    }

    receive(msg: JettonNotification) {
        require(sender() == self._get_jetton_wallet_address(), "Only jetton wallet");

        self.jetton_amount += msg.amount;

        // refund gas
        self.forward(msg.from, null, false, null);
    }

    receive(msg: WithdrawInternal) {
        require(self.active, "Not active");
        require(sender() == self._get_account_address(msg.owner), "Only account");
        require(msg.pubkey == self.pubkey, "Invalid pubkey");
        require(self.jetton_amount >= msg.amount, "Insufficient jetton amount");

        self.jetton_amount -= msg.amount;
        self.withdrawn_amount += msg.amount;

        nativeReserve(self.storageReserve, ReserveExact);
        send(SendParameters {
            bounce: false,
            to: self._get_jetton_wallet_address(),
            value: 0,
            mode: SendRemainingBalance,
            body: JettonTransfer {
                query_id: 0,
                amount: msg.amount,
                destination: msg.owner,
                response_destination: msg.owner,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: beginCell().storeBool(false).asSlice()
            }.toCell()
        });
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

    // === Getters ===

    get fun get_data(): WithdrawVaultData {
        return WithdrawVaultData {
            owner: self.owner,
            jetton_master: self.jetton_master,
            jetton_wallet_code: self.jetton_wallet_code,
            jetton_amount: self.jetton_amount,
            withdrawn_amount: self.withdrawn_amount,
            active: self.active,
            pubkey: self.pubkey
        };
    }
}