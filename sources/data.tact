
struct DepositVaultData {
    owner: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_amount: Int;
    claimed_bonus_amount: Int;
    active: Bool;
    min_claim_amount: Int;
    bonus_percentage: Int;
}

struct DepositAccountData {
    owner: Address;
    vault: Address;
    referrer: Address?;
    deposit_amount: Int;
    bonus_amount: Int;
}

struct WithdrawVaultData {
    owner: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_amount: Int;
    withdrawn_amount: Int;
    active: Bool;
    pubkey: Int;
}

struct WithdrawAccountData {
    owner: Address;
    vault: Address;
    seqno: Int;
    withdrawn_amount: Int;
}

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
