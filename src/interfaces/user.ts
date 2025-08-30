import {regType} from '../types/users';
import { accStatus } from '@/types/accStatus';
export default interface User {
  RegID: number;
  Name1?: string;
  Name2?: string;
  PhoneNo?: number;
  Email?: string;
  Gender?: string;
  RegType?: regType;
  accStatus?: accStatus;
  UserImage: string | Blob;
  UserPassword:string;
}

export interface Supplier{
    SupplierID: number;
    Name1:string;
    Name2:string;
    PhoneNo:string;
    Email:string;
    Gender:string;
}

export interface Admin{
    AdminUserID: number;
    Name1:string;
    Name2:string;
    PhoneNo:string;
    Email:string;
    Gender:string;
}

export interface HotelOwner{
    OwnerID: number;
    Name1:string;
    Name2:string;
    PhoneNo:string;
    Email:string;
    Gender:string;
}

export interface Customer{
    CustomerID: number;
    Name1:string;
    Name2:string;
    PhoneNo:string;
    Email:string;
    Gender:string;
}

export interface Accountant{
    AccountantID: number;
    UnitID:number;
    Name1:string;
    Name2:string;
    PhoneNo:string;
    Email:string;
    Gender:string;
}

export interface Waiter{
    WaiterID: number;
    UnitID:number;
    Name1:string;
    Name2:string;
    PhoneNo:string;
    Email:string;
    Gender:string;
}

export interface Chef{
    ChefID: number;
    UnitID:number;
    Name1:string;
    Name2:string;
    PhoneNo:string;
    Email:string;
    Gender:string;
}

export interface Manager{
    ManagerID: number;
    UnitID:number;
    Name1:string;
    Name2:string;
    PhoneNo:string;
    Email:string;
    Gender:string;
}