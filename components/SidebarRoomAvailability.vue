<template>
  <aside class="sim-calendar--aside sim-calendar--aside--room-scheduling sim-calendar--day-control-panel">

    <div class="sim-calendar--aside--body">
      <div class="sim-calendar--aside--header">
      <div class="details">
        <p class="mb-0"><strong>Start:</strong> <span>Monday 11th</span>
        <br><strong>End:</strong> <span>Friday 29th</span></p>
      </div>
      <div class="controls">
          <span v-for="item in items">
            <SimSelection
              :item="item"
              :selected-items="selectedItems"
              >{{ item.name }}
              </SimSelection>
          </span>
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
      repeatSchedule: false,
    },
    data() {
      return {
        items: [
          {
            id: 1,
            name: 'repeat',
            disabled: false,
          }
        ],
        selectedItems: [],
      }
    },
    methods: {
      updateAvailabilities(date, availabilities) {
        this.$emit('updateAvailabilities', date, availabilities)
      },
    },
  }
</script>

<style lang="scss">
  .sim-calendar--aside {

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
