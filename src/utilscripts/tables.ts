import type Table from "../interfaces/table";
import { tableStatus } from "@/types/tableStatus";

const disTables: Table[] = [];
let tableID = 1;

// 15 units (5 per hotel × 3 hotels)
for (let unitID = 1; unitID <= 15; unitID++) {
  for (let t = 1; t <= 10; t++) {
    const statusOptions: tableStatus[] = ["Vacant", "Occupied"];
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    disTables.push({
      TableID: tableID,
      UnitID: unitID,
      TableName: `Table ${t} - Unit ${unitID}`,
      TableCapacity: Math.floor(Math.random() * 6) + 2, 
      TableStatus: randomStatus,
      TableImage: `/aurum2.jpg`,
    });
    tableID++;
  }
}

export default disTables;
