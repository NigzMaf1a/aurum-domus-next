import { RowDataPacket } from "mysql2";

export interface OrderRow extends RowDataPacket{
  OrderID: number;
  UnitID: number;
  CustomerID?: number;
  DishID?: number;
  DishName: string;
  DishPrice: number;
  Plates: number;
  OrderPrice: number;
  OrderDate: string; // YYYY-MM-DD
  OrderTime: string; // HH:mm:ss
  PaymentStatus: 'Paid' | 'Not Paid';
  Served: 'YES' | 'NO';
}

export interface AddOrderPayload {
  customerID?: number;
  dishID?: number;
  dishName: string;
  dishPrice: number;
  plates: number;
  orderPrice: number;
  orderDate: string;
  orderTime: string;
  paymentStatus: 'Paid' | 'Not Paid';
  served: 'YES' | 'NO';
}
