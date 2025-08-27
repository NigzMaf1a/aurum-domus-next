import { paymentStatus, reservationStatus } from "@/types/dishes";
export default interface Reservation {
  ReservationID: number;
  UnitID: number;
  TableID: number;
  CustomerID:number;
  OrderID: number;
  DishID: number;
  DishName: string;
  Plates: number;
  OrderPrice: number;
  PaymentStatus: paymentStatus;
  ReservationDate: string;
  ReservationTime: string;
  ReservationStatus: reservationStatus;
  Image:File;
}