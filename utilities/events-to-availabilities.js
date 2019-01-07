const { merge, flow, mapValues, groupBy, flatMap } = require('lodash/fp')
const { expandAvailability } = require('./expand-availability')

function getEquipmentBookings(events) {
  return getItemBookings(events, 'equipment')
}

function getRoomBookings(events) {
  return getItemBookings(events, 'rooms')
}

function getPersonBookings(events) {
  return merge(getItemBookings(events, 'learners'), getItemBookings(events, 'instructors'))
}

function getItemBookings(events, item) {
  return flow([
    accumulateBookings(item),
    groupBy('date'),
    mapValues(groupBy('id')),
    mapValues(mapValues(flatMap('bookings')))
  ])(events)
}

function accumulateBookings(item){
  return events => {
    return flatMap(event => flatMap(session => flatMap(item => {
      return {
        id: item.id,
        bookings: getBookings(event),
        date: event.date,
      }
    })(session[item]))(event.sessions))(events)
  }
}

function getBookings({ date, start_time, duration }){
  return expandAvailability(start_time, duration)
}

module.exports = {
  getEquipmentBookings,
  getRoomBookings,
  getPersonBookings,
}
