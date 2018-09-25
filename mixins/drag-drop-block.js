import { boundDuration, getMetrics } from '../utilities/box-metrics'

let metrics

export default {
  data() {
    return {
      isMoving: false,
    }
  },
  methods: {
    startMove(event) {
      if (event.which === 1) {
        event.preventDefault()
        this.isMoving = true
        metrics = getMetrics(event, this.$el, this.maximumDuration)
        this.$emit('setMoving', true)
        addEventListener('mousemove', this.move)
        addEventListener('mouseup', this.doneMoving)
      }
    },
    move(event) {
      const mouseCoordinate = this.orientation === 'x' ? event.clientX : event.clientY
      const calc = metrics.offset[this.orientation]
        + mouseCoordinate
        - metrics.start[this.orientation]
        - metrics.offset_parent[this.orientation]
      const currentStart = boundDuration(
        calc,
        0,
        metrics.max[this.orientation],
      )

      let startTime = (
        Math.round(
          currentStart
          / metrics.segment[this.orientation],
        ) / 2
      ) + this.timeShiftOffset

      this.block.startTime = boundDuration(startTime, 0, this.maximumDuration - this.block.duration)
      this.$emit('updatePosition')
    },
    doneMoving() {
      this.isMoving = false
      this.$emit('setMoving', false)
      this.$emit('updateTimeBlock', this.block)
      removeEventListener('mousemove', this.move)
      removeEventListener('mouseup', this.doneMoving)
    },
  },
}
