export interface Sunday {
  date: string
  duties: Duty[]
}

interface Duty {
  person: string
  duty_role: {
    name: string
    order: number
    time: string
  }
  id: string
}
