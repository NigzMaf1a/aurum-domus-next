import { tableStatus } from "@/types/tableStatus";
export default interface Table {
  TableID: number;
  UnitID: number;
  TableName: string;
  TableCapacity: number;
  TableStatus: tableStatus;
}