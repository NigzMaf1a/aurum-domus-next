export default interface Table {
  TableID: number;
  UnitID: number;
  TableName: string;
  TableCapacity: number;
  TableStatus: 'Vacant' | 'Occupied';
}