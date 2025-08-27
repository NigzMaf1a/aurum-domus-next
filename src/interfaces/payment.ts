import { paymentType } from "@/types/paymentType";
export default interface Payment {
  PaymentID: number;
  UnitID: number;
  FinanceID: number;
  CustomerID:number;
  OrderID:number;
  Name1: string;
  Name2: string;
  PaymentType: paymentType;
  PaymentAmount: number;
  PaymentDate: string;
  PaymentTime: string;
}