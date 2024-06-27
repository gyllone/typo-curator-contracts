import { Deployments, Client } from "../constants";
import { DepositVault } from "../../output/contract_DepositVault";

async function main() {
    const deposit_vault = DepositVault.fromAddress(Deployments.DepositVault);
    const deposit_vault_contract = Client.open(deposit_vault);
    // get data
    const data = await deposit_vault_contract.getGetData();
    console.log("deposit vault data: ", data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});