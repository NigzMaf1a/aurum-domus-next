import React from "react";

interface DashTabProps {
  data: Record<string, any>[];   // JSON data
  columns: string[];             // keys from the objects (max 7)
  columnNames: string[];         // display names for those keys
}

export default function DashTab({ data, columns, columnNames }: DashTabProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className="col-lg-12 col-sm-6 mb-3 px-2 py-4 gap-5 rounded overflow-auto overflow-lg-visible"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <p className="text-center m-0">No data available</p>
      </div>
    );
  }

  // enforce max 7 columns
  const displayCols = columns.slice(0, 7);
  const displayNames = columnNames.slice(0, 7);

  return (
    <div
      className="col-lg-12 col-sm-6 mb-3 px-2 py-4 gap-5 rounded overflow-auto overflow-lg-visible"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover align-middle text-center">
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
                  <td key={colIndex}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
