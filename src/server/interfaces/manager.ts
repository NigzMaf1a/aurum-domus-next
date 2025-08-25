export interface ManagerPayload {
  Name1: string
  Name2: string
  PhoneNo: string
  Email: string
  Password: string
  Gender: 'Male' | 'Female'
  UnitID: number
  dLocation?: string
  accStatus?: 'Pending' | 'Approved' | 'Inactive'
  UserImage?: string
}

export interface ManagerRow {
  ManagerID: number
  UnitID: number
  Name1: string
  Name2: string
  PhoneNo: string
  Email: string
  Gender: 'Male' | 'Female'
  dLocation?: string
  accStatus: string
  UserImage: string | null
  lastAccessed: Date
}
