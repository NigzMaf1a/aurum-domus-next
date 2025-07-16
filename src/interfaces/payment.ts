export default interface Payment {
  PaymentID: number;
  FinanceID: number;
  Name1: string;
  Name2: string;
  PaymentType: 'Mpesa' | 'Cash';
  PaymentAmount: number;
  PaymentDate: string; // YYYY-MM-DD
  PaymentTime: string; // HH:MM:SS
}