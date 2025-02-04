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

export type DepositVaultData = {
    $$type: 'DepositVaultData';
    owner: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_amount: bigint;
    claimed_bonus_amount: bigint;
    active: boolean;
    min_claim_amount: bigint;
    bonus_percentage: bigint;
}

export function storeDepositVaultData(src: DepositVaultData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton_master);
        b_0.storeRef(src.jetton_wallet_code);
        b_0.storeInt(src.jetton_amount, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.claimed_bonus_amount, 257);
        b_1.storeBit(src.active);
        b_1.storeInt(src.min_claim_amount, 257);
        b_1.storeInt(src.bonus_percentage, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDepositVaultData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _jetton_master = sc_0.loadAddress();
    let _jetton_wallet_code = sc_0.loadRef();
    let _jetton_amount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _claimed_bonus_amount = sc_1.loadIntBig(257);
    let _active = sc_1.loadBit();
    let _min_claim_amount = sc_1.loadIntBig(257);
    let _bonus_percentage = sc_1.loadIntBig(257);
    return { $$type: 'DepositVaultData' as const, owner: _owner, jetton_master: _jetton_master, jetton_wallet_code: _jetton_wallet_code, jetton_amount: _jetton_amount, claimed_bonus_amount: _claimed_bonus_amount, active: _active, min_claim_amount: _min_claim_amount, bonus_percentage: _bonus_percentage };
}

function loadTupleDepositVaultData(source: TupleReader) {
    let _owner = source.readAddress();
    let _jetton_master = source.readAddress();
    let _jetton_wallet_code = source.readCell();
    let _jetton_amount = source.readBigNumber();
    let _claimed_bonus_amount = source.readBigNumber();
    let _active = source.readBoolean();
    let _min_claim_amount = source.readBigNumber();
    let _bonus_percentage = source.readBigNumber();
    return { $$type: 'DepositVaultData' as const, owner: _owner, jetton_master: _jetton_master, jetton_wallet_code: _jetton_wallet_code, jetton_amount: _jetton_amount, claimed_bonus_amount: _claimed_bonus_amount, active: _active, min_claim_amount: _min_claim_amount, bonus_percentage: _bonus_percentage };
}

function storeTupleDepositVaultData(source: DepositVaultData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jetton_master);
    builder.writeCell(source.jetton_wallet_code);
    builder.writeNumber(source.jetton_amount);
    builder.writeNumber(source.claimed_bonus_amount);
    builder.writeBoolean(source.active);
    builder.writeNumber(source.min_claim_amount);
    builder.writeNumber(source.bonus_percentage);
    return builder.build();
}

function dictValueParserDepositVaultData(): DictionaryValue<DepositVaultData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDepositVaultData(src)).endCell());
        },
        parse: (src) => {
            return loadDepositVaultData(src.loadRef().beginParse());
        }
    }
}

export type DepositAccountData = {
    $$type: 'DepositAccountData';
    owner: Address;
    vault: Address;
    referrer: Address | null;
    deposit_amount: bigint;
    bonus_amount: bigint;
}

export function storeDepositAccountData(src: DepositAccountData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.vault);
        b_0.storeAddress(src.referrer);
        let b_1 = new Builder();
        b_1.storeInt(src.deposit_amount, 257);
        b_1.storeInt(src.bonus_amount, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDepositAccountData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _vault = sc_0.loadAddress();
    let _referrer = sc_0.loadMaybeAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _deposit_amount = sc_1.loadIntBig(257);
    let _bonus_amount = sc_1.loadIntBig(257);
    return { $$type: 'DepositAccountData' as const, owner: _owner, vault: _vault, referrer: _referrer, deposit_amount: _deposit_amount, bonus_amount: _bonus_amount };
}

function loadTupleDepositAccountData(source: TupleReader) {
    let _owner = source.readAddress();
    let _vault = source.readAddress();
    let _referrer = source.readAddressOpt();
    let _deposit_amount = source.readBigNumber();
    let _bonus_amount = source.readBigNumber();
    return { $$type: 'DepositAccountData' as const, owner: _owner, vault: _vault, referrer: _referrer, deposit_amount: _deposit_amount, bonus_amount: _bonus_amount };
}

