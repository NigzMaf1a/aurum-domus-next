'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type HotelTable = {
  UnitID: string;
  TableID: string;
  TableName: string;
  TableCapacity: number;
  TableStatus: string;
};

export default function CustomerTablesPage() {
  const [tables, setTables] = useState<HotelTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await axios.get('/api/hoteltables');
        setTables(res.data);
      } catch {
        setError('Failed to fetch hotel tables.');
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 textColorless">Available Hotel Tables</h2>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Scrollable Container */}
      <div
        className="p-3 border rounded shadow-sm"
        style={{ maxHeight: '500px', overflowY: 'auto' }}
      >
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
      </div>
    </div>
  );
}
