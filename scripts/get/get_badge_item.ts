import { Deployments, Client } from "../constants";
import { BadgeItem } from "../../output/contract_BadgeItem";

async function main() {
    const index = BigInt(0);
    const badge_item = await BadgeItem.fromInit(Deployments.BadgeCollection, index);
    const badge_item_contract = Client.open(badge_item);
    // get data
    const data = await badge_item_contract.getGetNftData();
    console.log("badge item data #%d: ", index, data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});