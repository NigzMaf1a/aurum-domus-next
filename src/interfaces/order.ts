export default interface Order {
  OrderID: number;
  DishID: number;
  DishName: string;
  DishPrice: number;
  Plates: number;
  OrderPrice: number;
  OrderDescription: string;
  OrderDate: string;
  OrderTime: string;
  PaymentStatus: 'Paid' | 'Not Paid';
  Served: 'YES' | 'NO';
}