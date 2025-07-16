export default interface Reservation {
  ReservationID: number;
  TableID: number;
  OrderID: number;
  DishID: number;
  DishName: string;
  Plates: number;
  OrderPrice: number;
  PaymentStatus: 'Paid' | 'Not Paid';
  ReservationDate: string;
  ReservationTime: string;
  ReservationStatus: 'Attended' | 'Pending';
}