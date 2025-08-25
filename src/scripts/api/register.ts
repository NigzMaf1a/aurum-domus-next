import apiFetch from "./apiFetch";

// Interfaces / types
import { gender } from "@/types/gender";
import { regType } from "@/types/users";
import { accStatus } from "@/types/accStatus";

interface User {
  Name1?: string;
  Name2?: string;
  PhoneNo?: string; // changed to string for safer phone handling
  Email?: string;
  UserPassword: string;
  Gender?: gender;
  RegType?: regType;
  dLocation?: string;
  accStatus?: accStatus;
  UserImage?: string;
}

interface RegisterResponse {
  RegID?: number;
  message?: string;
  error?: string;
}

export default async function register(user: User): Promise<RegisterResponse> {
  // Map user types to their respective API endpoints
  const apiMap: Record<regType, string> = {
    Customer: '/api/customer/public/add',
    Accountant: '/api/accountant/add',
    Admin: '/api/admin/add',
    Manager:'/api/manager/add',
    Chef:'/api/chef/add',
    Owner:'/api/owner/add',
    Supplier:'/api/supplier/add',
    Waiter:'/api/waiter/add'
  };

  // Get the correct API endpoint from the map
  const regAPI = user.RegType ? apiMap[user.RegType] : undefined;

  if (!regAPI) {
    throw new Error('Invalid registration type');
  }

  try {
    console.log('I am really here man');
    const result = await apiFetch<RegisterResponse>(regAPI, {
      method: 'POST',
      body: JSON.stringify(user),
    });

    if (result.error) {
      throw new Error(result.error);
    }

    console.log('User registered successfully:', result);
    return result;
  } catch (err) {
    console.error('Error occurred while registering the user:', err);
    throw err;
  }
}
