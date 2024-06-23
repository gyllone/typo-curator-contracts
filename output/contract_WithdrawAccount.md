# TACT Compilation Report
Contract: WithdrawAccount
BOC Size: 1301 bytes

# Types
Total Types: 17

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
TLB: `withdraw_internal#5506a2c3 owner:address amount:coins pubkey:int257 = WithdrawInternal`
Signature: `WithdrawInternal{owner:address,amount:coins,pubkey:int257}`

## WithdrawRequest
TLB: `withdraw_request#d1911dab seqno:uint64 amount:coins pubkey:int257 signature:remainder<slice> = WithdrawRequest`
Signature: `WithdrawRequest{seqno:uint64,amount:coins,pubkey:int257,signature:remainder<slice>}`

## RequestBonusInternal
TLB: `request_bonus_internal#40ba1d39 amount:coins beneficiary:address = RequestBonusInternal`
Signature: `RequestBonusInternal{amount:coins,beneficiary:address}`

## SetDepositVaultParams
TLB: `set_deposit_vault_params#cf58593a active:Maybe bool min_claim_amount:Maybe int257 bonus_percentage:Maybe int257 = SetDepositVaultParams`
Signature: `SetDepositVaultParams{active:Maybe bool,min_claim_amount:Maybe int257,bonus_percentage:Maybe int257}`

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

# Get Methods
Total Get Methods: 1

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
4429: Invalid sender
7189: Zero amount
16960: Invalid claim amount
17654: Invalid seqno
21420: Insufficient jetton amount
36680: Only account
36884: Invalid pubkey
45150: Only jetton wallet
48401: Invalid signature
51754: Insufficient funds
61530: Not active
63788: Zero bonus