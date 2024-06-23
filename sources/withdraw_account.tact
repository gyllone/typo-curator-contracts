import "@stdlib/ownable";
import "./messages";


trait BaseWithdrawAccount with Ownable {

    owner: Address; // from Ownable

    vault: Address;
    seqno: Int;

    receive(msg: WithdrawRequest) {
        self.requireOwner();
        require(msg.seqno == self.seqno, "Invalid seqno");
        require(msg.amount > 0, "Zero amount");
        
        let payload: Slice = beginCell()
            .storeAddress(self.vault)
            .storeAddress(self.owner)
            .storeUint(msg.seqno, 64)
            .storeCoins(msg.amount)
            .asSlice();
        require(
            checkDataSignature(payload, msg.signature, msg.pubkey),
            "Invalid signature",
        );

        self.seqno += 1;

        send(SendParameters {
            bounce: false,
            to: self.vault,
            value: 0,
            mode: SendRemainingValue,
            body: WithdrawInternal {
                owner: self.owner,
                amount: msg.amount,
                pubkey: msg.pubkey
            }.toCell()
        });
    }

    inline fun _get_account_address(owner: Address): Address {
        let sinit: StateInit = self._get_account_state_init(owner);
        return contractAddress(sinit);
    }

    abstract inline fun _get_account_state_init(owner: Address): StateInit;
}