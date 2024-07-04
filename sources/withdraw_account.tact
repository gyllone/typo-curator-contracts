import "@stdlib/ownable";
import "./messages";
import "./data";


trait BaseWithdrawAccount with Ownable {

    owner: Address; // from Ownable

    vault: Address;
    seqno: Int;
    withdrawn_amount: Int;

    receive(msg: WithdrawRequest) {
        self.requireOwner();
        require(msg.seqno == self.seqno, "Invalid seqno");
        require(msg.amount > 0, "Zero amount");
        require(msg.expiration >= now(), "Signature expired");
        
        let digest: Int = beginCell()
            .storeAddress(myAddress())
            .storeUint(msg.seqno, 64)
            .storeUint(msg.expiration, 64)
            .storeCoins(msg.amount)
            .endCell()
            .hash();
        require(
            checkSignature(digest, msg.signature, msg.pubkey),
            "Invalid signature",
        );

        self.seqno += 1;
        self.withdrawn_amount += msg.amount;

        self.forward(
            self.vault,
            WithdrawInternal {
                amount: msg.amount,
                owner: self.owner,
                pubkey: msg.pubkey
            }.toCell(),
            true, // should bounce
            null,
        );
    }

    bounced(src: bounced<WithdrawInternal>) {
        self.withdrawn_amount -= src.amount;
    }

    inline fun _get_account_address(owner: Address): Address {
        let sinit: StateInit = self._get_account_state_init(owner);
        return contractAddress(sinit);
    }

    abstract inline fun _get_account_state_init(owner: Address): StateInit;

    // == Getters ==

    get fun get_data(): WithdrawAccountData {
        return WithdrawAccountData {
            owner: self.owner,
            vault: self.vault,
            seqno: self.seqno,
            withdrawn_amount: self.withdrawn_amount
        };
    }
}