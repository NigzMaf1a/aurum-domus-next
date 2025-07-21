export interface User {
  RegID: number;
  Name1: string;
  Name2: string;
  PhoneNo: number;
  Email: string;
  Gender: 'Male' | 'Female';
  RegType: 'Customer' | 'Manager' | 'Admin' | 'Accountant' | 'Waiter' | 'Chef';
  accStatus: 'Pending' | 'Approved' | 'Inactive';
  image: string; // image URL
}

// Component props
export interface UserProfileCardProps {
  user: User;
}

