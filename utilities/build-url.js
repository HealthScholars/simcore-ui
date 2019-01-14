const baseUrl = window.BASE_URL || 'https://dev.simcoretech.com/api/v1'

const methods = {
  updateAvailabilities(userId) {
    return `${baseUrl}/users/${userId}/availabilities`
  },
  addEvent(userId) {
    return `${baseUrl}/users/${userId}/events`
  },
  updateEvent(userId, eventId) {
    return `${baseUrl}/users/${userId}/events/${eventId}`
  },
  deleteEvent(userId, eventId) {
    return `${baseUrl}/users/${userId}/events/${eventId}`
  },
  equipment(userId) {
    return `${baseUrl}/users/${userId}/purview_equipment`
  },
  rooms(userId) {
    return `${baseUrl}/users/${userId}/purview_rooms`
  },
  scenarios(userId) {
    return `${baseUrl}/users/${userId}/purview_scenarios`
  },
  events(userId) {
    return `${baseUrl}/users/${userId}/clinic_events`
  },
  departments(userId) {
    return `${baseUrl}/users/${userId}/purview_departments`
  },
  users(userId) {
    return `${baseUrl}/users/${userId}/purview_users?scope=canInstruct`
  },
  availabilities(userId, { startDate, endDate }) {
    return `${baseUrl}/users/${userId}/availabilities?state_date=${startDate}&end_date=${endDate}`
  },
  userAvailabilities(userId, { startDate, endDate }) {
    return `${baseUrl}/users/${userId}/purview_availabilities?start_date=${startDate}&end_date=${endDate}&key_by=user_id`
  },
}

export default function buildUrl(name){
  return methods[name]
}
