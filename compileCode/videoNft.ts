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
  DictionaryValue,
} from "@ton/core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

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
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
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
    },
  };
}

export type StdAddress = {
  $$type: "StdAddress";
  workchain: bigint;
  address: bigint;
};

export function storeStdAddress(src: StdAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.workchain, 8);
    b_0.storeUint(src.address, 256);
  };
}

export function loadStdAddress(slice: Slice) {
  let sc_0 = slice;
  let _workchain = sc_0.loadIntBig(8);
  let _address = sc_0.loadUintBig(256);
  return {
    $$type: "StdAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadTupleStdAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readBigNumber();
  return {
    $$type: "StdAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadGetterTupleStdAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readBigNumber();
  return {
    $$type: "StdAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function storeTupleStdAddress(source: StdAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeNumber(source.address);
  return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
    },
    parse: (src) => {
      return loadStdAddress(src.loadRef().beginParse());
    },
  };
}

export type VarAddress = {
  $$type: "VarAddress";
  workchain: bigint;
  address: Slice;
};

export function storeVarAddress(src: VarAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.workchain, 32);
    b_0.storeRef(src.address.asCell());
  };
}

export function loadVarAddress(slice: Slice) {
  let sc_0 = slice;
  let _workchain = sc_0.loadIntBig(32);
  let _address = sc_0.loadRef().asSlice();
  return {
    $$type: "VarAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadTupleVarAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readCell().asSlice();
  return {
    $$type: "VarAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadGetterTupleVarAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readCell().asSlice();
  return {
    $$type: "VarAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function storeTupleVarAddress(source: VarAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeSlice(source.address.asCell());
  return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
    },
    parse: (src) => {
      return loadVarAddress(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: "Context";
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Slice;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw.asCell());
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef().asSlice();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell().asSlice();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadGetterTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell().asSlice();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw.asCell());
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
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
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadGetterTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
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
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
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
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
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
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

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
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
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
    },
  };
}

export type VideoFile = {
  $$type: "VideoFile";
  owner: Address;
  ipfsHash: string;
  price: bigint;
};

export function storeVideoFile(src: VideoFile) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.owner);
    b_0.storeStringRefTail(src.ipfsHash);
    b_0.storeInt(src.price, 257);
  };
}

export function loadVideoFile(slice: Slice) {
  let sc_0 = slice;
  let _owner = sc_0.loadAddress();
  let _ipfsHash = sc_0.loadStringRefTail();
  let _price = sc_0.loadIntBig(257);
  return {
    $$type: "VideoFile" as const,
    owner: _owner,
    ipfsHash: _ipfsHash,
    price: _price,
  };
}

function loadTupleVideoFile(source: TupleReader) {
  let _owner = source.readAddress();
  let _ipfsHash = source.readString();
  let _price = source.readBigNumber();
  return {
    $$type: "VideoFile" as const,
    owner: _owner,
    ipfsHash: _ipfsHash,
    price: _price,
  };
}

function loadGetterTupleVideoFile(source: TupleReader) {
  let _owner = source.readAddress();
  let _ipfsHash = source.readString();
  let _price = source.readBigNumber();
  return {
    $$type: "VideoFile" as const,
    owner: _owner,
    ipfsHash: _ipfsHash,
    price: _price,
  };
}

function storeTupleVideoFile(source: VideoFile) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.owner);
  builder.writeString(source.ipfsHash);
  builder.writeNumber(source.price);
  return builder.build();
}

function dictValueParserVideoFile(): DictionaryValue<VideoFile> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeVideoFile(src)).endCell());
    },
    parse: (src) => {
      return loadVideoFile(src.loadRef().beginParse());
    },
  };
}

export type AddFileParams = {
  $$type: "AddFileParams";
  ipfsHash: string;
  price: bigint;
};

export function storeAddFileParams(src: AddFileParams) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(341856504, 32);
    b_0.storeStringRefTail(src.ipfsHash);
    b_0.storeInt(src.price, 257);
  };
}

export function loadAddFileParams(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 341856504) {
    throw Error("Invalid prefix");
  }
  let _ipfsHash = sc_0.loadStringRefTail();
  let _price = sc_0.loadIntBig(257);
  return {
    $$type: "AddFileParams" as const,
    ipfsHash: _ipfsHash,
    price: _price,
  };
}

function loadTupleAddFileParams(source: TupleReader) {
  let _ipfsHash = source.readString();
  let _price = source.readBigNumber();
  return {
    $$type: "AddFileParams" as const,
    ipfsHash: _ipfsHash,
    price: _price,
  };
}

function loadGetterTupleAddFileParams(source: TupleReader) {
  let _ipfsHash = source.readString();
  let _price = source.readBigNumber();
  return {
    $$type: "AddFileParams" as const,
    ipfsHash: _ipfsHash,
    price: _price,
  };
}

function storeTupleAddFileParams(source: AddFileParams) {
  let builder = new TupleBuilder();
  builder.writeString(source.ipfsHash);
  builder.writeNumber(source.price);
  return builder.build();
}

