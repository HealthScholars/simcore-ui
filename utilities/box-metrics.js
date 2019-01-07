export const getMetrics = (event, element, boundary) => {
  const blockMetrics = element.getBoundingClientRect()
  const pickerMetrics = element.parentElement.getBoundingClientRect()

  return {
    start: {
      x: event.clientX,
      y: event.clientY,
    },
    axis: {
      x: blockMetrics.width,
      y: blockMetrics.height,
    },
    offset: {
      x: blockMetrics.x,
      y: blockMetrics.y,
    },
    max: {
      x: pickerMetrics.width,
      y: pickerMetrics.height,
    },
    offset_parent: {
      x: pickerMetrics.x,
      y: pickerMetrics.y,
    },
    segment: {
      x: pickerMetrics.width / boundary / 2,
      y: pickerMetrics.height / boundary / 2,
    },
    durationValue: parseFloat(element.style.getPropertyValue('--duration')),
    startValue: parseFloat(element.style.getPropertyValue('--start')),
  }
}

export const boundDuration = (number, minimum, maximum) => {
  return number < minimum
    ? minimum
    : number > maximum
      ? maximum
      : number
}
