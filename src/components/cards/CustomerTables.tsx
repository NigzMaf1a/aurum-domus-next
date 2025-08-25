import React from 'react';

type HotelTable = {
  UnitID: string;
  TableID: string;
  TableName: string;
  TableCapacity: number;
  TableStatus: string;
};

interface CustomerTablesProps{
    tables:HotelTable[];
    loading:boolean;
}

function CustomerTables({tables, loading}:CustomerTablesProps) {
  return (
        <div className="row g-3">
          {tables.map((table, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h1 className="card-title fs-4">UnitID: {table.UnitID}</h1>
                  <h2 className="fs-5 text-primary">TableID: {table.TableID}</h2>
                  <h3 className="fs-6">{table.TableName}</h3>
                  <p className="mb-1">
                    <strong>Capacity:</strong> {table.TableCapacity}
                  </p>
                  <p className="mb-0">
                    <strong>Status:</strong>{' '}
                    <span
                      className={
                        table.TableStatus.toLowerCase() === 'available'
                          ? 'text-success'
                          : 'text-danger'
                      }
                    >
                      {table.TableStatus}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}

          {tables.length === 0 && !loading && (
            <p className="text-center text-muted">No tables found.</p>
          )}
        </div>
  )
}

export default CustomerTables