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
    DepositVault: Address.parse("kQDC-ZPhL5NAZ4_vB5U0oNPsMtmc8Ex0jG0FWRH_Z4LlaecG"),
    WithdrawVault: Address.parse("kQDirLn0jrX2MVVTn5zlzkKiT9pZ49zrUvIk12Pr_elvDq20"),
    BadgeCollection: Address.parse("kQA7uSohAKNHmRM7lGvQZOwOjoZcfVmRG-ZRuA6JP_BYrA24"),
};
