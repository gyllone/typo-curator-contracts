import { Deployments, Client } from "../constants";
import { DepositAccount } from "../../output/contract_DepositAccount";
import { getKeyPair, getWallet } from "../utils";

async function main() {
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const deposit_account = await DepositAccount.fromInit(wallet.address, Deployments.DepositVault);
    const deposit_account_contract = Client.open(deposit_account);
    // get data
    const data = await deposit_account_contract.getGetData();
    console.log("deposit account data: ", data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});