import React from "react";
interface DashTabProps<T extends object> {
  data: T[];              // array of objects with a known shape
  columns: (keyof T)[];   // keys from that object
  columnNames: string[];  // display names
}

export default function DashTab<T extends object>({
  data,
  columns,
  columnNames,
}: DashTabProps<T>) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const displayCols = columns.slice(0, 7);
  const displayNames = columnNames.slice(0, 7);

  return (
    <div className="table-responsive">
      <table className="table table-bordered rounded table-striped table-hover align-middle text-center">
        <thead className="table-light">
          <tr>
            {displayNames.map((name, idx) => (
              <th key={idx}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {displayCols.map((col, colIndex) => (
                <td key={colIndex}>{String(row[col])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
