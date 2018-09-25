<template>
  <div class="sim-calendar--header">
    <div class="sim-calendar--header--controls sim-calendar--header--controls--months">
      <IconText
        icon="fa-arrow-left fa-fw"
        class="load-previous-month"
        @click.native="loadPreviousMonth"
      />
      <span class="current-month">{{ displayDate }}</span>
      <IconText
        icon="fa-arrow-right fa-fw"
        class="load-next-month"
        @click.native="loadNextMonth"
      />
    </div>
    <div class="sim-calendar--header--mode" v-if="true">
      <ToggleSwitch
        :value="isCoordinator"
        @change="$emit('toggleContext')"
        left-label="My Availability"
        right-label="Schedule Events"
      />
    </div>
    <div class="sim-calendar--header--controls sim-calendar--header--controls--days">
      <IconText
        icon="fa-arrow-left fa-fw"
        class="load-previous-day"
        @click.native="loadPreviousDay"
      />
      <span class="load-today" @click="loadToday">today</span>
      <IconText
        icon="fa-arrow-right fa-fw"
        class="load-next-day"
        @click.native="loadNextDay"
      />
    </div>
  </div>
</template>

<script>
  import IconText from './IconText'
  import ToggleSwitch from './Switch'

  export default {
    components: {
      IconText,
      ToggleSwitch,
    },
    props: {
      isCoordinator: Boolean,
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      today() {
        return this.dateService.today
      },
      selectedDate() {
        return this.dateService.selectedDate
      },
      displayDate() {
        return this.selectedDate.format('MMMM YYYY')
      },
    },
    methods: {
      loadNextMonth() {
        const date = this.selectedDate.add(1, 'month')
        this.$store.dispatch('services/date/setDate', date)
      },
      loadPreviousMonth() {
        const date = this.selectedDate.subtract(1, 'month')
        this.$store.dispatch('services/date/setDate', date)
      },
      loadNextDay() {
        const date = this.selectedDate.add(1, 'day')
        this.$store.dispatch('services/date/setDate', date)
      },
      loadPreviousDay() {
        const date = this.selectedDate.subtract(1, 'day')
        this.$store.dispatch('services/date/setDate', date)
      },
      loadToday() {
        this.$store.dispatch('services/date/setDate', this.today)
      },
    },
  }
</script>
