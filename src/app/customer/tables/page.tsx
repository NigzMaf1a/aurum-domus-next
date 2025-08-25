'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

//interfaces, types
import { HotelTable } from '@/types/hotelTable';

//components
import Skeleton from '@/components/containers/Skeleton';
import CustomerTables from '@/components/cards/CustomerTables';


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
    <Skeleton className="container py-5">
      <h2 className="text-center mb-4 textColorless">Available Hotel Tables</h2>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      <div
        className="p-3 border rounded shadow-sm"
        style={{ maxHeight: '500px', overflowY: 'auto' }}
      >
        <CustomerTables tables={tables} loading={loading}/>
      </div>
    </Skeleton>
  );
}
