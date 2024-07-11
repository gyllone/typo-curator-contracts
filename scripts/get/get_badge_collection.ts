import { Deployments, Client } from "../constants";
import { BadgeCollection } from "../../output/contract_BadgeCollection";

async function main() {
    const collection = BadgeCollection.fromAddress(Deployments.BadgeCollection);
    const collection_contract = Client.open(collection);
    // get data
    const data = await collection_contract.getGetCollectionData();
    console.log("deposit vault data: ", data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});