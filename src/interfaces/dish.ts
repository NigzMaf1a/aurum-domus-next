export default interface Dish {
  DishID: number;
  UnitID?: number;
  DishName: string;
  DishDescription?: string;
  DishPrice: number;
  Available?: 'YES' | 'NO';
}