import Unit from "@/interfaces/unit";

export default function thisUnit(name: string | null, units: Unit[]): Unit | undefined {
    const branch = name?.toLowerCase().trim();
    if (!branch) return undefined;

    return units.find(unit => unit.UnitName.toLowerCase().trim() === branch);
}
