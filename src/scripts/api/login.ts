import Unit from '../../interfaces/unit';
import User from '@/interfaces/user';
import { LogginCreds } from '@/interfaces/user';
import apiFetch from './apiFetch';

export interface LoginResponse {
  token: string;
  user?: User;
}
function returnUnitNames(units: Unit[]): string[] {
  return units.map((unit) => unit.UnitName);
}

export default async function loginUser(creds: LogginCreds): Promise<LoginResponse> {
  try {
    console.log('We are really here man');
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