import { available } from "@/types/dishes";
export default interface Dish {
  DishID: number;
  UnitID?: number;
  DishName: string;
  DishDescription?: string;
  DishPrice: number;
  Available?: available;
}