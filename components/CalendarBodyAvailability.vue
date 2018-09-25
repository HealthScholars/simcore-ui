<template>
  <CalendarBody
    @toggleExpandedWeek="toggleExpandedWeek"
  >
    <CalendarDayAvailability v-for="(day, index) in daysInCurrentMonth"
      :key="index"
      slot="day"
      :day="day"
      :availabilities="getAvailabilitiesForDay(day)"
      :showExpandedWeek="showExpandedWeek"
      :expandWeek="expandWeek"
      @updateAvailabilities="updateAvailabilities"
      @click.native="setDate(day)"
      @toggleExpandedWeek="toggleExpandedWeek"
    />
  </CalendarBody>
</template>

<script>
  import dayjs from 'dayjs'

  import CalendarDayAvailability from './CalendarDayAvailability'
  import CalendarBody from './CalendarBody'

  export default {
    components: {
      CalendarDayAvailability,
      CalendarBody,
    },
    extends: CalendarBody,
    props: {
      showExpandedWeek: Boolean,
      availabilities: {
        type: Object,
        default: () => ({}),
      },
    },
    methods: {
      updateAvailabilities(date, availabilities) {
        this.$emit('updateAvailabilities', date, availabilities)
      },
      getAvailabilitiesForDay(date) {
        return this.availabilities[date.format('YYYY-MM-DD')] || []
      },
    },
  }
</script>

