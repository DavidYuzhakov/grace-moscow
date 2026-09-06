export interface DutyRole {
  id: number
  documentId: string
  name: string
  order: number
}

export interface Sunday {
  id: number
  documentId: string
  date: string
  duties: Duty[]
}

export interface Duty {
  id: number
  documentId: string
  person: string | null
  duty_role: DutyRole | null
}

export interface SundaySchedule {
  sundays: Sunday[]
  dutyRoles: DutyRole[]
}
