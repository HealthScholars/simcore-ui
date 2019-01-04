<template>
  <aside class="sim-calendar--aside sim-calendar--day-control-panel">
    <div class="sim-calendar--aside--header">
      <strong>My Availability</strong>
    </div>
    <div class="sim-calendar--aside--body">
      <TimePicker
        :availabilities="availabilities"
        @updateAvailabilities="updateAvailabilities"
      />
    </div>
  </aside>
</template>

<script>
  import TimePicker from './TimePicker'

  export default {
    components: {
      TimePicker,
    },
    props: {
      availabilities: Array,
    },
    methods: {
      updateAvailabilities(date, availabilities) {
        this.$emit('updateAvailabilities', date, availabilities)
      },
    },
  }
</script>
