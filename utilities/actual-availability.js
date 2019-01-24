const {
  flow, isEmpty, groupBy, difference, flatMap,
  filter, partial, includes, zipObject, times,
  constant, mapValues, find, keyBy, get, flatten,
  uniq, intersection, map, reduce, reject, any,
  intersectionWith, isEqual, cloneDeep, differenceWith,
  omit, some, identity, omitBy, eq, add,
} = require('lodash/fp')
const mapValuesWithKey = mapValues.convert({ 'cap': false });
const mapWithKey = map.convert({ 'cap': false });
const omitWithKey = omit.convert({ 'cap': false });
const reduceWithIndex = reduce.convert({ 'cap': false });

const { expandAvailability } = require('./expand-availability')
const { normalize } = require('./normalize-availabilities')
const { initializeMonth } = require('./date')

function getPersonActualAvailability(id, days, events, statedAvailabilities = {}) {
  const personFilter = partial(containsSession)([['learners', 'instructors'], id])
  const removeConflictsForThisUser = partial(removeConflicts, [id, events, personFilter])
  const removeNoAvailabilityForThisUser = partial(removeNoAvailability, [id, statedAvailabilities])

  return flow([
    initializeMonth,
    removeConflictsForThisUser,
    removeNoAvailabilityForThisUser,
  ])(days)
}

function getEnoughUsers(_, days, bookings, statedAvailabilities, count) {
  const flippedAvailabilities = removeBookedUsers(
    bookings,
    flipAvailabilities(statedAvailabilities),
  )

  return filterDatesForEnoughUsers(count, flippedAvailabilities)(days)

  function removeBookedUsers(bookings, flippedAvailabilities) {
    return flow([
      omitWithKey((users, date) => bookings[date]),
      mapValuesWithKey((users, date) => {
        return omitWithKey((availabilities, user) => bookings[date][user])(users)
      }),
      mapValuesWithKey((users, date) => {
        return mapValuesWithKey((availabilities, user) => {
          return bookings[date][user]
            ? difference(bookings[date][user] || [])(availabilities)
            : availabilities
        })(users)
      }),
      mapValues(omitBy(isEmpty)),
    ])(flippedAvailabilities)
  }

  function filterDatesForEnoughUsers(requiredCount, statedAvailabilities) {
    return remainingDays => { // This is the remaining availabilities
      return mapValuesWithKey((availabilities, date) => { // This is each day
        return filter(availability => { // This is filtering each individual availability
          return getAvailabilityCount(statedAvailabilities[date], availability) >= requiredCount
        })(availabilities)
      })(remainingDays)
    }
  }

  function getAvailabilityCount(userAvailabilities, availability) {
    return reduce((count, availabilities) => {
      return eq(availability)(availabilities)
        ? count
        : add(count, 1)
    })(0)(userAvailabilities)
  }

  function enoughUsers(count) {
    return availabilities => flow([
      some(availabilities => size(availabilities) >= count),
    ])(availabilities)
  }

  function flipAvailabilities(statedAvailabilities) {
    return flow([
      mapWithKey((dates, user) => mapWithKey((availabilities, date) => {
        return {
          date,
          user,
          availabilities,
        }
      })(dates)),
      flatten,
      groupBy('date'),
      mapValues(groupBy('user')),
      mapValues(mapValues(flatMap('availabilities'))),
    ])(statedAvailabilities)
  }
}

function getEnoughDuration(days, duration) {
  const durationSegmentCount = duration * 2

  return mapValues(availabilities => {
    const sortedAvailabilities = availabilities.sort()

    return flow([
      reduceWithIndex((possibleAvailabilities, availability, index) => {
        const availabilitiesToMatch = expandAvailability(availability, duration)
        for (
          let currentMatchingIndex = 0, availabilityIndex = index;
          currentMatchingIndex < availabilitiesToMatch.length;
          currentMatchingIndex++, availabilityIndex++
        ) {
          if (availabilitiesToMatch[currentMatchingIndex] === sortedAvailabilities[availabilityIndex]) {
            continue
          } else {
            return possibleAvailabilities
          }
        }
        return [...possibleAvailabilities, ...availabilitiesToMatch]
      })([]),
      uniq,
    ])(sortedAvailabilities)

  })(days)
}

