import Hotel from "../../interfaces/hotel";
import apiFetch  from "./apiFetch";

export default async function getHotels(): Promise<Hotel[]> {
  try {
    const data = await apiFetch<Hotel[]>('/api/hotel/public');
    console.log("Hotels fetched successfully:", data);
    return data;
  } catch (err) {
    console.error("Error fetching hotels:", err);
    return [];
  }
}