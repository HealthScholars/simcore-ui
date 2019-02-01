<template>
  <div class="sim-calendar" :class="componentClasses">
    <IconEventDuration/>
    <IconInstructor/>
    <IconCheckbox/>
    <IconControl/>

    <CalendarHeader>
      <select
        class="rooms-list"
        :value="roomId"
        @input="selectedRoomId = $event.target.value"
      >
        <option
          v-for="(room, index) in rooms"
          :selected="room.id == roomId"
          :key="room.id"
          :value="room.id"
          >{{room.name}}</option>
      </select>
    </CalendarHeader>

    <div class="sim-calendar--body">
        <CalendarBodyRoomAvailability
          :availabilities="selectedRoomAvailabilities"
          :showExpandedWeek="showExpandedWeek"
          @updateAvailabilities="updateAvailabilities"
          @toggleExpandedWeek="toggleExpandedWeek"
          @expandWeek="expandWeek"
        />
    </div>
  </div>
</template>

<script>
import IconEventDuration from './IconEventDuration'
import IconInstructor from './IconInstructor'
import IconCheckbox from './IconCheckbox'
import IconControl from './IconControl'

import CalendarHeader from './CalendarHeader'
import CalendarBodyRoomAvailability from './CalendarBodyRoomAvailability'
import SidebarInstructor from './SidebarInstructor'

import { flow, map, get, extend, keys, values, groupBy, mapValues, flatten } from 'lodash/fp'

export default {
  components: {
    IconEventDuration,
    IconInstructor,
    IconCheckbox,
    IconControl,
    CalendarHeader,
    CalendarBodyRoomAvailability,
    SidebarInstructor,
  },
  props: {
    rooms: Array,
    roomAvailabilities: Object,
  },
  data() {
    return {
      showExpandedWeek: false,
      selectedRoomId: null,
    }
  },
  computed: {
    firstRoomId() {
      return (this.rooms[0] && this.rooms[0].id) || -1
    },
    roomId() {
      return this.selectedRoomId || this.firstRoomId
    },
    selectedRoomAvailabilities() {
      return flow([
        get(this.roomId),
        map(this.normalizeAvailability),
        groupBy('date'),
      ])(this.roomAvailabilities)
    },
    dateService() {
      return this.$store.state.services.date
    },
    today() {
      return this.dateService.today
    },
    selectedDate() {
      return this.dateService.selectedDate
    },
    isCurrentMonth() {
      return this.selectedDate.isSame(this.today, 'month')
    },
    componentClasses() {
      return {
        'is-current-month': this.isCurrentMonth,
        'is-expanded': this.showExpandedWeek,
        'is-instructor-context': true,
      }
    },
  },
  methods: {
    getFirstWord(word) {
      return word.split(' ')[0]
    },
    normalizeAvailability(availability) {
      return extend(values(availability)[0], {
        date: this.getFirstWord(keys(availability)[0])
      })
    },
    toggleExpandedWeek() {
      this.showExpandedWeek = !this.showExpandedWeek
    },
    updateAvailabilities(date, availabilities) {
      this.$emit('updateAvailabilities', date, availabilities)
    },
    expandWeek() {
      this.showExpandedWeek = true
    },
  },
}
</script>

<style lang="scss">
@import '../styles/_base';
@import '../styles/calendar';

.sim-flex--handoff {flex: 1;display: flex;}
.sim-flex--1 {flex: 1;}
.sim-flex--2 {flex: 2;}
.sim-flex--3 {flex: 3;}
.sim-flex--4 {flex: 4;}
.sim-flex--5 {flex: 5;}
.sim-flex--row {display: flex;flex-direction: row;}
.sim-flex--row--between {display: flex;flex-direction: row;justify-content: space-between;}
.sim-flex--row--between--center {display: flex;flex-direction: row;justify-content: space-between;align-items: center;}
.sim-flex--row--between--baseline {display: flex;flex-direction: row;justify-content: space-between;align-items: baseline;}
.sim-flex--column {display: flex;flex-direction: column;}

.control--add-item {
  cursor: pointer;
  transition: transform var(--ms, var(--default-ms, 350ms)) ease-out;

  &:hover {
    transform: scale(1.1);
  }
  &:active:not(:disabled) {
    transform: scale(.9);
  }
}

.sim-calendar .sim-bubble {
  top: -1em;
  // bottom: -1em;
  width: calc(var(--width-factor, 1) * 25em);
  max-width: 50%;
  &::before,
  &::after {
    top: calc(var(--dink-y) * 1px);
  }
  &--left {
    left: calc(14.285% * var(--x) - .2em);
  }
  &--right {
    left: calc(14.285% * (var(--x) - 1) + .2em);
    transform: translateX(-100%);
  }
}

.sim-calendar {
  --switch-color: var(--lighter-grey);
  --switch-color-active: var(--lighter-grey);
  --switch-handle-color: var(--action);
  --timeblock-color: var(--green);
  --bubble-fg: var(--lighter);
  --bubble-bg: var(--dark-grey); //#fcf9e9; //var(--lightest);
  --slide-fg: var(--bubble-fg);
  --slide-bg: var(--bubble-bg);

  .sim-switch input {
    box-shadow: 0 0 0 1px var(--light-grey);
    &::before {
      padding: 1ch;
      color: var(--lightest);
    }
  }

  &.is-instructor-context {
    .sim-calendar--aside {
      width: 20em;
    }

    .sim-calendar--grid--day--timelines {
      cursor: cell;
      left: 50%;
    }
  }

  &.is-coordinator-context {
    .sim-calendar--aside {
      width: 28em;
    }
    .sim-calendar--grid--day--timelines {
      left: 3em;
    }
  }

  .local--day--pending-blocks {
    position: absolute;
    top: 0;
    right: 2em;
    bottom: 0;

    .sim-timeblock {
      border: 1px solid var(--lighter);
      box-shadow: 0 .3em 1em -.4em;
      border-radius: .3em;
      --timeblock-color: var(--orange-film);

      .sim-timeblock--info {
        top: 0;
        transform: translateY(0);
        background: var(--orange);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: .2em;
        line-height: 1.1;
      }
      .sim-timeblock--remover {
        --color: var(--orange);
      }
    }
  }

  &--filters {
    --ms-lodestar: 600ms;
    --selection-color: var(--green);

    .sim-calendar--aside--body {
      flex: auto;
      height: 60em;
    }

    .filter-molecule {
      .sim-timepicker--y {
        padding: 1em .5em 1em 1em;
        .sim-timepicker--inner {
          width: auto;
        }

        .sim-timeblock .sim-timeblock--info {
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: normal;
          text-align: center;
        }
      }

      &.filter--duration {
        background: var(--shade);
        margin: -1em 1em -1em -1em;
        padding: 1em;
      }

      &.filter--instructors {
        &--seat {
          display: flex;
        }
      }
    }
  }
}

</style>
