import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

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
