import "./messages";


// === Badge SBT Item contract ===
trait BaseBadgeItem {

    initialized: Bool;
    index: Int;
    collection: Address;
    owner: Address?;
    content: Cell?;
    authority: Address?;
    revoked_at: Int;

    receive(msg: MintBadgeItemInternal) {
        require(sender() == self.collection, "Invalid sender");
        
        self.initialized = true;
        self.owner = msg.owner;
        self.content = msg.content;
        self.authority = msg.authority;
    }

    receive(msg: RequestOwner) {
        require(self.initialized, "Not initialized");
        let content: Cell? = null;
        if (msg.with_content) {
            content = self.content;
        }

        send(SendParameters {
            to: msg.dest,
            value: 0,
            bounce: true, // should bounce
            mode: SendRemainingValue,
            body: OwnerInfo {
                query_id: msg.query_id, 
                item_id: self.index, 
                initiator: sender(),
                owner: self.owner!!, 
                data: msg.forward_payload, 
                revoked_at: self.revoked_at, 
                content: content
            }.toCell()
        });
    }

    receive(msg: ProveOwnership) {
        require(self.initialized, "Not initialized");
        require(self.owner == sender(), "Invalid sender");
        let content: Cell? = null;
        if (msg.with_content) {
            content = self.content;
        }

        send(SendParameters {
            to: msg.dest,
            value: 0,
            bounce: true, // should bounce
            mode: SendRemainingValue,
            body: OwnershipProof {
                query_id: msg.query_id, 
                item_id: self.index, 
                owner: self.owner!!,
                data: msg.forward_payload,
                revoked_at: self.revoked_at, 
                content: content
            }.toCell()
        });
    }

    receive(msg: GetStaticData) {
        require(self.initialized, "Not initialized");

        send(SendParameters {
            to: sender(),
            value: 0,
            bounce: false,
            mode: SendRemainingValue,
            body: ReportStaticData{
                query_id: msg.query_id,
                index_id: self.index,
                collection: self.collection
            }.toCell(),
        });
    }

    receive(msg: Destroy) {
        require(self.initialized, "Not initialized");
        require(sender() == self.owner!!, "Invalid sender");

        self.owner = null;
        self.authority = null;
        
        send(SendParameters {
            to: self.owner!!,
            value: 0,
            bounce: false,
            mode: SendRemainingBalance,
            body: Excesses{ query_id: msg.query_id }.toCell()
        });
    }

    receive(msg: Revoke) {
        require(self.initialized, "Not initialized");
        require(sender() == self.authority, "Invalid sender");
        require(self.revoked_at == 0, "Already revoked");

        self.revoked_at = now();
    }

    receive(msg: TakeExcess) {
        require(self.initialized, "Not initialized");
        require(sender() == self.owner!!, "Invalid sender");

        nativeReserve(self.storageReserve, ReserveExact);

        send(SendParameters {
            to: self.owner!!,
            value: 0,
            bounce: false,
            mode: SendRemainingBalance,
            body: Excesses{ query_id: msg.query_id }.toCell()
        });
    }

    receive(msg: TransferItem) {
        require(false, "Not supported");
    }

    bounced(msg: bounced<OwnershipProof>) {
        send(SendParameters{
            to: self.owner!!,
            value: 0,
            mode: SendRemainingValue,
            body: OwnershipProofBounced{ query_id: msg.query_id }.toCell()
        });
    }

    // === GETTERS ===

    get fun get_nft_data(): NftData {
        let b: StringBuilder = beginString();
        let collection_str: String = "";
        if (self.content != null) {
            collection_str = (self.content!!).asSlice().asString();
        }
        b.append(collection_str);
        b.append(self.index.toString());
        b.append(".json");

        return NftData {
            initialized: self.initialized, 
            index: self.index,
            collection: self.collection, 
            owner: self.owner,
            individual_content: b.toCell()
        };
    }

    get fun get_authority_address(): Address? {
        return self.authority;
    }

    get fun get_revoked_time(): Int {
        return self.revoked_at;
    }
}