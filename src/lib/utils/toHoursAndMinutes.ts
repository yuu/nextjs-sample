import { Option, Some } from 'ts-results'
import { differenceInMinutes } from 'date-fns'

type SimpleTime = {
  hours: number
  minutes: number
}

export const toHoursAndMinutes = (totalMinutes: number): Option<SimpleTime> => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return Some({ hours, minutes })
}

export const diffMin = (startAt: Date, endAt: Date): Option<number> => {
  const mins = differenceInMinutes(endAt, startAt)

  return Some(mins)
}
