import { accStatus } from "@/types/accStatus";
import { gender } from "@/types/gender";
import { regType } from "@/types/users";
export interface User {
  RegID: number;
  Name1: string;
  Name2: string;
  PhoneNo: number;
  Email: string;
  Gender: gender;
  RegType: regType;
  accStatus: accStatus;
  image: string;
}

// Component props
export interface UserProfileCardProps {
  user: User;
}

