

// === Withdraw Vault Messages ===

message SetWithdrawVaultParams {
    active: Bool?;
    pubkey: Int?;
}

message WithdrawInternal {
    amount: Int as coins;
    owner: Address;
    pubkey: Int;
}

// === Withdraw Account Messages ===

message WithdrawRequest {
    seqno: Int as uint64;
    expiration: Int as uint64;
    amount: Int as coins;
    pubkey: Int;
    signature: Slice as remaining;
}

// === Deposit Vault Messages

message RequestBonusInternal {
    amount: Int as coins;
    beneficiary: Address;
}

message SetDepositVaultParams {
    active: Bool?;
    min_claim_amount: Int?;
    bonus_percentage: Int?;
}

message OwnerWithdrawRequest {
    amount: Int as coins;
}

// === Deposit Account Messages ===

message DepositInternal {
    delegator: Address;
    referrer: Address;
    deposit_amount: Int as coins;
    bonus_amount: Int as coins;
}

message NotifyBonusInternal {
    from: Address;
    refund_to: Address;
    amount: Int as coins;
}

// === Jetton Messages ===

message(0x7362d09c) JettonNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    forward_payload: Slice as remaining;
}

message(0xf8a7ea5) JettonTransfer {
    query_id: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}

// === NFT Collection Messages ===

message MintBadgeItem {
    index: Int as uint64;
    expiration: Int as uint64;
    signature: Slice as remaining;
}

message SetBadgeCollectionPubkey {
    pubkey: Int;
}

// === NFT Item Messages ===

message MintBadgeItemInternal {
    owner: Address;
    authority: Address;
}

message(0xd0c3bfea) RequestOwner {
    query_id: Int as uint64;
    dest: Address;
    forward_payload: Cell;
    with_content: Bool;
}

message(0x0dd607e3) OwnerInfo {
    query_id: Int as uint64;
    item_id: Int as uint256;
    initiator: Address;
    owner: Address;
    data: Cell;
    revoked_at: Int as uint64;
    content: Cell?;
}

message(0x04ded148) ProveOwnership {
    query_id: Int as uint64;
    dest: Address;
    forward_payload: Cell;
    with_content: Bool;
}

message(0x0524c7ae) OwnershipProof {
    query_id: Int as uint64;
    item_id: Int as uint256;
    owner: Address;
    data: Cell;
    revoked_at: Int as uint64;
    content: Cell?;
}

message(0x2fcb26a2) GetStaticData { 
    query_id: Int as uint64;
}

message(0x8b771735) ReportStaticData {
    query_id: Int as uint64;
    index_id: Int;
    collection: Address;
}

message(0x1f04537a) Destroy {
    query_id: Int as uint64;
}

message(0xd53276db) Excesses {
    query_id: Int as uint64;
}

message(0x6f89f5e3) Revoke {
    query_id: Int as uint64;
}

message(0xd136d3b3) TakeExcess {
    query_id: Int as uint64;
}

message(0x5fcc3d14) TransferItem {
    query_id: Int as uint64;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_amount: Int as coins;
    forward_payload: Slice as remaining;
}

message(0xc18e86d2) OwnershipProofBounced {
    query_id: Int as uint64;
}
