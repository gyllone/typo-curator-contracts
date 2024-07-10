# TACT Compilation Report
Contract: WithdrawVault
BOC Size: 2318 bytes

# Types
Total Types: 39

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## DepositVaultData
TLB: `_ owner:address jetton_master:address jetton_wallet_code:^cell jetton_amount:int257 claimed_bonus_amount:int257 active:bool min_claim_amount:int257 bonus_percentage:int257 = DepositVaultData`
Signature: `DepositVaultData{owner:address,jetton_master:address,jetton_wallet_code:^cell,jetton_amount:int257,claimed_bonus_amount:int257,active:bool,min_claim_amount:int257,bonus_percentage:int257}`

## DepositAccountData
TLB: `_ owner:address vault:address referrer:Maybe address deposit_amount:int257 bonus_amount:int257 = DepositAccountData`
Signature: `DepositAccountData{owner:address,vault:address,referrer:Maybe address,deposit_amount:int257,bonus_amount:int257}`

## WithdrawVaultData
TLB: `_ owner:address jetton_master:address jetton_wallet_code:^cell jetton_amount:int257 withdrawn_amount:int257 active:bool pubkey:int257 = WithdrawVaultData`
Signature: `WithdrawVaultData{owner:address,jetton_master:address,jetton_wallet_code:^cell,jetton_amount:int257,withdrawn_amount:int257,active:bool,pubkey:int257}`

## WithdrawAccountData
TLB: `_ owner:address vault:address seqno:int257 withdrawn_amount:int257 = WithdrawAccountData`
Signature: `WithdrawAccountData{owner:address,vault:address,seqno:int257,withdrawn_amount:int257}`

## CollectionData
TLB: `_ next_item_index:int257 content:^cell owner:address = CollectionData`
Signature: `CollectionData{next_item_index:int257,content:^cell,owner:address}`

## NftData
TLB: `_ initialized:bool index:int257 collection:address owner:Maybe address individual_content:^cell = NftData`
Signature: `NftData{initialized:bool,index:int257,collection:address,owner:Maybe address,individual_content:^cell}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## SetWithdrawVaultParams
TLB: `set_withdraw_vault_params#3f6536bd active:Maybe bool pubkey:Maybe int257 = SetWithdrawVaultParams`
Signature: `SetWithdrawVaultParams{active:Maybe bool,pubkey:Maybe int257}`

## WithdrawInternal
TLB: `withdraw_internal#c00099eb amount:coins owner:address pubkey:int257 = WithdrawInternal`
Signature: `WithdrawInternal{amount:coins,owner:address,pubkey:int257}`

## WithdrawRequest
TLB: `withdraw_request#8e9b47e0 seqno:uint64 expiration:uint64 amount:coins pubkey:int257 signature:remainder<slice> = WithdrawRequest`
Signature: `WithdrawRequest{seqno:uint64,expiration:uint64,amount:coins,pubkey:int257,signature:remainder<slice>}`

## RequestBonusInternal
TLB: `request_bonus_internal#40ba1d39 amount:coins beneficiary:address = RequestBonusInternal`
Signature: `RequestBonusInternal{amount:coins,beneficiary:address}`

## SetDepositVaultParams
TLB: `set_deposit_vault_params#cf58593a active:Maybe bool min_claim_amount:Maybe int257 bonus_percentage:Maybe int257 = SetDepositVaultParams`
Signature: `SetDepositVaultParams{active:Maybe bool,min_claim_amount:Maybe int257,bonus_percentage:Maybe int257}`

## OwnerWithdrawRequest
TLB: `owner_withdraw_request#f95d7a5e amount:coins = OwnerWithdrawRequest`
Signature: `OwnerWithdrawRequest{amount:coins}`

## DepositInternal
TLB: `deposit_internal#499d5f23 delegator:address referrer:address deposit_amount:coins bonus_amount:coins = DepositInternal`
Signature: `DepositInternal{delegator:address,referrer:address,deposit_amount:coins,bonus_amount:coins}`

## NotifyBonusInternal
TLB: `notify_bonus_internal#2e980679 from:address refund_to:address amount:coins = NotifyBonusInternal`
Signature: `NotifyBonusInternal{from:address,refund_to:address,amount:coins}`

## JettonNotification
TLB: `jetton_notification#7362d09c query_id:uint64 amount:coins from:address forward_payload:remainder<slice> = JettonNotification`
Signature: `JettonNotification{query_id:uint64,amount:coins,from:address,forward_payload:remainder<slice>}`

