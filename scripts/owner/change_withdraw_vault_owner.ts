import { toNano } from "@ton/core";
import { DepositVault } from "../../output/contract_DepositVault";
import { Client, Deployments } from "../constants";
import { getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const new_owner = wallet.address;
    const deposit_vault = DepositVault.fromAddress(Deployments.DepositVault);
    await Client.open(deposit_vault).send(
        sender,
        { value: toNano("0.03") },
        {
            $$type: "ChangeOwner",
            queryId: BigInt(0),
            newOwner: new_owner,
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});