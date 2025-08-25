export interface WaiterPayload {
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

export interface WaiterRow {
  WaiterID: number
  UnitID: number
  Name1: string
  Name2: string
  Email: string
  PhoneNo: string
  accStatus: string
  RegType: string
  UserImage: string | null
  lastAccessed: Date
}
