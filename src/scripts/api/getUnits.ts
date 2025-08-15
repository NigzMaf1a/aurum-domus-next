import Unit from "@/interfaces/unit";
import apiFetch  from "./apiFetch";

export default async function getUnits(): Promise<Unit[]> {
  try {
    const data = await apiFetch<Unit[]>('/api/unit/public');
    console.log("Units fetched successfully:", data);
    return data;
  } catch (err) {
    console.error("Error fetching units:", err);
    return [];
  }
}
