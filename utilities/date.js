import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { times, flow, zipObject, times, constant, mapValues } from 'lodash/fp'
import { expandAvailability } from './expand-availability'

dayjs.extend(advancedFormat)

export function getBoundariesOfMonth(date) {
  date = dayjs(date)
  return {
    startDate: date.startOf('month').format('YYYY-MM-DD'),
    endDate: date.endOf('month').format('YYYY-MM-DD'),
  }
}

export function formatDateForDisplay(date, format) {
  return dayjs(date).format(format)
}

export function formatHoursAsMeridians(hour) {
  hour = hour === 0 || hour === 24
    ? 'Midnight'
    : hour === 12
      ? 'Noon'
      : hour

  return hour > 12 ? `${hour - 12}p` : (+hour ? `${hour}a` : hour)
}

export function formatTimeMeridians(time) {
  return time.replace(':00', '').replace('12am', 'Midnight').replace('12pm', 'Noon')
}

export function formatTimesForDisplay(start, duration) {
  const day = dayjs().startOf('day')

  const startTime   = day.add(start, 'hours').format('h:mma')
  const endTime     = day.add(start + duration, 'hours').format('h:mma')

  return `${formatTimeMeridians(startTime)} – ${formatTimeMeridians(endTime)}`
}

export function formatBlockHoursForDisplay(duration) {
  const output = duration.toString()
    .replace(/\.5/, '½')
    .replace(/^0/, '') || 0

  return `${output} ${(duration > 0 && duration <= 1 ? 'hour' : 'hours')}`
}

export function isDayTime(hour) {
  return hour >= 6 && hour <= 17.5
}

export function isMidnight(hour) {
  return hour === 0 || hour === 24
}

export function isNoon(hour) {
  return hour === 12
}

export function isHour(hour) {
  return hour % 1== 0
}

export function isWholeNumber(number) {
  return number % 1 === 0
}

export function getHour(datetime) {
  const halfHour = +datetime.format('m') === 0
    ? 0
    : 0.5
  return +datetime.format('H') + halfHour
}

export function getDaysInMonth(date) {
  const daysInMonth = []
  let dateCounter = dayjs(date).startOf('month')

  times(count => {
     daysInMonth.push(dateCounter.format('YYYY-MM-DD'))
     dateCounter = dateCounter.add(1, 'day')
  })(dateCounter.daysInMonth());
  return daysInMonth
}

export function initializeMonth(days){
  return flow([
    zipObject,
    day => day(times(constant([]), days.length)),
    mapValues(day => expandAvailability(0.5, 24)),
  ])(days)
}

export function stripTime(datetime) {
  return datetime.split(' ')[0]
}
