<template>
  <CalendarDay
    :day="day"
    :showExpandedWeek="showExpandedWeek"
    @toggleExpandedWeek="toggleExpandedWeek"
  >
    <TimeLines v-if="showTimelines"
      slot="timelines"
      class="sim-calendar--grid--day--timelines"
      :showHalfHourTicks="false"
      @createTimeBlock="createTimeBlock"
    />
    <div class="local--day--blocks local--day--event-blocks"></div>
    <div class="local--day--blocks local--day--time-blocks">
      <template v-for="(block, index) in availabilities">
        <TimeBlockAvailability
          :key="index"
          :block="block"
          @removeTimeBlock="removeTimeBlock(index)"
          @updateTimeBlock="updateTimeBlock"
        />
      </template>
    </div>
  </CalendarDay>
</template>

<script>
  import TimeLines from './TimeLines'
  import TimeBlockAvailability from './TimeBlockAvailability'
  import CalendarDay from './CalendarDay'

  export default {
    components: {
      TimeLines,
      TimeBlockAvailability,
      CalendarDay,
    },
    extends: CalendarDay,
    props: {
      day: Object,
      availabilities: Array,
      showExpandedWeek: Boolean,
    },
    data() {
      return {
        timeBlockDefaultDuration: 1,
      }
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      isSelected() {
        return this.dateService.selectedDate.isSame(this.day, 'day')
      },
      showTimelines() {
        return this.isSelected && this.showExpandedWeek
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
        this.updateAvailabilities(this.day, availabilities)
      },
      updateAvailabilities(date, availabilities) {
        this.$emit('updateAvailabilities', date, availabilities)
      },
      removeTimeBlock(index) {
        const availabilities = [...this.availabilities]
        availabilities.splice(index, 1)
        this.updateAvailabilities(this.day, availabilities)
      },
      updateTimeBlock(index, value) {
        const availabilities = [...this.availabilities]
        availabilities[index] = value
        this.updateAvailabilities(this.day, availabilities)
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar-day';
</style>

