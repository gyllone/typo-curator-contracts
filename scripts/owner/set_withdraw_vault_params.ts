import { toNano } from "@ton/core";
import { WithdrawVault } from "../../output/contract_WithdrawVault";
import { Deployments, Client, getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const withdraw_vault = WithdrawVault.fromAddress(Deployments.WithdrawVault);
    await Client.open(withdraw_vault).send(
        sender,
        { value: toNano("0.1") },
        {
            $$type: "SetWithdrawVaultParams",
            active: true,
            pubkey: BigInt(0),
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});