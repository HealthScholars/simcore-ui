<template>
  <aside class="sim-calendar--aside sim-calendar--day-control-panel">
    <div class="sim-calendar--aside--body sim-calendar--aside--body--room-scheduling">
    <div class="sim-calendar--aside--header">
      <p class="mb-0"><strong>Start:</strong> <span>Monday 11th</span>
      <br><strong>End:</strong> <span>Friday 29th</span></p>
      <button>Repeat <IconText
        icon="fa-refresh fa-lg pl-2"
        class="sim-timepicker--next-day"
        @click.native="loadNextDay"
      /></button>
    </div>

      <TimePicker
        :availabilities="availabilities"
        @updateAvailabilities="updateAvailabilities"
      />
    </div>
  </aside>
</template>

<script>
  import TimePicker from './TimePicker'
  import IconText from './IconText'

  export default {
    components: {
      TimePicker,
      IconText,
    },
    props: {
      availabilities: Array,
      rooms: Array,
    },
    methods: {
      updateAvailabilities(date, availabilities) {
        this.$emit('updateAvailabilities', date, availabilities)
      },
    },
  }
</script>

<style lang="scss">
  .sim-calendar--aside--body {

    &--room-scheduling {
      flex-direction: column;
    }
  }
</style>
