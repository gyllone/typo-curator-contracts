import { beginCell, toNano } from "@ton/core";
import { sign } from "@ton/crypto";
import { BadgeCollection } from "../../output/contract_BadgeCollection";
import { Client, BadgeCollectionUrl } from "../constants";
import { getKeyPair, getKeyPair2, getWallet } from "../utils";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    // Sign message with another keypair
    const content = beginCell().storeInt(0x01, 8).storeStringRefTail(BadgeCollectionUrl).endCell();
    const collection = await BadgeCollection.fromInit(wallet.address, content);

    // expired after 5 min
    const expiration = BigInt(Math.ceil(Date.now() / 1000) + 5 * 60);
    const item_index = BigInt(0);
    const digest = beginCell()
        .storeAddress(collection.address)
        .storeAddress(wallet.address)
        .storeUint(item_index, 64)
        .storeUint(expiration, 64)
        .endCell()
        .hash();
    // Keypair2 should be stored backend
    const keypair2 = await getKeyPair2();
    const sig = sign(digest, keypair2.secretKey);

    await Client.open(collection).send(
        sender,
        { value: toNano("0.2") },
        {
            $$type: "MintBadgeItem",
            index: item_index,
            expiration: expiration,
            signature: beginCell().storeBuffer(sig).endCell(),
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});