const baseUrl = 'https://dev.simcoretech.com/api/v1'

export default function buildUrl(name){
  switch(name) {
    case 'availabilities': {
      return buildAvailabilitiesUrl
      break
    }
    case 'purviewUsers': {
      return buildPurviewUsersUrl
      break
    }
    case 'purviewEquipment': {
      return buildPurviewEquipmentUrl
      break
    }
    case 'purviewAvailabilities': {
      return buildPurviewAvailabilitiesUrl
      break
    }
    case 'updateAvailabilities': {
      return buildUpdateAvailabilitiesUrl
      break
    }
  }
}

function buildAvailabilitiesUrl(userId, { startDate, endDate }) {
  return `${baseUrl}/users/${userId}/availabilities?state_date=${startDate}&end_date=${endDate}`
}

function buildPurviewUsersUrl(userId) {
  return `${baseUrl}/users/${userId}/purview_users?scope=canInstruct`
}

function buildPurviewAvailabilitiesUrl(userId, { startDate, endDate }) {
  return `${baseUrl}/users/${userId}/purview_availabilities?start_date=${startDate}&end_date=${endDate}&key_by=user_id&mock=true`
}

function buildUpdateAvailabilitiesUrl(userId) {
  return `${baseUrl}/users/${userId}/availabilities`
}

function buildPurviewEquipmentUrl(userId) {
  return `${baseUrl}/users/${userId}/purview_equipment`
}
