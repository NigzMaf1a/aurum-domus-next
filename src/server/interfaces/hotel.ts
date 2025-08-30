export interface HotelPayload {
  OwnerID: number
  HotelName: string
  HotelEmail: string
  HotelLogo?: Buffer | null
}

export interface HotelRow {
  HotelID: number
  OwnerID: number
  HotelName: string
  HotelEmail: string
  HotelLogo?: Buffer | null
}
