//interfaces
import Unit from "@/interfaces/unit";

//service for units
import getUnits from "../api/getUnits";

export default async function thisUnit(name: string | null): Promise<number | undefined> {
    const units:Unit[] = await getUnits();
    const branch = name?.toLowerCase().trim();
    if (!branch) {
        console.error(`Unit is undefined`);
    }

    const currentUnit = units.find(unit => unit.UnitName.toLowerCase().trim() === branch);
    const unitID = currentUnit?.UnitID;
    console.log(`Current unit: ${unitID}`);
    return unitID;
}
