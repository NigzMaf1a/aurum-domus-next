export default interface Feedback {
  FeedbackID: number;
  Email: string;
  Comments: string;
  Response: string | null;
  Rating: number;
  FeedbackDate: string;
}