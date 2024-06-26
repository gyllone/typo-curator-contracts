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

    // Sign message with another keypair
    const withdraw_account = await WithdrawAccount.fromInit(wallet.address, Deployments.WithdrawVault);
    const seqno = BigInt(0);
    const withdraw_amount = BigInt(10000000000);
    const digest = beginCell()
        .storeAddress(withdraw_account.address)
        .storeUint(seqno, 64)
        .storeCoins(withdraw_amount)
        .endCell()
        .hash();
    const keypair2 = await getKeyPair2();
    const sig = sign(digest, keypair2.secretKey);
    
    await Client.open(withdraw_account).send(
        sender,
        { value: toNano("0.2") },
        {
            $$type: "WithdrawRequest",
            seqno: seqno,
            amount: withdraw_amount,
            pubkey: BigInt(`0x${digest.toString("hex")}`),
            signature: beginCell().storeBuffer(sig).endCell(),
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});