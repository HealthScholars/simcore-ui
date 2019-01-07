function expandAvailability(startTime, duration) {
  const endTime = startTime + duration
  const availabilities = []
  for (let value = startTime; value < endTime; value += 0.5){
    availabilities.push(value)
  }
  return availabilities
}

module.exports = {
  expandAvailability,
}
