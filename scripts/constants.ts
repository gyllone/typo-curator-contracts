import { Address, Cell } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import walletHex from "./external/jetton-wallet.compiled.json";

export const Client = new TonClient4({
    endpoint: "https://sandbox-v4.tonhubapi.com",
    timeout: 30000,
});

export const JettonData = {
    Master: Address.parse("EQAgE3YohH4KdebmLafpCIAlLuBSuvdlrynAkj8lakJtCa3n"),
    WalletCode: Cell.fromBoc(Buffer.from(walletHex.hex, "hex"))[0],
};

export const Deployments = {
    DepositVault: Address.parse("kQCRma_WUa6MCcUnpSccTEs3PIoqWs6BMUItkCkYovnFNDNW"),
    WithdrawVault: Address.parse("kQA7ig_dMrL7P-nn1zIV1rmb4knIDHc0Io0VsLPoAq8ycjk4"),
    BadgeCollection: Address.parse("kQCUtSKM2VWRIJsReARN2hL9ULRg-85kHDpMisI_IOxTvNyZ"),
};

export const BadgeCollectionUrl = "ipfs://xxxxx/";
