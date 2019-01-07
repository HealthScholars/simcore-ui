// Reorganizes the API response to something workable
function normalize(unnormalizedUsers) {
  return Object.keys(unnormalizedUsers).map(id => {
    return {
      id: +id,
      days: unnormalizedUsers[id].map(dayAvailability => {
        const date = Object.keys(dayAvailability)[0]
        return {
          date: stripTime(date),
          startTime: dayAvailability[date].startTime,
          duration: dayAvailability[date].duration,
        }
      })
    }
  }).map(user => {
    user.days = stripKeys(user.days.reduce(groupUserDays, {}))
    return user
  })

  function groupUserDays(groupedAvailabilities, availability) {
    groupedAvailabilities[availability.date]
      ? groupedAvailabilities[availability.date].availabilities.push({
        startTime: availability.startTime,
        duration: availability.duration,
      })
      : groupedAvailabilities[availability.date] = initializeAvailabilityDate(availability)
    return groupedAvailabilities

    function initializeAvailabilityDate(availability) {
      return {
        date: availability.date,
        availabilities: [{
          startTime: availability.startTime,
          duration: availability.duration,
        }]
      }
    }
  }
}

module.exports = {
  normalize
}

function stripTime(datetime) {
  return datetime.split(' ')[0]
}

function stripKeys(object) {
  return Object.keys(object).reduce((array, key) => {
    array.push(object[key])
    return array
  }, [])
}