function storeTupleDepositAccountData(source: DepositAccountData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.vault);
    builder.writeAddress(source.referrer);
    builder.writeNumber(source.deposit_amount);
    builder.writeNumber(source.bonus_amount);
    return builder.build();
}

function dictValueParserDepositAccountData(): DictionaryValue<DepositAccountData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDepositAccountData(src)).endCell());
        },
        parse: (src) => {
            return loadDepositAccountData(src.loadRef().beginParse());
        }
    }
}

export type WithdrawVaultData = {
    $$type: 'WithdrawVaultData';
    owner: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_amount: bigint;
    withdrawn_amount: bigint;
    active: boolean;
    pubkey: bigint;
}

export function storeWithdrawVaultData(src: WithdrawVaultData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton_master);
        b_0.storeRef(src.jetton_wallet_code);
        b_0.storeInt(src.jetton_amount, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.withdrawn_amount, 257);
        b_1.storeBit(src.active);
        b_1.storeInt(src.pubkey, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadWithdrawVaultData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _jetton_master = sc_0.loadAddress();
    let _jetton_wallet_code = sc_0.loadRef();
    let _jetton_amount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _withdrawn_amount = sc_1.loadIntBig(257);
    let _active = sc_1.loadBit();
    let _pubkey = sc_1.loadIntBig(257);
    return { $$type: 'WithdrawVaultData' as const, owner: _owner, jetton_master: _jetton_master, jetton_wallet_code: _jetton_wallet_code, jetton_amount: _jetton_amount, withdrawn_amount: _withdrawn_amount, active: _active, pubkey: _pubkey };
}

function loadTupleWithdrawVaultData(source: TupleReader) {
    let _owner = source.readAddress();
    let _jetton_master = source.readAddress();
    let _jetton_wallet_code = source.readCell();
    let _jetton_amount = source.readBigNumber();
    let _withdrawn_amount = source.readBigNumber();
    let _active = source.readBoolean();
    let _pubkey = source.readBigNumber();
    return { $$type: 'WithdrawVaultData' as const, owner: _owner, jetton_master: _jetton_master, jetton_wallet_code: _jetton_wallet_code, jetton_amount: _jetton_amount, withdrawn_amount: _withdrawn_amount, active: _active, pubkey: _pubkey };
}

function storeTupleWithdrawVaultData(source: WithdrawVaultData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jetton_master);
    builder.writeCell(source.jetton_wallet_code);
    builder.writeNumber(source.jetton_amount);
    builder.writeNumber(source.withdrawn_amount);
    builder.writeBoolean(source.active);
    builder.writeNumber(source.pubkey);
    return builder.build();
}

function dictValueParserWithdrawVaultData(): DictionaryValue<WithdrawVaultData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawVaultData(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawVaultData(src.loadRef().beginParse());
        }
    }
}

export type WithdrawAccountData = {
    $$type: 'WithdrawAccountData';
    owner: Address;
    vault: Address;
    seqno: bigint;
    withdrawn_amount: bigint;
}

export function storeWithdrawAccountData(src: WithdrawAccountData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.vault);
        b_0.storeInt(src.seqno, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.withdrawn_amount, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadWithdrawAccountData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _vault = sc_0.loadAddress();
    let _seqno = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _withdrawn_amount = sc_1.loadIntBig(257);
    return { $$type: 'WithdrawAccountData' as const, owner: _owner, vault: _vault, seqno: _seqno, withdrawn_amount: _withdrawn_amount };
}

function loadTupleWithdrawAccountData(source: TupleReader) {
    let _owner = source.readAddress();
    let _vault = source.readAddress();
    let _seqno = source.readBigNumber();
    let _withdrawn_amount = source.readBigNumber();
    return { $$type: 'WithdrawAccountData' as const, owner: _owner, vault: _vault, seqno: _seqno, withdrawn_amount: _withdrawn_amount };
}

function storeTupleWithdrawAccountData(source: WithdrawAccountData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.vault);
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.withdrawn_amount);
    return builder.build();
}

