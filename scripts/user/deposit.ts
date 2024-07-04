import { Address, beginCell, toNano } from "@ton/core";
import { JettonMaster } from "@ton/ton";
import { JettonWallet } from "../jetton_utils";
import { Deployments, Client, JettonData } from "../constants";
import { getKeyPair, getWallet } from "../utils";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const jetton_master = JettonMaster.create(JettonData.Master);
    // Note: can replace to constant value
    const jetton_wallet_address = await Client.open(jetton_master).getWalletAddress(wallet.address);
    const jetton_wallet = JettonWallet.createFromAddress(jetton_wallet_address);

    // prepare transaction data
    const deposit_amount = BigInt(1000000000);
    const beneficiary = wallet.address; // as memo address
    const referrer = Address.parse("0QBVPVtmW01MVllgR-2UPVcB9ggeEHWE3qhGbRMTiwbF6vLb");
    const foward_payload = beginCell()
        .storeAddress(beneficiary)
        .storeAddress(referrer)
        .endCell();

    await Client.open(jetton_wallet).sendTransfer(
        sender,
        toNano("0.3"),
        deposit_amount,
        Deployments.DepositVault,
        wallet.address,
        toNano("0.2"),
        foward_payload,
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});