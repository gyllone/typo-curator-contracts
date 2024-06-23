import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type SetWithdrawVaultParams = {
    $$type: 'SetWithdrawVaultParams';
    active: boolean | null;
    pubkey: bigint | null;
}

export function storeSetWithdrawVaultParams(src: SetWithdrawVaultParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1063597757, 32);
        if (src.active !== null && src.active !== undefined) { b_0.storeBit(true).storeBit(src.active); } else { b_0.storeBit(false); }
        if (src.pubkey !== null && src.pubkey !== undefined) { b_0.storeBit(true).storeInt(src.pubkey, 257); } else { b_0.storeBit(false); }
    };
}

export function loadSetWithdrawVaultParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1063597757) { throw Error('Invalid prefix'); }
    let _active = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _pubkey = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'SetWithdrawVaultParams' as const, active: _active, pubkey: _pubkey };
}

function loadTupleSetWithdrawVaultParams(source: TupleReader) {
    let _active = source.readBooleanOpt();
    let _pubkey = source.readBigNumberOpt();
    return { $$type: 'SetWithdrawVaultParams' as const, active: _active, pubkey: _pubkey };
}

function storeTupleSetWithdrawVaultParams(source: SetWithdrawVaultParams) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.active);
    builder.writeNumber(source.pubkey);
    return builder.build();
}

function dictValueParserSetWithdrawVaultParams(): DictionaryValue<SetWithdrawVaultParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetWithdrawVaultParams(src)).endCell());
        },
        parse: (src) => {
            return loadSetWithdrawVaultParams(src.loadRef().beginParse());
        }
    }
}

export type WithdrawInternal = {
    $$type: 'WithdrawInternal';
    owner: Address;
    amount: bigint;
    pubkey: bigint;
}

export function storeWithdrawInternal(src: WithdrawInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1426498243, 32);
        b_0.storeAddress(src.owner);
        b_0.storeCoins(src.amount);
        b_0.storeInt(src.pubkey, 257);
    };
}

export function loadWithdrawInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1426498243) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _pubkey = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawInternal' as const, owner: _owner, amount: _amount, pubkey: _pubkey };
}

function loadTupleWithdrawInternal(source: TupleReader) {
    let _owner = source.readAddress();
    let _amount = source.readBigNumber();
    let _pubkey = source.readBigNumber();
    return { $$type: 'WithdrawInternal' as const, owner: _owner, amount: _amount, pubkey: _pubkey };
}

function storeTupleWithdrawInternal(source: WithdrawInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.pubkey);
    return builder.build();
}

function dictValueParserWithdrawInternal(): DictionaryValue<WithdrawInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawInternal(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawInternal(src.loadRef().beginParse());
        }
    }
}

export type WithdrawRequest = {
    $$type: 'WithdrawRequest';
    seqno: bigint;
    amount: bigint;
    pubkey: bigint;
    signature: Cell;
}

export function storeWithdrawRequest(src: WithdrawRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3515948459, 32);
        b_0.storeUint(src.seqno, 64);
        b_0.storeCoins(src.amount);
        b_0.storeInt(src.pubkey, 257);
        b_0.storeBuilder(src.signature.asBuilder());
    };
}

export function loadWithdrawRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3515948459) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _pubkey = sc_0.loadIntBig(257);
    let _signature = sc_0.asCell();
    return { $$type: 'WithdrawRequest' as const, seqno: _seqno, amount: _amount, pubkey: _pubkey, signature: _signature };
}

function loadTupleWithdrawRequest(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _pubkey = source.readBigNumber();
    let _signature = source.readCell();
    return { $$type: 'WithdrawRequest' as const, seqno: _seqno, amount: _amount, pubkey: _pubkey, signature: _signature };
}

function storeTupleWithdrawRequest(source: WithdrawRequest) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.pubkey);
    builder.writeSlice(source.signature);
    return builder.build();
}

function dictValueParserWithdrawRequest(): DictionaryValue<WithdrawRequest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawRequest(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawRequest(src.loadRef().beginParse());
        }
    }
}

export type RequestBonusInternal = {
    $$type: 'RequestBonusInternal';
    amount: bigint;
    beneficiary: Address;
}

export function storeRequestBonusInternal(src: RequestBonusInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1085939001, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.beneficiary);
    };
}

