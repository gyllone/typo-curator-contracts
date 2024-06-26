import "@stdlib/ownable";
import "./messages";
import "./data";


trait BaseDepositAccount with Ownable {

    owner: Address; // from Ownable

    vault: Address;
    referrer: Address?;
    deposit_amount: Int;
    bonus_amount: Int;

    receive(msg: DepositInternal) {
        require(sender() == self.vault, "Invalid sender");

        if (self.deposit_amount == 0 && msg.referrer != self.owner) {
            // first deposit
            self.deposit_amount = msg.deposit_amount;
            self.referrer = msg.referrer;

            // notify account of referrer for bonus
            let sinit: StateInit = self._get_account_state_init(msg.referrer);
            self.forward(
                contractAddress(sinit),
                NotifyBonusInternal {
                    from: self.owner,
                    refund_to: msg.delegator,
                    amount: msg.bonus_amount,
                }.toCell(),
                false,
                sinit,
            );
        } else {
            self.deposit_amount += msg.deposit_amount;

            // refund gas
            self.forward(msg.delegator, null, false, null);
        }
    }

    receive(msg: NotifyBonusInternal) {
        require(sender() == self._get_account_address(msg.from), "Invalid sender");

        self.bonus_amount += msg.amount;

        // refund gas
        self.forward(msg.refund_to, null, false, null);
    }

    receive("claim bonus") {
        self.requireOwner();
        require(self.bonus_amount > 0, "Zero bonus");
        
        let amount: Int = self.bonus_amount;
        self.bonus_amount = 0;

        send(SendParameters {
            bounce: true,
            to: self.vault,
            value: 0,
            mode: SendRemainingValue,
            body: RequestBonusInternal {
                amount: amount,
                beneficiary: self.owner,
            }.toCell()
        });
    }

    bounced(src: bounced<RequestBonusInternal>) {
        self.bonus_amount += src.amount;
    }

    inline fun _get_account_address(owner: Address): Address {
        let sinit: StateInit = self._get_account_state_init(owner);
        return contractAddress(sinit);
    }

    abstract inline fun _get_account_state_init(owner: Address): StateInit;

    // === Getter Functions === //

    get fun get_data(): DepositAccountData {
        return DepositAccountData {
            owner: self.owner,
            vault: self.vault,
            referrer: self.referrer,
            deposit_amount: self.deposit_amount,
            bonus_amount: self.bonus_amount,
        };
    }
}