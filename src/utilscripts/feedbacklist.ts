import Feedback from '../interfaces/feedback';

const feedbackList: Feedback[] = [
  {
    FeedbackID: 1,
    UnitID: 3,
    CustomerID: 101,
    Email: "jane.doe@example.com",
    Comments: "The room was clean and comfortable, but the Wi-Fi was a bit slow.",
    Response: "Thanks for your feedback, Jane! We're upgrading our Wi-Fi soon.",
    Rating: 4,
    FeedbackDate: "2025-08-10T14:22:00Z"
  },
  {
    FeedbackID: 2,
    UnitID: 5,
    CustomerID: 102,
    Email: "mark.taylor@example.com",
    Comments: "Loved the breakfast options, especially the fresh fruit.",
    Response: null,
    Rating: 5,
    FeedbackDate: "2025-08-12T09:10:00Z"
  },
  {
    FeedbackID: 3,
    UnitID: 2,
    CustomerID: 103,
    Email: "sarah.lee@example.com",
    Comments: "Service was friendly but the room felt a bit cramped.",
    Response: "We appreciate your honesty, Sarah. We'll look into room spacing.",
    Rating: 3,
    FeedbackDate: "2025-08-13T17:45:00Z"
  },
  {
    FeedbackID: 4,
    UnitID: 7,
    CustomerID: 104,
    Email: "david.chen@example.com",
    Comments: "Excellent view from the balcony. Totally worth the price.",
    Response: "Glad you enjoyed the view, David! Hope to host you again.",
    Rating: 5,
    FeedbackDate: "2025-08-15T12:05:00Z"
  },
  {
    FeedbackID: 5,
    UnitID: 1,
    CustomerID: 105,
    Email: "lucy.brown@example.com",
    Comments: "Air conditioning wasn't working properly at night.",
    Response: "Sorry about that, Lucy. Maintenance has fixed the issue.",
    Rating: 2,
    FeedbackDate: "2025-08-16T22:30:00Z"
  },
  {
    FeedbackID: 6,
    UnitID: 4,
    CustomerID: 106,
    Email: "tom.harris@example.com",
    Comments: "The staff went above and beyond to make our anniversary special.",
    Response: "Happy anniversary again, Tom! We're happy we could make it memorable.",
    Rating: 5,
    FeedbackDate: "2025-08-18T08:15:00Z"
  },
  {
    FeedbackID: 7,
    UnitID: 6,
    CustomerID: 107,
    Email: "nina.williams@example.com",
    Comments: "The pool area was a bit crowded in the afternoon.",
    Response: null,
    Rating: 3,
    FeedbackDate: "2025-08-19T16:00:00Z"
  },
  {
    FeedbackID: 8,
    UnitID: 8,
    CustomerID: 108,
    Email: "alex.jones@example.com",
    Comments: "Room service took too long to deliver dinner.",
    Response: "Apologies, Alex. We're revising our service process to be quicker.",
    Rating: 2,
    FeedbackDate: "2025-08-20T19:40:00Z"
  },
  {
    FeedbackID: 9,
    UnitID: 9,
    CustomerID: 109,
    Email: "olivia.martin@example.com",
    Comments: "Loved the decor and the calm vibe of the lobby.",
    Response: "Thanks, Olivia! We’re happy you felt at home.",
    Rating: 5,
    FeedbackDate: "2025-08-22T11:30:00Z"
  },
  {
    FeedbackID: 10,
    UnitID: 10,
    CustomerID: 110,
    Email: "ryan.smith@example.com",
    Comments: "Parking space was limited and inconvenient.",
    Response: "Thanks for pointing that out, Ryan. We're expanding our parking soon.",
    Rating: 3,
    FeedbackDate: "2025-08-25T07:55:00Z"
  }
];

export default feedbackList;
