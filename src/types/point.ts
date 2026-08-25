export interface PointOfInterest {
  id: string
  lng: number
  lat: number
  label: string
  comment: string
  createdAt: string
}

export type BilanRole = 'individuelle' | 'groupe'

export interface Bilan {
  id: string
  role: BilanRole
  createdAt: string
}
