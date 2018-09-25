import { boundDuration, getMetrics } from '../utilities/box-metrics'

let metrics

export default {
  data(){
    return {
      stretchDirection: null,
    }
  },
  methods: {
    startStretchDown(event) {
      if (event.which === 1) {
        event.preventDefault()
        this.stretchDirection = 'down'
        metrics = getMetrics(event, this.$el, this.maximumDuration)
        addEventListener('mousemove', this.stretchDown)
        addEventListener('mouseup', this.doneStretchingDown)
      }
    },
    stretchDown(event) {
      const mouseCoordinate = event.clientY
      const newDuration = this.getNewDuration(mouseCoordinate)
      this.$emit('setDuration', newDuration)

      this.block.duration = boundDuration(
        newDuration,
        this.minimumDuration,
        this.maximumDuration - this.block.startTime + this.timeShiftOffset,
      )
    },
    getNewDuration(mouseCoordinate) {
      const position = Math.round(
        (metrics.axis[this.orientation]
          + mouseCoordinate
          - metrics.start[this.orientation])
        / metrics.segment[this.orientation],
      ) / 2
      return position >= this.minimumDuration
        ? position <= this.maximumDuration
          ? position
          : this.maximumDuration
        : this.minimumDuration
    },
    doneStretchingDown() {
      this.stretchDirection = null
      this.$emit('updateTimeblock', this.block)
      removeEventListener('mousemove', this.stretchDown)
      removeEventListener('mouseup', this.doneStretchingDown)
    },
  }
}
