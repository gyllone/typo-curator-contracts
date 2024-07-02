import { toNano } from "@ton/core";
import { JettonMaster } from "@ton/ton";
import { JettonWallet } from "../jetton_utils";
import { Deployments, Client, JettonData } from "../constants";
import { getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const jetton_master = JettonMaster.create(JettonData.Master);
    // Note: can replace to constant value
    const jetton_wallet_address = await Client.open(jetton_master).getWalletAddress(wallet.address);

    const jetton_wallet = JettonWallet.createFromAddress(jetton_wallet_address);
    const transfer_amount = toNano("100000000");
    await Client.open(jetton_wallet).sendTransfer(
        sender,
        toNano("0.15"),
        transfer_amount,
        Deployments.WithdrawVault,
        wallet.address,
        toNano("0.1"),
        null,
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});