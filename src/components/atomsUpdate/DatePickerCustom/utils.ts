import moment, { Moment } from 'moment'
import { DayInMonth } from './type'
import { PRIMARY } from '@/components/layouts/WrapLayout/Theme/colors'

const handleRenderDate = (
  dayInWeek: number,
  time: string,
  type: 'BEFORE' | 'AFTER'
) => {
  const listDays: DayInMonth[] = []

  if (type === 'BEFORE') {
    if (dayInWeek === 1) {
      return [] as DayInMonth[]
    } else {
      const lengthDay = dayInWeek === 0 ? 6 : dayInWeek - 1
      const monthDate = moment(time, 'MM/YYYY').subtract(1, 'months')
      const monthDateString = moment(time, 'MM/YYYY')
        .subtract(1, 'months')
        .format('MM/YYYY')
      const currentDayInMonth = monthDate.daysInMonth()
      Array.from(Array(currentDayInMonth).keys())
        .slice(-lengthDay)
        .forEach((day) => {
          const currentDay = day + 1
          let dateCurrent = `${currentDay}/${monthDateString}`
          listDays.push({
            date: moment(dateCurrent, 'DD/MM/YYYY'),
            dayInWeek: moment(dateCurrent, 'DD/MM/YYYY').weekday(),
            label: currentDay < 10 ? `0${currentDay}` : `${currentDay}`,
            disabled: true,
          })
        })
      return listDays
    }
  } else {
    if (dayInWeek === 0) {
      return [] as DayInMonth[]
    } else {
      const lengthDay = dayInWeek === 1 ? 6 : 7 - dayInWeek
      const monthDate = moment(time, 'MM/YYYY').add(1, 'months')
      const monthDateString = monthDate.format('MM/YYYY')
      const currentDayInMonth = monthDate.daysInMonth()
      Array.from(Array(currentDayInMonth).keys())
        .slice(0, lengthDay)
        .forEach((day) => {
          const currentDay = day + 1
          let dateCurrent = `0${currentDay}/${monthDateString}`
          listDays.push({
            date: moment(dateCurrent, 'DD/MM/YYYY'),
            dayInWeek: moment(dateCurrent, 'DD/MM/YYYY').weekday(),
            label: currentDay < 10 ? `0${currentDay}` : `${currentDay}`,
            disabled: true,
          })
        })
      return listDays
    }
  }
}

export const renderDayByMonth = (time: string) => {
  const listDays: DayInMonth[] = []
  const currentDayInMonth = moment(time, 'MM/YYYY').daysInMonth()
  Array.from(Array(currentDayInMonth).keys()).forEach((day) => {
    const currentDay = day + 1
    let dateCurrent = `${currentDay}/${time}`
    if (currentDay < 10) {
      dateCurrent = `0${currentDay}/${time}`
    }
    listDays.push({
      date: moment(dateCurrent, 'DD/MM/YYYY'),
      dayInWeek: moment(dateCurrent, 'DD/MM/YYYY').weekday(),
      label: currentDay < 10 ? `0${currentDay}` : `${currentDay}`,
    })
  })

  const previousDate = handleRenderDate(listDays[0].dayInWeek, time, 'BEFORE')
  const afterDate = handleRenderDate(
    listDays[currentDayInMonth - 1].dayInWeek,
    time,
    'AFTER'
  )

  return [...previousDate, ...listDays, ...afterDate]
}

export const handleColorDate = (
  date: Moment,
  startDate: Moment | null,
  endDate: Moment | null
) => {
  if (!!startDate && !!endDate) {
    if (date.isSame(startDate) || date.isSame(endDate)) {
      return PRIMARY
    } else if (date.isAfter(startDate) && date.isBefore(endDate)) {
      return '#FEF2F5'
    } else return undefined
  } else if (!!startDate && date.isSame(startDate)) {
    return PRIMARY
  } else if (!!endDate && date.isSame(endDate)) {
    return PRIMARY
  } else return undefined
}
