<template>
  <div class="sim-timepicker sim-timepicker--y">
    <TimePickerControls
       :availabilities="availabilities"
       @removeAllTimeBlocks="removeAllTimeBlocks"
    />
    <div class="sim-timepicker--inner" :class="timelineClasses">
      <TimeLines @createTimeBlock="createTimeBlock" />
      <TimeBlockAvailability v-for="(block, index) in availabilities"
        theme="available"
        :key="index"
        :block="block"
        @removeTimeBlock="removeTimeBlock(index)"
        @updateTimeBlock="updateTimeBlock"
      />
    </div>
  </div>
</template>

<script>
  import TimeBlockAvailability from './TimeBlockAvailability'
  import TimeLines from './TimeLines'
  import TimePickerControls from './TimePickerControls'

  export default {
    components: {
      TimeBlockAvailability,
      TimeLines,
      TimePickerControls,
    },
    props: {
      availabilities: Array,
    },
    data() {
      return {
        isMoving: false,
        isStretching: false,
        timeBlockDefaultDuration: 1,
      }
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      selectedDate() {
        return this.dateService.selectedDate
      },
      timelineClasses() {
        return {
          'is-moveable': true,
          'is-moving': this.isMoving,
          'is-stretching': this.isStretching,
        }
      },
    },
    methods: {
      createTimeBlock(hour) {
        const newBlock = {
          startTime: hour,
          duration: this.timeBlockDefaultDuration,
        }
        const availabilities = [...this.availabilities]
        availabilities.push(newBlock)
        this.$emit('updateAvailabilities', this.selectedDate, availabilities)
      },
      removeTimeBlock(index) {
        const availabilities = [...this.availabilities]
        availabilities.splice(index, 1)
        this.$emit('updateAvailabilities', this.selectedDate, availabilities)
      },
      removeAllTimeBlocks() {
        this.$emit('updateAvailabilities', this.selectedDate, [])
      },
      updateTimeBlock(index, value) {
        const availabilities = [...this.availabilities]
        availabilities[index] = value
        this.$emit('updateAvailabilities', this.selectedDate, availabilities)
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/timepicker';
</style>
