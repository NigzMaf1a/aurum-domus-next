import Unit from "@/interfaces/unit";

export default async function getUnits(): Promise<Unit[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/unit/public`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch units: ${res.status} ${res.statusText}`);
    }

    const data: Unit[] = await res.json();
    console.log("Units fetched successfully:", data);
    return data;
  } catch (err) {
    console.error("Error fetching units:", err);
    return [];
  }
}