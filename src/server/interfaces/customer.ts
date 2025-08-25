export interface CustomerPayload {
  Name1: string
  Name2: string
  PhoneNo: string
  Email: string
  UserPassword: string
  Gender: 'Male' | 'Female'
  dLocation?: string
  accStatus?: 'Pending' | 'Approved' | 'Inactive'
  UserImage?: string
}

export interface CustomerRow {
  CustomerID: number
  Name1: string
  Name2: string
  Email: string
  PhoneNo: string
  accStatus: string
  RegType: string
  UserImage: string | null
  lastAccessed: Date
}
