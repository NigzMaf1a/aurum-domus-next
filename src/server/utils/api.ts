export async function fetchVacantTables(unitID: string) {
  const res = await fetch(`/api/tables/${unitID}/vacant`)
  if (!res.ok) throw new Error('Failed to fetch vacant tables')
  return res.json() // Vacant tables as JSON
}

export async function fetchOccupiedTables(unitID: string) {
  const res = await fetch(`/api/tables/${unitID}/occupied`)
  if (!res.ok) throw new Error('Failed to fetch occupied tables')
  return res.json() // Occupied tables as JSON
}
export async function fetchAllTables(unitID: string) {
  const res = await fetch(`/api/tables/${unitID}/all`)
  if (!res.ok) throw new Error('Failed to fetch all tables')
  return res.json() // All tables as JSON
}