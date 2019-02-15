const { map } = require('lodash/fp')
const mapWithKey = map.convert({ cap: false })

function normalize(unnormalizedUsers) {
  return mapWithKey((user, id) => {
    return {
      id,
      days: mapWithKey((availabilities, date) => ({
        date,
        availabilities,
      }))(user)
    }
  })(unnormalizedUsers)
}

module.exports = {
  normalize
}