function dictValueParserWithdrawAccountData(): DictionaryValue<WithdrawAccountData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawAccountData(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawAccountData(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    content: Cell;
    owner: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeRef(src.content);
        b_0.storeAddress(src.owner);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadIntBig(257);
    let _content = sc_0.loadRef();
    let _owner = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, content: _content, owner: _owner };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _content = source.readCell();
    let _owner = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, content: _content, owner: _owner };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.content);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type NftData = {
    $$type: 'NftData';
    initialized: boolean;
    index: bigint;
    collection: Address;
    owner: Address | null;
    individual_content: Cell;
}

export function storeNftData(src: NftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.initialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.individual_content);
    };
}

export function loadNftData(slice: Slice) {
    let sc_0 = slice;
    let _initialized = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    let _owner = sc_0.loadMaybeAddress();
    let _individual_content = sc_0.loadRef();
    return { $$type: 'NftData' as const, initialized: _initialized, index: _index, collection: _collection, owner: _owner, individual_content: _individual_content };
}

function loadTupleNftData(source: TupleReader) {
    let _initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    let _owner = source.readAddressOpt();
    let _individual_content = source.readCell();
    return { $$type: 'NftData' as const, initialized: _initialized, index: _index, collection: _collection, owner: _owner, individual_content: _individual_content };
}

function storeTupleNftData(source: NftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.initialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    builder.writeAddress(source.owner);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserNftData(): DictionaryValue<NftData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftData(src)).endCell());
        },
        parse: (src) => {
            return loadNftData(src.loadRef().beginParse());
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
    amount: bigint;
    owner: Address;
    pubkey: bigint;
}

export function storeWithdrawInternal(src: WithdrawInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3221264875, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.pubkey, 257);
    };
}

export function loadWithdrawInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3221264875) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _pubkey = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawInternal' as const, amount: _amount, owner: _owner, pubkey: _pubkey };
}

function loadTupleWithdrawInternal(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _pubkey = source.readBigNumber();
    return { $$type: 'WithdrawInternal' as const, amount: _amount, owner: _owner, pubkey: _pubkey };
}

function storeTupleWithdrawInternal(source: WithdrawInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
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
    expiration: bigint;
    amount: bigint;
    pubkey: bigint;
    signature: Cell;
}

export function storeWithdrawRequest(src: WithdrawRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2392541152, 32);
        b_0.storeUint(src.seqno, 64);
        b_0.storeUint(src.expiration, 64);
        b_0.storeCoins(src.amount);
        b_0.storeInt(src.pubkey, 257);
        b_0.storeBuilder(src.signature.asBuilder());
    };
}

export function loadWithdrawRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2392541152) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(64);
    let _expiration = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _pubkey = sc_0.loadIntBig(257);
    let _signature = sc_0.asCell();
    return { $$type: 'WithdrawRequest' as const, seqno: _seqno, expiration: _expiration, amount: _amount, pubkey: _pubkey, signature: _signature };
}

function loadTupleWithdrawRequest(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _expiration = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _pubkey = source.readBigNumber();
    let _signature = source.readCell();
    return { $$type: 'WithdrawRequest' as const, seqno: _seqno, expiration: _expiration, amount: _amount, pubkey: _pubkey, signature: _signature };
}

function storeTupleWithdrawRequest(source: WithdrawRequest) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.expiration);
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

export type OwnerWithdrawRequest = {
    $$type: 'OwnerWithdrawRequest';
    amount: bigint;
}

export function storeOwnerWithdrawRequest(src: OwnerWithdrawRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4183652958, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadOwnerWithdrawRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4183652958) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'OwnerWithdrawRequest' as const, amount: _amount };
}

function loadTupleOwnerWithdrawRequest(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'OwnerWithdrawRequest' as const, amount: _amount };
}

function storeTupleOwnerWithdrawRequest(source: OwnerWithdrawRequest) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserOwnerWithdrawRequest(): DictionaryValue<OwnerWithdrawRequest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnerWithdrawRequest(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerWithdrawRequest(src.loadRef().beginParse());
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

export type MintBadgeItem = {
    $$type: 'MintBadgeItem';
    index: bigint;
    expiration: bigint;
    signature: Cell;
}

export function storeMintBadgeItem(src: MintBadgeItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2965203055, 32);
        b_0.storeUint(src.index, 64);
        b_0.storeUint(src.expiration, 64);
        b_0.storeBuilder(src.signature.asBuilder());
    };
}

