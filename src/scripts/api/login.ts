import Unit from '../../interfaces/unit';
import User from '@/interfaces/user';
import { StringOrNumber } from '@/types/customer';
import { LogginCreds } from '@/interfaces/user';
import apiFetch from './apiFetch';

// utils/auth.ts
export interface LoginResponse {
  token: StringOrNumber;
  user?: User;
}
function returnUnitNames(units: Unit[]): string[] {
  return units.map((unit) => unit.UnitName);
}

export default async function loginUser(creds: LogginCreds): Promise<LoginResponse> {
  try {
    return await apiFetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(creds),
    });
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
}


export { returnUnitNames, loginUser};