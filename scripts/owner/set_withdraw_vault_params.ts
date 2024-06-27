import { toNano } from "@ton/core";
import { WithdrawVault } from "../../output/contract_WithdrawVault";
import { getKeyPair, getKeyPair2, getWallet } from "../utils";
import { Client, Deployments } from "../constants";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const keypair2 = await getKeyPair2();

    const withdraw_vault = WithdrawVault.fromAddress(Deployments.WithdrawVault);
    await Client.open(withdraw_vault).send(
        sender,
        { value: toNano("0.1") },
        {
            $$type: "SetWithdrawVaultParams",
            active: true,
            // pubkey of keypair_backend
            pubkey: BigInt(`0x${keypair2.publicKey.toString("hex")}`),
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});