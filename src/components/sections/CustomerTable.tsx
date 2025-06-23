import React, { useEffect, useState } from 'react'
import { fetchVacantTables } from '../../server/utils/api'

interface TableRow {
  TableID: number
  UnitID: string
  TableName: string
  TableStatus: string
  TableCapacity?: number // optional, add if you have this info
}

interface CustomerTableProps {
  unitID: string
}

const CustomerTable: React.FC<CustomerTableProps> = ({ unitID }) => {
  const [tables, setTables] = useState<TableRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTables() {
      try {
        setLoading(true)
        const data = await fetchVacantTables(unitID)
        setTables(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    loadTables()
  }, [unitID])

  const handleReserve = (tableID: number) => {
    // Placeholder for reservation logic
    alert(`Reserved table ${tableID} at unit ${unitID}`)
  }

  if (loading) return <p>Loading vacant tables...</p>
  if (error) return <p>Error: {error}</p>
  if (tables.length === 0) return <p>No vacant tables right now, fam.</p>

  return (
    <div>
      <h3>Vacant Tables in Unit {unitID}</h3>
      {tables.map(table => (
        <div key={table.TableID} className="card mb-3 p-3 shadow-sm">
          <h5>Unit ID: {table.UnitID}</h5>
          <h6>Table NO: {table.TableID}</h6>
          <p>Table Name: {table.TableName}</p>
          <p>Table Capacity: {table.TableCapacity ?? 'N/A'}</p>
          <div>Table Status: {table.TableStatus === 'Occupied' ? 'Occupied' : 'Vacant'}</div>
          {table.TableStatus === 'Vacant' && (
            <button
              onClick={() => handleReserve(table.TableID)}
              style={{
                backgroundColor: 'green',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '8px',
              }}
            >
              Reserve
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default CustomerTable
