import { RowDataPacket } from 'mysql2';

export interface UnitRow extends RowDataPacket {
  UnitID: number;
  HotelID: number;
  OwnerID: number;
  UnitName: string;
  UnitEmail: string;
  UnitPhone: string;
  UnitLocation: string;
  UnitBalance: number;
  Employees: number;
  UnitImage?: string | null;
}

export interface UnitPayload {
  hotelID: number;
  ownerID: number;
  unitName: string;
  unitEmail: string;
  unitPhone: string;
  unitLocation: string;
  unitBalance: number;
  employees?: number;
  unitImage?: string;
}
