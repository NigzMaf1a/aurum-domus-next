export default interface Feedback {
  FeedbackID: number;
  UnitID: number;
  CustomerID:number;
  Email: string;
  Comments: string;
  Response: string | null;
  Rating: number;
  FeedbackDate: string;
}