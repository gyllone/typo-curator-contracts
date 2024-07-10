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
        require(msg.expiration >= now(), "Signature expired");

        let digest: Int = beginCell()
            .storeAddress(myAddress())
            .storeUint(msg.index, 64)
            .storeUint(msg.expiration, 64)
            .storeAddress(msg.owner)
            .storeAddress(msg.authority)
            // .storeRef(msg.content)
            .endCell()
            .hash();
        require(
            checkSignature(digest, msg.signature, self.pubkey),
            "Invalid signature",
        );

        self.next_item_index += 1;

        let sinit: StateInit = self._get_badge_item_init(msg.index);
        self.forward(
            contractAddress(sinit),
            MintBadgeItemInternal {
                owner: msg.owner,
                // content: msg.content,
                authority: msg.authority
            }.toCell(),
            false,
            sinit,
        );
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
        b.append("collection.json");
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
    
    get fun get_nft_content(index: Int, _individual_content: Cell): Cell {
        let b: StringBuilder = beginString();
        b.append(self.content.asSlice().asString());
        b.append("items/");
        b.append(index.toString());
        b.append(".json");
        return b.toCell();
    }
}