import { toNano } from "@ton/core";
import { WithdrawVault } from "../../output/contract_WithdrawVault";
import { Client, JettonData } from "../constants";
import { getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const withdraw_vault = await WithdrawVault.fromInit(wallet.address, JettonData.Master, JettonData.WalletCode);
    await Client.open(withdraw_vault).send(
        sender,
        { value: toNano("0.2") },
        {
            $$type: "Deploy",
            queryId: 0n,
        },
    );
    console.log("Withdraw vault address", withdraw_vault.address.toString({ testOnly: true }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});