export function loadRequestBonusInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1085939001) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _beneficiary = sc_0.loadAddress();
    return { $$type: 'RequestBonusInternal' as const, amount: _amount, beneficiary: _beneficiary };
}

function loadTupleRequestBonusInternal(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _beneficiary = source.readAddress();
    return { $$type: 'RequestBonusInternal' as const, amount: _amount, beneficiary: _beneficiary };
}

function storeTupleRequestBonusInternal(source: RequestBonusInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.beneficiary);
    return builder.build();
}

function dictValueParserRequestBonusInternal(): DictionaryValue<RequestBonusInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRequestBonusInternal(src)).endCell());
        },
        parse: (src) => {
            return loadRequestBonusInternal(src.loadRef().beginParse());
        }
    }
}

export type SetDepositVaultParams = {
    $$type: 'SetDepositVaultParams';
    active: boolean | null;
    min_claim_amount: bigint | null;
    bonus_percentage: bigint | null;
}

export function storeSetDepositVaultParams(src: SetDepositVaultParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3478673722, 32);
        if (src.active !== null && src.active !== undefined) { b_0.storeBit(true).storeBit(src.active); } else { b_0.storeBit(false); }
        if (src.min_claim_amount !== null && src.min_claim_amount !== undefined) { b_0.storeBit(true).storeInt(src.min_claim_amount, 257); } else { b_0.storeBit(false); }
        if (src.bonus_percentage !== null && src.bonus_percentage !== undefined) { b_0.storeBit(true).storeInt(src.bonus_percentage, 257); } else { b_0.storeBit(false); }
    };
}

export function loadSetDepositVaultParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3478673722) { throw Error('Invalid prefix'); }
    let _active = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _min_claim_amount = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _bonus_percentage = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'SetDepositVaultParams' as const, active: _active, min_claim_amount: _min_claim_amount, bonus_percentage: _bonus_percentage };
}

function loadTupleSetDepositVaultParams(source: TupleReader) {
    let _active = source.readBooleanOpt();
    let _min_claim_amount = source.readBigNumberOpt();
    let _bonus_percentage = source.readBigNumberOpt();
    return { $$type: 'SetDepositVaultParams' as const, active: _active, min_claim_amount: _min_claim_amount, bonus_percentage: _bonus_percentage };
}

function storeTupleSetDepositVaultParams(source: SetDepositVaultParams) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.active);
    builder.writeNumber(source.min_claim_amount);
    builder.writeNumber(source.bonus_percentage);
    return builder.build();
}

function dictValueParserSetDepositVaultParams(): DictionaryValue<SetDepositVaultParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetDepositVaultParams(src)).endCell());
        },
        parse: (src) => {
            return loadSetDepositVaultParams(src.loadRef().beginParse());
        }
    }
}

export type DepositInternal = {
    $$type: 'DepositInternal';
    delegator: Address;
    referrer: Address;
    deposit_amount: bigint;
    bonus_amount: bigint;
}

export function storeDepositInternal(src: DepositInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1235050275, 32);
        b_0.storeAddress(src.delegator);
        b_0.storeAddress(src.referrer);
        b_0.storeCoins(src.deposit_amount);
        b_0.storeCoins(src.bonus_amount);
    };
}

export function loadDepositInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1235050275) { throw Error('Invalid prefix'); }
    let _delegator = sc_0.loadAddress();
    let _referrer = sc_0.loadAddress();
    let _deposit_amount = sc_0.loadCoins();
    let _bonus_amount = sc_0.loadCoins();
    return { $$type: 'DepositInternal' as const, delegator: _delegator, referrer: _referrer, deposit_amount: _deposit_amount, bonus_amount: _bonus_amount };
}

function loadTupleDepositInternal(source: TupleReader) {
    let _delegator = source.readAddress();
    let _referrer = source.readAddress();
    let _deposit_amount = source.readBigNumber();
    let _bonus_amount = source.readBigNumber();
    return { $$type: 'DepositInternal' as const, delegator: _delegator, referrer: _referrer, deposit_amount: _deposit_amount, bonus_amount: _bonus_amount };
}

