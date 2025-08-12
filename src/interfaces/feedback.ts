export default interface Feedback {
  feedbackID?: number;
  email: string;
  comments: string;
  response: string | null;
  rating: number;
  feedbackDate: string;
}