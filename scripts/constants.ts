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
    DepositVault: Address.parse("kQAjyl8aqN6yvu_XBcSTJoRUpATaK5dItTczEOxsBzcu67QJ"),
    WithdrawVault: Address.parse("kQCnaD6-QxCFrVe0UUNO8CqAl0vwWcBllavAgpbzJ7srP68Z"),
    BadgeCollection: Address.parse("kQCSUk05lgmU_Eyz917rm31aImnGYS16sN1pG82m-SgVMNqR"),
};

export const BadgeCollectionUrl = "https://www.google.com";