function storeTupleDepositInternal(source: DepositInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.delegator);
    builder.writeAddress(source.referrer);
    builder.writeNumber(source.deposit_amount);
    builder.writeNumber(source.bonus_amount);
    return builder.build();
}

function dictValueParserDepositInternal(): DictionaryValue<DepositInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDepositInternal(src)).endCell());
        },
        parse: (src) => {
            return loadDepositInternal(src.loadRef().beginParse());
        }
    }
}

export type NotifyBonusInternal = {
    $$type: 'NotifyBonusInternal';
    from: Address;
    refund_to: Address;
    amount: bigint;
}

export function storeNotifyBonusInternal(src: NotifyBonusInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(781715065, 32);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.refund_to);
        b_0.storeCoins(src.amount);
    };
}

export function loadNotifyBonusInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 781715065) { throw Error('Invalid prefix'); }
    let _from = sc_0.loadAddress();
    let _refund_to = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'NotifyBonusInternal' as const, from: _from, refund_to: _refund_to, amount: _amount };
}

function loadTupleNotifyBonusInternal(source: TupleReader) {
    let _from = source.readAddress();
    let _refund_to = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'NotifyBonusInternal' as const, from: _from, refund_to: _refund_to, amount: _amount };
}

function storeTupleNotifyBonusInternal(source: NotifyBonusInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeAddress(source.refund_to);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserNotifyBonusInternal(): DictionaryValue<NotifyBonusInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNotifyBonusInternal(src)).endCell());
        },
        parse: (src) => {
            return loadNotifyBonusInternal(src.loadRef().beginParse());
        }
    }
}

export type JettonNotification = {
    $$type: 'JettonNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Cell;
}

export function storeJettonNotification(src: JettonNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleJettonNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleJettonNotification(source: JettonNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonNotification(): DictionaryValue<JettonNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

 type WithdrawVault_init_args = {
    $$type: 'WithdrawVault_init_args';
    owner: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
}

function initWithdrawVault_init_args(src: WithdrawVault_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton_master);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

async function WithdrawVault_init(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initWithdrawVault_init_args({ $$type: 'WithdrawVault_init_args', owner, jetton_master, jetton_wallet_code })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const WithdrawVault_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    7189: { message: `Zero amount` },
    16960: { message: `Invalid claim amount` },
    17654: { message: `Invalid seqno` },
    21420: { message: `Insufficient jetton amount` },
    36680: { message: `Only account` },
    36884: { message: `Invalid pubkey` },
    45150: { message: `Only jetton wallet` },
    48401: { message: `Invalid signature` },
    51754: { message: `Insufficient funds` },
    61530: { message: `Not active` },
    63788: { message: `Zero bonus` },
}

const WithdrawVault_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetWithdrawVaultParams","header":1063597757,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":true}},{"name":"pubkey","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"WithdrawInternal","header":1426498243,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"pubkey","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WithdrawRequest","header":3515948459,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"pubkey","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"RequestBonusInternal","header":1085939001,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"beneficiary","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetDepositVaultParams","header":3478673722,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":true}},{"name":"min_claim_amount","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"bonus_percentage","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"DepositInternal","header":1235050275,"fields":[{"name":"delegator","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}},{"name":"deposit_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"bonus_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"NotifyBonusInternal","header":781715065,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"refund_to","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"JettonNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
]

const WithdrawVault_getters: ABIGetter[] = [
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const WithdrawVault_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SetWithdrawVaultParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class WithdrawVault implements Contract {
    
    static async init(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
        return await WithdrawVault_init(owner, jetton_master, jetton_wallet_code);
    }
    
    static async fromInit(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
        const init = await WithdrawVault_init(owner, jetton_master, jetton_wallet_code);
        const address = contractAddress(0, init);
        return new WithdrawVault(address, init);
    }
    
    static fromAddress(address: Address) {
        return new WithdrawVault(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  WithdrawVault_types,
        getters: WithdrawVault_getters,
        receivers: WithdrawVault_receivers,
        errors: WithdrawVault_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetWithdrawVaultParams | JettonNotification | WithdrawInternal | ChangeOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetWithdrawVaultParams') {
            body = beginCell().store(storeSetWithdrawVaultParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonNotification') {
            body = beginCell().store(storeJettonNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawInternal') {
            body = beginCell().store(storeWithdrawInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}