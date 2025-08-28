export type UnitBio = {
  unitName: string;
  description: string;
};

export type StringOrNumber = string | number | null | undefined;

export type Feedback = {
  email: string;
  comment: string;
  response: string;
  rating: number;
  date: string;
};