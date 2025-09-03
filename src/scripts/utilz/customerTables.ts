import Table from "@/interfaces/table";

export function returnTableNames(tables: Table[]): string[] {
  return tables.map(table => table.TableName);
}

export function returnTableID(tableName: string, tables: Table[]): number {
  const table = tables.find(t => t.TableName === tableName);
  if (!table) {
    throw new Error(`Table with name "${tableName}" not found`);
  }
  return table.TableID;
}
