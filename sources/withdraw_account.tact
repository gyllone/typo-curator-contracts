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
        
        let digest: Int = beginCell()
            .storeAddress(myAddress())
            .storeUint(msg.seqno, 64)
            .storeCoins(msg.amount)
            .endCell()
            .hash();
        require(
            checkSignature(digest, msg.signature, msg.pubkey),
            "Invalid signature",
        );

        self.seqno += 1;
        self.withdrawn_amount += msg.amount;

        send(SendParameters {
            bounce: true, // allow bounce
            to: self.vault,
            value: 0,
            mode: SendRemainingValue,
            body: WithdrawInternal {
                amount: msg.amount,
                owner: self.owner,
                pubkey: msg.pubkey
            }.toCell()
        });
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