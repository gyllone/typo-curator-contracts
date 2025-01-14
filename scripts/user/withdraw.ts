import { beginCell, toNano } from "@ton/core";
import { sign } from "@ton/crypto";
import { WithdrawAccount } from "../../output/contract_WithdrawAccount";
import { Deployments, Client } from "../constants";
import { getKeyPair, getKeyPair2, getWallet } from "../utils";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const withdraw_account = await WithdrawAccount.fromInit(wallet.address, Deployments.WithdrawVault);
    // expired after 5 min
    const expiration = BigInt(Math.ceil(Date.now() / 1000) + 5 * 60);
    // seqno should be read from user withdraw account!!!
    const seqno = BigInt(0);
    const withdraw_amount = BigInt(1000000000);
    const digest = beginCell()
        .storeAddress(withdraw_account.address)
        .storeUint(seqno, 64)
        .storeUint(expiration, 64)
        .storeCoins(withdraw_amount)
        .endCell()
        .hash();
    // Keypair2 should be stored backend
    const keypair2 = await getKeyPair2();
    const sig = sign(digest, keypair2.secretKey);

    await Client.open(withdraw_account).send(
        sender,
        { value: toNano("0.1") },
        {
            $$type: "WithdrawRequest",
            seqno: seqno,
            expiration: expiration,
            amount: withdraw_amount,
            pubkey: BigInt(`0x${keypair2.publicKey.toString("hex")}`),
            signature: beginCell().storeBuffer(sig).endCell(),
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});