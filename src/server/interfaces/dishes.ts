import { RowDataPacket } from 'mysql2';

export interface DishRow extends RowDataPacket {
  DishID: number;
  UnitID: number;
  DishName: string;
  DishDescription?: string;
  DishPrice: number;
  Available: 'YES' | 'NO';
}

export interface AddDishPayload {
  dishName: string;
  dishDescription?: string;
  dishPrice: number;
  available: 'YES' | 'NO';
}
