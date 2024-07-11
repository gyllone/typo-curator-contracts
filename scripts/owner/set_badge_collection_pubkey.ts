import { toNano } from "@ton/core";
import { BadgeCollection } from "../../output/contract_BadgeCollection";
import { getKeyPair, getKeyPair2, getWallet } from "../utils";
import { Client, Deployments } from "../constants";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const keypair2 = await getKeyPair2();

    const collection = BadgeCollection.fromAddress(Deployments.BadgeCollection);
    await Client.open(collection).send(
        sender,
        { value: toNano("0.05") },
        {
            $$type: "SetBadgeCollectionPubkey",
            // pubkey of keypair_backend
            pubkey: BigInt(`0x${keypair2.publicKey.toString("hex")}`),
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});