<template>
  <aside class="sim-calendar--aside sim-calendar--aside--room-scheduling sim-calendar--day-control-panel">

    <div class="sim-calendar--aside--body">
      <div class="sim-calendar--aside--header">
      <div class="details">
        <p class="mb-0"><strong>Start:</strong> <span>Monday 11th</span>
        <br><strong>End:</strong> <span>Friday 29th</span></p>
      </div>
      <div class="actions">
          <SimSelection @toggle="repeatEvent">repeat</SimSelection>
          <div v-if="repeatSelected" class="controls">controls</div>
      </div>

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
  import SimSelection from './Selection'

  export default {
    components: {
      TimePicker,
      SimSelection,
    },
    props: {
      availabilities: Array,
      rooms: Array,
    },
    data() {
      return {
        repeatSelected: false
      }
    },
    methods: {
      updateAvailabilities(date, availabilities) {
        this.$emit('updateAvailabilities', date, availabilities)
      },
      repeatEvent() {
        this.repeatSelected = !this.repeatSelected
      }
    },
  }
</script>

<style lang="scss">

  .sim-calendar--grid--header {
    height: 40px;
  }

  .sim-calendar--aside {
    padding-top: 40px;

    &--room-scheduling {

      .sim-calendar--aside--header {
        border-bottom: 1px solid var(--fog);
        display: flex;
        justify-content: space-between;
        margin-bottom: .5rem;
        padding: .5em 0rem 1em 0;
      }

      .sim-calendar--aside--body {
        // background: var(--light);
        // color: var(--dark);
        border-radius: 0px;
        flex-direction: column;
      }

      .sim-timepicker {
        flex: 1;
      }

      .sim-selection input {
        margin: 0 .5rem 0 0;
      }
    }
  }
</style>
