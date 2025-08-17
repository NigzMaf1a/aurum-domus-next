export default interface Feedback {
  feedbackID?: number;
  UnitID: number;
  email: string;
  comments: string;
  response: string | null;
  rating: number;
  feedbackDate: string;
}