export function loadMintBadgeItem(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2965203055) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadUintBig(64);
    let _expiration = sc_0.loadUintBig(64);
    let _signature = sc_0.asCell();
    return { $$type: 'MintBadgeItem' as const, index: _index, expiration: _expiration, signature: _signature };
}

function loadTupleMintBadgeItem(source: TupleReader) {
    let _index = source.readBigNumber();
    let _expiration = source.readBigNumber();
    let _signature = source.readCell();
    return { $$type: 'MintBadgeItem' as const, index: _index, expiration: _expiration, signature: _signature };
}

function storeTupleMintBadgeItem(source: MintBadgeItem) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.expiration);
    builder.writeSlice(source.signature);
    return builder.build();
}

function dictValueParserMintBadgeItem(): DictionaryValue<MintBadgeItem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintBadgeItem(src)).endCell());
        },
        parse: (src) => {
            return loadMintBadgeItem(src.loadRef().beginParse());
        }
    }
}

export type SetBadgeCollectionPubkey = {
    $$type: 'SetBadgeCollectionPubkey';
    pubkey: bigint;
}

export function storeSetBadgeCollectionPubkey(src: SetBadgeCollectionPubkey) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2736126250, 32);
        b_0.storeInt(src.pubkey, 257);
    };
}

export function loadSetBadgeCollectionPubkey(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2736126250) { throw Error('Invalid prefix'); }
    let _pubkey = sc_0.loadIntBig(257);
    return { $$type: 'SetBadgeCollectionPubkey' as const, pubkey: _pubkey };
}

function loadTupleSetBadgeCollectionPubkey(source: TupleReader) {
    let _pubkey = source.readBigNumber();
    return { $$type: 'SetBadgeCollectionPubkey' as const, pubkey: _pubkey };
}

function storeTupleSetBadgeCollectionPubkey(source: SetBadgeCollectionPubkey) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.pubkey);
    return builder.build();
}

function dictValueParserSetBadgeCollectionPubkey(): DictionaryValue<SetBadgeCollectionPubkey> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetBadgeCollectionPubkey(src)).endCell());
        },
        parse: (src) => {
            return loadSetBadgeCollectionPubkey(src.loadRef().beginParse());
        }
    }
}

export type MintBadgeItemInternal = {
    $$type: 'MintBadgeItemInternal';
    owner: Address;
    authority: Address;
}

export function storeMintBadgeItemInternal(src: MintBadgeItemInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1305424268, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.authority);
    };
}

export function loadMintBadgeItemInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1305424268) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _authority = sc_0.loadAddress();
    return { $$type: 'MintBadgeItemInternal' as const, owner: _owner, authority: _authority };
}

function loadTupleMintBadgeItemInternal(source: TupleReader) {
    let _owner = source.readAddress();
    let _authority = source.readAddress();
    return { $$type: 'MintBadgeItemInternal' as const, owner: _owner, authority: _authority };
}

function storeTupleMintBadgeItemInternal(source: MintBadgeItemInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.authority);
    return builder.build();
}

function dictValueParserMintBadgeItemInternal(): DictionaryValue<MintBadgeItemInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintBadgeItemInternal(src)).endCell());
        },
        parse: (src) => {
            return loadMintBadgeItemInternal(src.loadRef().beginParse());
        }
    }
}

export type RequestOwner = {
    $$type: 'RequestOwner';
    query_id: bigint;
    dest: Address;
    forward_payload: Cell;
    with_content: boolean;
}

export function storeRequestOwner(src: RequestOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3502489578, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.dest);
        b_0.storeRef(src.forward_payload);
        b_0.storeBit(src.with_content);
    };
}

export function loadRequestOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3502489578) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _dest = sc_0.loadAddress();
    let _forward_payload = sc_0.loadRef();
    let _with_content = sc_0.loadBit();
    return { $$type: 'RequestOwner' as const, query_id: _query_id, dest: _dest, forward_payload: _forward_payload, with_content: _with_content };
}

