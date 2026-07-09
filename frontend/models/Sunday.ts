export interface Sunday {
  date: string
  duties: Duty[]
}

interface Duty {
  person: string
  role: string
  id: string
}