function removeNotEnoughInstructors(events) {
  return days => {
    return days
  }
}

function getEquipmentAvailability(id, days, events) {
  const equipmentFilter = partial(contains)([['equipment'], id])
  const removeConflictsForThisItem = partial(removeConflicts, [id, events, equipmentFilter])

  return flow([
    initializeMonth,
    removeConflictsForThisItem,
  ])(days)
}

function getRoomAvailability(tags, days, events, rooms) {
  const matchingRooms = getMatchingRooms(tags, rooms)
  const filterAvailabilitiesByTheseRoomMatches = partial(filterAvailabilitiesByRoomMatches, [matchingRooms, events])

  return flow([
    initializeMonth,
    filterAvailabilitiesByTheseRoomMatches,
  ])(days)
}

module.exports = {
  getPersonActualAvailability,
  getEquipmentAvailability,
  getRoomAvailability,
  getEnoughUsers,
  getEnoughDuration,
}

function filterAvailabilitiesByRoomMatches(matchingRooms, events, availabilities){
  return mapValuesWithKey((availabilities, date) => {
    return reject(availability => {
      const eventsByDate = groupBy('date')(events)
      const matchingEvents = filter(({ startTime, duration }) => {
        const eventAvailabilities = expandAvailability(startTime, duration)
        return includes(availability)(eventAvailabilities)
      })(eventsByDate[date])

      return any(event => {
        const ids = flatMap(session => flatMap('id')(session.rooms))(event.sessions)
        return intersection(matchingRooms)(ids).length
      })(matchingEvents)
    })(availabilities)
  })(availabilities)
}

function getMatchingRooms(tags, rooms){
  const includesTags = intersection(tags)
  return flow([
    filter(roomHasAttributes),
    map('id'),
  ])(rooms)

  function roomHasAttributes(room){
    return flow([
      flatMap('value'),
      includesTags,
    ])(room.custom_attributes)
  }
}

function removeConflicts(id, events, conflictFilter, possibleAvailabilities){
  const matchingEvents = filter(conflictFilter)(events)
  return matchingEvents.length
    ? getAvailabilityDifference(possibleAvailabilities, getBookings(matchingEvents))
    : possibleAvailabilities
}

function removeNoAvailability(id, statedAvailabilities, possibleAvailabilities){
  return isEmpty(statedAvailabilities)
    ? possibleAvailabilities
    : getAvailabilityIntersection(possibleAvailabilities, statedAvailabilities[id])
}

function getAvailabilityIntersection(first = {}, second = {}) {
  return mapValuesWithKey((day, key) => {
    return intersection(day, second[key])
  })(first)
}

function getAvailabilityDifference(minuend, subtrahend) {
  return mapValuesWithKey((day, key) => {
    return difference(day, subtrahend[key])
  })(minuend)
}

function normalizeAvailabilities(availabilities, id){
  return flow([
    normalize,
    find({ id }),
    get('days'),
    keyBy('date'),
    mapValues('availabilities'),
    mapValues(day => {
      return uniq(flatMap(({ startTime, duration }) => {
        return expandAvailability(startTime, duration)
      })(day))
    }),
  ])(availabilities)
}

function getBookings(events) {
  const groupedEvents = groupBy('date')(events)
  return mapValues(combineAvailabilities)(groupedEvents)
}

function combineAvailabilities(dayEvents){
  return flatMap(({ startTime, duration }) => expandAvailability(startTime, duration))(dayEvents)
}

function contains(keys, id, event) {
  const items = reduce((items, key) => {
    return [...items, event[key]]
  }, [])(keys)

  return includesId(id, items)
}

function containsSession(keys, id, event) {
  const items = reduce((items, key) => {
    return [...items, flatMap(key)(event.sessions)]
  }, [])(keys)

  return includesId(id, items)
}

function includesId(id, items) {
  const ids = flow([
    flatten,
    map('id')
  ])(items)

  return includes(id, ids)
}
