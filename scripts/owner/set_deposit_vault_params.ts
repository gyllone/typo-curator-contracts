import { toNano } from "@ton/core";
import { DepositVault } from "../../output/contract_DepositVault";
import { Client, Deployments } from "../constants";
import { getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const deposit_vault = DepositVault.fromAddress(Deployments.DepositVault);
    await Client.open(deposit_vault).send(
        sender,
        { value: toNano("0.1") },
        {
            $$type: "SetDepositVaultParams",
            active: true,
            min_claim_amount: null,
            bonus_percentage: null,
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});