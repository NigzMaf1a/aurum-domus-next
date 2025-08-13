import Unit from '../interfaces/unit';
import User from '@/interfaces/user';
import { StringOrNumber } from '@/types/customer';

// utils/auth.ts
export interface LoginResponse {
  token: StringOrNumber;
  user?: User;
}
function returnUnitNames(units: Unit[]): string[] {
  return units.map((unit) => unit.UnitName);
}

async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Login failed');
    }

    return await res.json();
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
}


export { returnUnitNames, loginUser};