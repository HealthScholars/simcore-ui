<template>
  <div class="sim-timepicker--controls">
    <div>
      <IconText
        icon="fa-arrow-circle-left fa-lg"
        class="sim-timepicker--prev-day"
        @click.native="loadPreviousDay"
      />
    </div>
    <div class="sim-timepicker--display-date">
      <span>{{ displayDate }} <br /><b>{{ displayTotalTimeBlockHours }}</b></span>
      <IconText
        v-if="countTimeBlockHours > 0"
        class="sim-timepicker--remove-blocks"
        icon="#icon--control--x"
        icon-type="svg"
        @click.native="$emit('removeAllTimeBlocks')"
      />
    </div>
    <div>
      <IconText
        icon="fa-arrow-circle-right fa-lg"
        class="sim-timepicker--next-day"
        @click.native="loadNextDay"
      />
    </div>
  </div>
</template>

<script>
  import { formatBlockHoursForDisplay } from '../utilities/date'

  import IconText from './IconText'

  export default {
    components: {
      IconText,
    },
    props: {
      availabilities: Array,
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      selectedDate() {
        return this.dateService.selectedDate
      },
      displayDate() {
        return this.selectedDate.format('dddd, MMM D')
      },
      countTimeBlockHours() {
        return this.availabilities
          .map(block => block.duration)
          .reduce((sum, value) => sum + value, 0)
      },
      displayTotalTimeBlockHours() {
        return formatBlockHoursForDisplay(this.countTimeBlockHours)
      },
    },
    methods: {
      loadNextDay() {
        const date = this.selectedDate.add(1, 'day')
        this.$store.dispatch('services/date/setDate', date)
      },
      loadPreviousDay() {
        const date = this.selectedDate.subtract(1, 'day')
        this.$store.dispatch('services/date/setDate', date)
      },
    },
  }
</script>
