

// === Withdraw Vault Messages ===

message SetWithdrawVaultParams {
    active: Bool?;
    pubkey: Int?;
}

message WithdrawInternal {
    owner: Address;
    amount: Int as coins;
    pubkey: Int;
}

// === Withdraw Account Messages ===

message WithdrawRequest {
    seqno: Int as uint64;
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
