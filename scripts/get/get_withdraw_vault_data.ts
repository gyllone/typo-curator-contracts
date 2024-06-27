import { Deployments, Client } from "../constants";
import { WithdrawVault } from "../../output/contract_WithdrawVault";

async function main() {
    const withdraw_vault = WithdrawVault.fromAddress(Deployments.WithdrawVault);
    const withdraw_vault_contract = Client.open(withdraw_vault);
    // get data
    const data = await withdraw_vault_contract.getGetData();
    console.log("withdraw vault data: ", data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});