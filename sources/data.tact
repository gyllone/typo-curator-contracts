


struct CollectionData {
    next_item_index: Int;
    content: Cell;
    owner: Address;
}

struct NftData { 
    initialized: Bool;
    index: Int;
    collection: Address; 
    owner: Address?;
    individual_content: Cell;
}