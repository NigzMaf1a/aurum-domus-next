import { paymentType } from "@/types/paymentType";
export default interface Payment {
  PaymentID: number;
  FinanceID: number;
  Name1: string;
  Name2: string;
  PaymentType: paymentType;
  PaymentAmount: number;
  PaymentDate: string; // YYYY-MM-DD
  PaymentTime: string; // HH:MM:SS
}