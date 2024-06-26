import "@stdlib/ownable";
import "./messages";
import "./data";


// === Badge SBT collection contract ===
trait BaseBadgeCollection with OwnableTransferable {

    owner: Address; // from OwnableTransferrable

    next_item_index: Int;               
    content: Cell;

    pubkey: Int;

    receive(msg: MintBadgeItem) {
        require(msg.index == self.next_item_index, "Invalid item index");

        let digest: Int = beginCell()
            .storeAddress(myAddress())
            .storeUint(msg.index, 64)
            .storeAddress(msg.owner)
            .storeAddress(msg.authority)
            .storeRef(msg.content)
            .endCell()
            .hash();
        require(
            checkSignature(digest, msg.signature, self.pubkey),
            "Invalid signature",
        );

        self.next_item_index += 1;

        nativeReserve(self.storageReserve, ReserveExact);

        let sinit: StateInit = self._get_badge_item_init(msg.index);
        send(SendParameters {
            to: contractAddress(sinit), 
            value: 0,
            bounce: false,
            mode: SendRemainingBalance,
            body: MintBadgeItemInternal {
                owner: msg.owner,
                content: msg.content,
                authority: msg.authority
            }.toCell(),
            code: sinit.code,
            data: sinit.data
        });
    }

    receive(msg: SetBadgeCollectionPubkey) {
        self.requireOwner();

        self.pubkey = msg.pubkey;

        // refund gas
        self.notify(null);
    }
    
    abstract inline fun _get_badge_item_init(index: Int): StateInit;

    // === GETTERS ===

    get fun get_collection_data(): CollectionData {
        let b: StringBuilder = beginString();
        b.append(self.content.asSlice().asString());
        b.append(".json");

        return CollectionData {
            next_item_index: self.next_item_index, 
            content: b.toCell(), 
            owner: self.owner
        };
    }

    get fun get_nft_address_by_index(index: Int): Address?{      
        let sinit: StateInit = self._get_badge_item_init(index);
        return contractAddress(sinit);
    }
    
    get fun get_nft_content(index: Int, individual_content: Cell): Cell { 
        let b: StringBuilder = beginString();
        b.append(self.content.asSlice().asString());
        b.append(individual_content.asSlice().asString());
        return b.toCell();
    }
}