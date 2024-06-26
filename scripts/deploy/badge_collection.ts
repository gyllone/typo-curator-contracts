import { beginCell, toNano } from "@ton/core";
import { BadgeCollection } from "../../output/contract_BadgeCollection";
import { Client } from "../constants";
import { getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const badge_content = beginCell().endCell();
    const badge_collection = await BadgeCollection.fromInit(wallet.address, badge_content);
    await Client.open(badge_collection).send(
        sender,
        { value: toNano("0.2") },
        {
            $$type: "Deploy",
            queryId: 0n,
        },
    );
    console.log("Badge collection address", badge_collection.address.toString({ testOnly: true }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});