import { paymentStatus, served } from "@/types/dishes";
export default interface Order {
  OrderID: number;
  UnitID?: number;
  RegID?: number;
  DishID: number;
  DishName: string;
  DishPrice: number;
  Plates: number;
  OrderPrice: number;
  OrderDescription: string;
  OrderDate: string;
  OrderTime: string;
  PaymentStatus: paymentStatus;
  Served: served;
}