function dictValueParserAddFileParams(): DictionaryValue<AddFileParams> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAddFileParams(src)).endCell());
    },
    parse: (src) => {
      return loadAddFileParams(src.loadRef().beginParse());
    },
  };
}

export type WatchVideoParams = {
  $$type: "WatchVideoParams";
  id: bigint;
};

export function storeWatchVideoParams(src: WatchVideoParams) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2865730529, 32);
    b_0.storeInt(src.id, 257);
  };
}

export function loadWatchVideoParams(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2865730529) {
    throw Error("Invalid prefix");
  }
  let _id = sc_0.loadIntBig(257);
  return { $$type: "WatchVideoParams" as const, id: _id };
}

function loadTupleWatchVideoParams(source: TupleReader) {
  let _id = source.readBigNumber();
  return { $$type: "WatchVideoParams" as const, id: _id };
}

function loadGetterTupleWatchVideoParams(source: TupleReader) {
  let _id = source.readBigNumber();
  return { $$type: "WatchVideoParams" as const, id: _id };
}

function storeTupleWatchVideoParams(source: WatchVideoParams) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.id);
  return builder.build();
}

function dictValueParserWatchVideoParams(): DictionaryValue<WatchVideoParams> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeWatchVideoParams(src)).endCell());
    },
    parse: (src) => {
      return loadWatchVideoParams(src.loadRef().beginParse());
    },
  };
}

export type VideoNft$Data = {
  $$type: "VideoNft$Data";
  fileCount: bigint;
  videoFiles: Dictionary<bigint, VideoFile>;
};

export function storeVideoNft$Data(src: VideoNft$Data) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.fileCount, 257);
    b_0.storeDict(
      src.videoFiles,
      Dictionary.Keys.BigInt(257),
      dictValueParserVideoFile()
    );
  };
}

export function loadVideoNft$Data(slice: Slice) {
  let sc_0 = slice;
  let _fileCount = sc_0.loadIntBig(257);
  let _videoFiles = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserVideoFile(),
    sc_0
  );
  return {
    $$type: "VideoNft$Data" as const,
    fileCount: _fileCount,
    videoFiles: _videoFiles,
  };
}

function loadTupleVideoNft$Data(source: TupleReader) {
  let _fileCount = source.readBigNumber();
  let _videoFiles = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserVideoFile(),
    source.readCellOpt()
  );
  return {
    $$type: "VideoNft$Data" as const,
    fileCount: _fileCount,
    videoFiles: _videoFiles,
  };
}

function loadGetterTupleVideoNft$Data(source: TupleReader) {
  let _fileCount = source.readBigNumber();
  let _videoFiles = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserVideoFile(),
    source.readCellOpt()
  );
  return {
    $$type: "VideoNft$Data" as const,
    fileCount: _fileCount,
    videoFiles: _videoFiles,
  };
}

function storeTupleVideoNft$Data(source: VideoNft$Data) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.fileCount);
  builder.writeCell(
    source.videoFiles.size > 0
      ? beginCell()
          .storeDictDirect(
            source.videoFiles,
            Dictionary.Keys.BigInt(257),
            dictValueParserVideoFile()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserVideoNft$Data(): DictionaryValue<VideoNft$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeVideoNft$Data(src)).endCell());
    },
    parse: (src) => {
      return loadVideoNft$Data(src.loadRef().beginParse());
    },
  };
}

type VideoNft_init_args = {
  $$type: "VideoNft_init_args";
};

function initVideoNft_init_args(src: VideoNft_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
  };
}

