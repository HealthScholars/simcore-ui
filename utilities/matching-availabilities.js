const { flow, reduce, tap, range, rangeRight, zipObject, mapValues, times, constant, difference } = require('lodash/fp')
const { expandAvailability } = require('./expand-availability')
const { eventsToAvailabilities } = require('./events-to-availabilities')
const { getPersonBookings } = require('./events-to-availabilities')

function matchingAvailabilities(days, events, filters) {
  return flow([
    initializeMonth,
    filterOutNonMatching('instructors'),
    filterOutNonMatching('learners'),
  ])(days)

  function filterOutNonMatching(type){
    return days => {
      const peopleBookings = getPersonBookings(events)
      return mapValues((dayAvailabilities, date) => {
        return reduce((dayAvailabilities, instructor) => {
          return difference(peopleBookings[date][instructor.id])(dayAvailabilities)
        }, dayAvailabilities, filters[type])
      }, days)
    }
  }

  function initializeMonth(days){
    return flow([
      zipObject,
      day => day(times(constant([]), days.length)),
      mapValues(day => expandAvailability(0.5, 24)),
    ])(days)
  }
}


module.exports = {
  matchingAvailabilities,
}