function loadTupleRequestOwner(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _dest = source.readAddress();
    let _forward_payload = source.readCell();
    let _with_content = source.readBoolean();
    return { $$type: 'RequestOwner' as const, query_id: _query_id, dest: _dest, forward_payload: _forward_payload, with_content: _with_content };
}

function storeTupleRequestOwner(source: RequestOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.dest);
    builder.writeCell(source.forward_payload);
    builder.writeBoolean(source.with_content);
    return builder.build();
}

function dictValueParserRequestOwner(): DictionaryValue<RequestOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRequestOwner(src)).endCell());
        },
        parse: (src) => {
            return loadRequestOwner(src.loadRef().beginParse());
        }
    }
}

export type OwnerInfo = {
    $$type: 'OwnerInfo';
    query_id: bigint;
    item_id: bigint;
    initiator: Address;
    owner: Address;
    data: Cell;
    revoked_at: bigint;
    content: Cell | null;
}

export function storeOwnerInfo(src: OwnerInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(232130531, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.item_id, 256);
        b_0.storeAddress(src.initiator);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.data);
        b_0.storeUint(src.revoked_at, 64);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
    };
}

export function loadOwnerInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 232130531) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _item_id = sc_0.loadUintBig(256);
    let _initiator = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _data = sc_0.loadRef();
    let _revoked_at = sc_0.loadUintBig(64);
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'OwnerInfo' as const, query_id: _query_id, item_id: _item_id, initiator: _initiator, owner: _owner, data: _data, revoked_at: _revoked_at, content: _content };
}

function loadTupleOwnerInfo(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _item_id = source.readBigNumber();
    let _initiator = source.readAddress();
    let _owner = source.readAddress();
    let _data = source.readCell();
    let _revoked_at = source.readBigNumber();
    let _content = source.readCellOpt();
    return { $$type: 'OwnerInfo' as const, query_id: _query_id, item_id: _item_id, initiator: _initiator, owner: _owner, data: _data, revoked_at: _revoked_at, content: _content };
}

function storeTupleOwnerInfo(source: OwnerInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.item_id);
    builder.writeAddress(source.initiator);
    builder.writeAddress(source.owner);
    builder.writeCell(source.data);
    builder.writeNumber(source.revoked_at);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserOwnerInfo(): DictionaryValue<OwnerInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnerInfo(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerInfo(src.loadRef().beginParse());
        }
    }
}

export type ProveOwnership = {
    $$type: 'ProveOwnership';
    query_id: bigint;
    dest: Address;
    forward_payload: Cell;
    with_content: boolean;
}

export function storeProveOwnership(src: ProveOwnership) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(81711432, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.dest);
        b_0.storeRef(src.forward_payload);
        b_0.storeBit(src.with_content);
    };
}

export function loadProveOwnership(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 81711432) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _dest = sc_0.loadAddress();
    let _forward_payload = sc_0.loadRef();
    let _with_content = sc_0.loadBit();
    return { $$type: 'ProveOwnership' as const, query_id: _query_id, dest: _dest, forward_payload: _forward_payload, with_content: _with_content };
}

function loadTupleProveOwnership(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _dest = source.readAddress();
    let _forward_payload = source.readCell();
    let _with_content = source.readBoolean();
    return { $$type: 'ProveOwnership' as const, query_id: _query_id, dest: _dest, forward_payload: _forward_payload, with_content: _with_content };
}

function storeTupleProveOwnership(source: ProveOwnership) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.dest);
    builder.writeCell(source.forward_payload);
    builder.writeBoolean(source.with_content);
    return builder.build();
}

function dictValueParserProveOwnership(): DictionaryValue<ProveOwnership> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProveOwnership(src)).endCell());
        },
        parse: (src) => {
            return loadProveOwnership(src.loadRef().beginParse());
        }
    }
}

export type OwnershipProof = {
    $$type: 'OwnershipProof';
    query_id: bigint;
    item_id: bigint;
    owner: Address;
    data: Cell;
    revoked_at: bigint;
    content: Cell | null;
}

export function storeOwnershipProof(src: OwnershipProof) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(86296494, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.item_id, 256);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.data);
        b_0.storeUint(src.revoked_at, 64);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
    };
}