## JettonTransfer
TLB: `jetton_transfer#0f8a7ea5 query_id:uint64 amount:coins destination:address response_destination:address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = JettonTransfer`
Signature: `JettonTransfer{query_id:uint64,amount:coins,destination:address,response_destination:address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## MintBadgeItem
TLB: `mint_badge_item#8f2d1a47 index:uint64 expiration:uint64 owner:address authority:address signature:remainder<slice> = MintBadgeItem`
Signature: `MintBadgeItem{index:uint64,expiration:uint64,owner:address,authority:address,signature:remainder<slice>}`

## SetBadgeCollectionPubkey
TLB: `set_badge_collection_pubkey#a315f92a pubkey:int257 = SetBadgeCollectionPubkey`
Signature: `SetBadgeCollectionPubkey{pubkey:int257}`

## MintBadgeItemInternal
TLB: `mint_badge_item_internal#4dcf318c owner:address authority:address = MintBadgeItemInternal`
Signature: `MintBadgeItemInternal{owner:address,authority:address}`

## RequestOwner
TLB: `request_owner#d0c3bfea query_id:uint64 dest:address forward_payload:^cell with_content:bool = RequestOwner`
Signature: `RequestOwner{query_id:uint64,dest:address,forward_payload:^cell,with_content:bool}`

## OwnerInfo
TLB: `owner_info#0dd607e3 query_id:uint64 item_id:uint256 initiator:address owner:address data:^cell revoked_at:uint64 content:Maybe ^cell = OwnerInfo`
Signature: `OwnerInfo{query_id:uint64,item_id:uint256,initiator:address,owner:address,data:^cell,revoked_at:uint64,content:Maybe ^cell}`

## ProveOwnership
TLB: `prove_ownership#04ded148 query_id:uint64 dest:address forward_payload:^cell with_content:bool = ProveOwnership`
Signature: `ProveOwnership{query_id:uint64,dest:address,forward_payload:^cell,with_content:bool}`

## OwnershipProof
TLB: `ownership_proof#0524c7ae query_id:uint64 item_id:uint256 owner:address data:^cell revoked_at:uint64 content:Maybe ^cell = OwnershipProof`
Signature: `OwnershipProof{query_id:uint64,item_id:uint256,owner:address,data:^cell,revoked_at:uint64,content:Maybe ^cell}`

## GetStaticData
TLB: `get_static_data#2fcb26a2 query_id:uint64 = GetStaticData`
Signature: `GetStaticData{query_id:uint64}`

## ReportStaticData
TLB: `report_static_data#8b771735 query_id:uint64 index_id:int257 collection:address = ReportStaticData`
Signature: `ReportStaticData{query_id:uint64,index_id:int257,collection:address}`

## Destroy
TLB: `destroy#1f04537a query_id:uint64 = Destroy`
Signature: `Destroy{query_id:uint64}`

## Excesses
TLB: `excesses#d53276db query_id:uint64 = Excesses`
Signature: `Excesses{query_id:uint64}`

## Revoke
TLB: `revoke#6f89f5e3 query_id:uint64 = Revoke`
Signature: `Revoke{query_id:uint64}`

## TakeExcess
TLB: `take_excess#d136d3b3 query_id:uint64 = TakeExcess`
Signature: `TakeExcess{query_id:uint64}`

## TransferItem
TLB: `transfer_item#5fcc3d14 query_id:uint64 new_owner:address response_destination:address custom_payload:Maybe ^cell forward_amount:coins forward_payload:remainder<slice> = TransferItem`
Signature: `TransferItem{query_id:uint64,new_owner:address,response_destination:address,custom_payload:Maybe ^cell,forward_amount:coins,forward_payload:remainder<slice>}`

## OwnershipProofBounced
TLB: `ownership_proof_bounced#c18e86d2 query_id:uint64 = OwnershipProofBounced`
Signature: `OwnershipProofBounced{query_id:uint64}`

# Get Methods
Total Get Methods: 2

## get_data

## owner

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
1710: Not supported
4429: Invalid sender
7189: Zero amount
7657: Not initialized
10990: Already revoked
16960: Invalid claim amount
17654: Invalid seqno
21420: Insufficient jetton amount
36680: Only account
36884: Invalid pubkey
41096: Signature expired
45150: Only jetton wallet
48401: Invalid signature
51754: Insufficient funds
59449: Invalid item index
61530: Not active
63788: Zero bonus