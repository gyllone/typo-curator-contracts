import { Deployments, Client } from "../constants";
import { WithdrawAccount } from "../../output/contract_WithdrawAccount";
import { getKeyPair, getWallet } from "../utils";

async function main() {
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const withdraw_account = await WithdrawAccount.fromInit(wallet.address, Deployments.WithdrawVault);
    const withdraw_account_contract = Client.open(withdraw_account);
    // get data
    const data = await withdraw_account_contract.getGetData();
    console.log("withdraw account data: ", data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});