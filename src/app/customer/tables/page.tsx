'use client';

import { useEffect, useState, useMemo } from 'react';

// sample data
import disTables from '@/utilscripts/tables';

// interfaces, types
import Table from '@/interfaces/table';

// components
import Skeleton from '@/components/containers/Skeleton';
import CustomerTables from '@/components/cards/tables/CustomerTables';
import DynamicInput from '@/components/inputs/DynamicInput';
import FleshVert from '@/components/containers/FleshVert';
import Ribz from '@/components/containers/Ribz';
import FleshHor from '@/components/containers/FleshHor';
import DynamicP from '@/components/p/DynamicP';

export default function CustomerTablesPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchPar, setSearchPar] = useState('');

  // Fetch tables on mount
  useEffect(() => {
    try {
      setTables(disTables);
    } catch {
      setError('Failed to fetch hotel tables.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized filtered tables
  const filteredTables = useMemo(() => {
    const searchLower = searchPar.toLowerCase().trim();
    if (!searchLower) return tables;

    return tables.filter((table) =>
      table.TableName.toLowerCase().includes(searchLower) ||
      String(table.TableCapacity).includes(searchLower) ||
      table.TableStatus.toLowerCase().includes(searchLower)
    );
  }, [tables, searchPar]);

  return (
    <Skeleton className="container py-5">
      <h2 className="text-center mb-4 textColorless">Available Hotel Tables</h2>
      <Ribz style={{height:'100px', backgroundColor:'#52D017'}}></Ribz>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <FleshVert className="h-auto mt-2">
          <DynamicInput
            value={searchPar}
            onChange={setSearchPar}
            placeholder="Search tables by name, capacity, or status..."
            className="mb-3 col-12 col-sm-6 col-md-6 col-lg-12"
          />

          {filteredTables.length > 0 ? (
            <CustomerTables tables={filteredTables} />
          ) : (
            <FleshHor style={{height:'70px'}}
                      className='bg-light justify-content-center align-items-center'
            >
              <DynamicP text={"No tables match your search."}/>
            </FleshHor>
          )}
        </FleshVert>
      )}
    </Skeleton>
  );
}