async function VideoNft_init() {
  const __code = Cell.fromBase64(
    "te6ccgECFAEAA7MAART/APSkE/S88sgLAQIBYgIDAqLQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZAoEBAc8A9ADJ7VQRBAIBbgwNA+QBkjB/4HAh10nCH5UwINcLH94gghAUYFD4uuMCIIIQqs+T4bqOmDDTHwGCEKrPk+G68uCBgQEB1wABMds8f+CCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAFBgcAzDDTHwGCEBRgUPi68uCB1AHQAYEBAdcAWWwS+EJZWYEBAQPIVSBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFADzxbJWMyBAQHPAMlSMCBulTBZ9FowlEEz9BXiAaQBfwLS+EFvJBNfAyDbPIvGR1bXAoYW1vdW50KYjQnRmlsZSBwcm9qZWN0cy92aWRlb19uZnQvbWFpbi50YWN0OjUzOjk6g/hQw/hQw/hQwgUQHIsL/k1MkuZFw4vL0gQEBVEMTWfQNb6GSMG3fCAkBPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MAoA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AGqIG6SMG2OMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AGBAQHXAFUgbBNvA+IgbvLQgG8jMYIAyipRMb4T8vQBcX9VIG1tbds8MAoByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsICwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIA4PAhG0KTtnm2eNhDAREgARsK+7UTQ0gABgAhGxX7bPNs8bCGAREAACIQFI7UTQ1AH4Y9IAAZqBAQHXAPQEWWwS4DD4KNcLCoMJuvLgids8EwACIAAEcG0="
  );
  const __system = Cell.fromBase64(
    "te6cckECFgEAA70AAQHAAQEFoUiJAgEU/wD0pBP0vPLICwMCAWIEDQKi0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wts88uCCyPhDAcx/AcoAWQKBAQHPAPQAye1UEwUD5AGSMH/gcCHXScIflTAg1wsf3iCCEBRgUPi64wIgghCqz5Phuo6YMNMfAYIQqs+T4bry4IGBAQHXAAEx2zx/4IIQlGqYtrqOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcAYHCgDMMNMfAYIQFGBQ+Lry4IHUAdABgQEB1wBZbBL4QllZgQEBA8hVIFog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUAPPFslYzIEBAc8AyVIwIG6VMFn0WjCUQTP0FeIBpAF/AtL4QW8kE18DINs8i8ZHVtcChhbW91bnQpiNCdGaWxlIHByb2plY3RzL3ZpZGVvX25mdC9tYWluLnRhY3Q6NTM6OTqD+FDD+FDD+FDCBRAciwv+TUyS5kXDi8vSBAQFUQxNZ9A1voZIwbd8ICQDeyCHBAJiALQHLBwGjAd4hgjgyfLJzQRnTt6mqHbmOIHAgcY4UBHqpDKYwJagSoASqBwKkIcAARTDmMDOqAs8BjitvAHCOESN6qQgSb4wBpAN6qQQgwAAU5jMipQOcUwJvgaYwWMsHAqVZ5DAx4snQAaogbpIwbY4w0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQAYEBAdcAVSBsE28D4iBu8tCAbyMxggDKKlExvhPy9AFxf1UgbW1t2zwwCwE8bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwwCwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgMAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgFuDhICASAPEAARsK+7UTQ0gABgAhGxX7bPNs8bCGATEQACIQIRtCk7Z5tnjYQwExUBSO1E0NQB+GPSAAGagQEB1wD0BFlsEuAw+CjXCwqDCbry4InbPBQABHBtAAIgGMCnxg=="
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initVideoNft_init_args({ $$type: "VideoNft_init_args" })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const VideoNft_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  11: { message: `'Unknown' error` },
  12: { message: `Fatal error` },
  13: { message: `Out of gas error` },
  14: { message: `Virtualization error` },
  32: { message: `Action list is invalid` },
  33: { message: `Action list is too long` },
  34: { message: `Action is invalid or not supported` },
  35: { message: `Invalid source address in outbound message` },
  36: { message: `Invalid destination address in outbound message` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  39: { message: `Outbound message does not fit into a cell after rewriting` },
  40: { message: `Cannot process a message` },
  41: { message: `Library reference is null` },
  42: { message: `Library change action error` },
  43: {
    message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree`,
  },
  50: { message: `Account state size exceeded limits` },
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
  17415: { message: `Invalid id` },
  51754: { message: `Insufficient funds` },
};

const VideoNft_types: ABIType[] = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "StdAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: false, format: 8 },
      },
      {
        name: "address",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "VarAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: false, format: 32 },
      },
      {
        name: "address",
        type: { kind: "simple", type: "slice", optional: false },
      },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "VideoFile",
    header: null,
    fields: [
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "ipfsHash",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "price",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "AddFileParams",
    header: 341856504,
    fields: [
      {
        name: "ipfsHash",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "price",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "WatchVideoParams",
    header: 2865730529,
    fields: [
      {
        name: "id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "VideoNft$Data",
    header: null,
    fields: [
      {
        name: "fileCount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "videoFiles",
        type: {
          kind: "dict",
          key: "int",
          value: "VideoFile",
          valueFormat: "ref",
        },
      },
    ],
  },
];

const VideoNft_getters: ABIGetter[] = [
  {
    name: "getFiles",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "VideoFile",
      valueFormat: "ref",
    },
  },
  {
    name: "getFileCount",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
];

export const VideoNft_getterMapping: { [key: string]: string } = {
  getFiles: "getGetFiles",
  getFileCount: "getGetFileCount",
};

const VideoNft_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "typed", type: "AddFileParams" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "WatchVideoParams" },
  },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class VideoNft implements Contract {
  static async init() {
    return await VideoNft_init();
  }

  static async fromInit() {
    const init = await VideoNft_init();
    const address = contractAddress(0, init);
    return new VideoNft(address, init);
  }

  static fromAddress(address: Address) {
    return new VideoNft(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: VideoNft_types,
    getters: VideoNft_getters,
    receivers: VideoNft_receivers,
    errors: VideoNft_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message: AddFileParams | WatchVideoParams | Deploy
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "AddFileParams"
    ) {
      body = beginCell().store(storeAddFileParams(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "WatchVideoParams"
    ) {
      body = beginCell().store(storeWatchVideoParams(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getGetFiles(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("getFiles", builder.build())).stack;
    let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserVideoFile(), source.readCellOpt());
    return result;
  }

  async getGetFileCount(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("getFileCount", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }
}
