import { Moment } from 'moment'

export interface DayInMonth {
  label: string
  date: Moment
  dayInWeek: number
  disabled?: boolean
}