export function loadOwnershipProof(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 86296494) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _item_id = sc_0.loadUintBig(256);
    let _owner = sc_0.loadAddress();
    let _data = sc_0.loadRef();
    let _revoked_at = sc_0.loadUintBig(64);
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'OwnershipProof' as const, query_id: _query_id, item_id: _item_id, owner: _owner, data: _data, revoked_at: _revoked_at, content: _content };
}

function loadTupleOwnershipProof(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _item_id = source.readBigNumber();
    let _owner = source.readAddress();
    let _data = source.readCell();
    let _revoked_at = source.readBigNumber();
    let _content = source.readCellOpt();
    return { $$type: 'OwnershipProof' as const, query_id: _query_id, item_id: _item_id, owner: _owner, data: _data, revoked_at: _revoked_at, content: _content };
}

function storeTupleOwnershipProof(source: OwnershipProof) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.item_id);
    builder.writeAddress(source.owner);
    builder.writeCell(source.data);
    builder.writeNumber(source.revoked_at);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserOwnershipProof(): DictionaryValue<OwnershipProof> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnershipProof(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipProof(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    query_id: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    query_id: bigint;
    index_id: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.index_id, 257);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index_id = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index_id);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type Destroy = {
    $$type: 'Destroy';
    query_id: bigint;
}

export function storeDestroy(src: Destroy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(520377210, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadDestroy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 520377210) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Destroy' as const, query_id: _query_id };
}

function loadTupleDestroy(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Destroy' as const, query_id: _query_id };
}

function storeTupleDestroy(source: Destroy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserDestroy(): DictionaryValue<Destroy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDestroy(src)).endCell());
        },
        parse: (src) => {
            return loadDestroy(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type Revoke = {
    $$type: 'Revoke';
    query_id: bigint;
}

export function storeRevoke(src: Revoke) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1871312355, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadRevoke(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1871312355) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Revoke' as const, query_id: _query_id };
}

function loadTupleRevoke(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Revoke' as const, query_id: _query_id };
}

function storeTupleRevoke(source: Revoke) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserRevoke(): DictionaryValue<Revoke> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRevoke(src)).endCell());
        },
        parse: (src) => {
            return loadRevoke(src.loadRef().beginParse());
        }
    }
}

export type TakeExcess = {
    $$type: 'TakeExcess';
    query_id: bigint;
}

export function storeTakeExcess(src: TakeExcess) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3510031283, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTakeExcess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3510031283) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TakeExcess' as const, query_id: _query_id };
}

function loadTupleTakeExcess(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TakeExcess' as const, query_id: _query_id };
}

function storeTupleTakeExcess(source: TakeExcess) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserTakeExcess(): DictionaryValue<TakeExcess> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeExcess(src)).endCell());
        },
        parse: (src) => {
            return loadTakeExcess(src.loadRef().beginParse());
        }
    }
}

export type TransferItem = {
    $$type: 'TransferItem';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Cell;
}

export function storeTransferItem(src: TransferItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransferItem(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TransferItem' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleTransferItem(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TransferItem' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleTransferItem(source: TransferItem) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransferItem(): DictionaryValue<TransferItem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferItem(src)).endCell());
        },
        parse: (src) => {
            return loadTransferItem(src.loadRef().beginParse());
        }
    }
}

export type OwnershipProofBounced = {
    $$type: 'OwnershipProofBounced';
    query_id: bigint;
}

export function storeOwnershipProofBounced(src: OwnershipProofBounced) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3247343314, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadOwnershipProofBounced(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3247343314) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'OwnershipProofBounced' as const, query_id: _query_id };
}

function loadTupleOwnershipProofBounced(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'OwnershipProofBounced' as const, query_id: _query_id };
}

function storeTupleOwnershipProofBounced(source: OwnershipProofBounced) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserOwnershipProofBounced(): DictionaryValue<OwnershipProofBounced> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnershipProofBounced(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipProofBounced(src.loadRef().beginParse());
        }
    }
}

 type DepositVault_init_args = {
    $$type: 'DepositVault_init_args';
    owner: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
}

function initDepositVault_init_args(src: DepositVault_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton_master);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

