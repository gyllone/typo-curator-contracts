import { toNano } from "@ton/core";
import { WithdrawVault } from "../../output/contract_WithdrawVault";
import { Client, Deployments } from "../constants";
import { getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const new_owner = wallet.address;
    const withdraw_vault = WithdrawVault.fromAddress(Deployments.WithdrawVault);
    await Client.open(withdraw_vault).send(
        sender,
        { value: toNano("0.05") },
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