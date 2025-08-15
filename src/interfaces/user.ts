import {regType} from '../types/users';
import { gender } from '@/types/gender';
import { accStatus } from '@/types/accStatus';
export default interface User {
  RegID: number;
  Name1?: string;
  Name2?: string;
  PhoneNo?: number;
  Email?: string;
  Gender?: gender;
  RegType?: regType;
  accStatus?: accStatus;
  image?: string;
}

export interface LogginCreds{
  email:string;
  password:string;
}