async function DepositVault_init(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDepositVault_init_args({ $$type: 'DepositVault_init_args', owner, jetton_master, jetton_wallet_code })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const DepositVault_errors: { [key: number]: { message: string } } = {
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
    1710: { message: `Not supported` },
    4429: { message: `Invalid sender` },
    7189: { message: `Zero amount` },
    7657: { message: `Not initialized` },
    10990: { message: `Already revoked` },
    16960: { message: `Invalid claim amount` },
    17654: { message: `Invalid seqno` },
    21420: { message: `Insufficient jetton amount` },
    36680: { message: `Only account` },
    36884: { message: `Invalid pubkey` },
    41096: { message: `Signature expired` },
    45150: { message: `Only jetton wallet` },
    48401: { message: `Invalid signature` },
    51754: { message: `Insufficient funds` },
    59449: { message: `Invalid item index` },
    61530: { message: `Not active` },
    63788: { message: `Zero bonus` },
}

const DepositVault_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DepositVaultData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"claimed_bonus_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"min_claim_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonus_percentage","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DepositAccountData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"vault","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":true}},{"name":"deposit_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonus_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WithdrawVaultData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"withdrawn_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pubkey","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WithdrawAccountData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"vault","type":{"kind":"simple","type":"address","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"withdrawn_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftData","header":null,"fields":[{"name":"initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":true}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetWithdrawVaultParams","header":1063597757,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":true}},{"name":"pubkey","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"WithdrawInternal","header":3221264875,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"pubkey","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WithdrawRequest","header":2392541152,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"expiration","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"pubkey","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"RequestBonusInternal","header":1085939001,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"beneficiary","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetDepositVaultParams","header":3478673722,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":true}},{"name":"min_claim_amount","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"bonus_percentage","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"OwnerWithdrawRequest","header":4183652958,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DepositInternal","header":1235050275,"fields":[{"name":"delegator","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}},{"name":"deposit_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"bonus_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"NotifyBonusInternal","header":781715065,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"refund_to","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"JettonNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"MintBadgeItem","header":2965203055,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"expiration","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"SetBadgeCollectionPubkey","header":2736126250,"fields":[{"name":"pubkey","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"MintBadgeItemInternal","header":1305424268,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"authority","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RequestOwner","header":3502489578,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"dest","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"with_content","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"OwnerInfo","header":232130531,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"item_id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"initiator","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}},{"name":"revoked_at","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"content","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ProveOwnership","header":81711432,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"dest","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"with_content","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"OwnershipProof","header":86296494,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"item_id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}},{"name":"revoked_at","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"content","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Destroy","header":520377210,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Revoke","header":1871312355,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TakeExcess","header":3510031283,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TransferItem","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"OwnershipProofBounced","header":3247343314,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
]

const DepositVault_getters: ABIGetter[] = [
    {"name":"get_data","arguments":[],"returnType":{"kind":"simple","type":"DepositVaultData","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const DepositVault_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"JettonNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RequestBonusInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetDepositVaultParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"OwnerWithdrawRequest"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class DepositVault implements Contract {
    
    static async init(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
        return await DepositVault_init(owner, jetton_master, jetton_wallet_code);
    }
    
    static async fromInit(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
        const init = await DepositVault_init(owner, jetton_master, jetton_wallet_code);
        const address = contractAddress(0, init);
        return new DepositVault(address, init);
    }
    
    static fromAddress(address: Address) {
        return new DepositVault(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  DepositVault_types,
        getters: DepositVault_getters,
        receivers: DepositVault_receivers,
        errors: DepositVault_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonNotification | RequestBonusInternal | SetDepositVaultParams | OwnerWithdrawRequest | ChangeOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonNotification') {
            body = beginCell().store(storeJettonNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RequestBonusInternal') {
            body = beginCell().store(storeRequestBonusInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetDepositVaultParams') {
            body = beginCell().store(storeSetDepositVaultParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OwnerWithdrawRequest') {
            body = beginCell().store(storeOwnerWithdrawRequest(message)).endCell();
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
    
    async getGetData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_data', builder.build())).stack;
        const result = loadTupleDepositVaultData(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}