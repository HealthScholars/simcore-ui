<template>
  <div class="sim-calendar" :class="componentClasses">
    <IconEventDuration/>
    <IconInstructor/>
    <IconCheckbox/>
    <IconControl/>

    <CalendarHeader />
    <div class="sim-calendar--body">
        <CalendarBodyEvents
          :filteredAvailabilities="filteredAvailabilities"
          :lookups="lookups"
          :bubbleIsOpen="bubbleIsOpen"
          :showExpandedWeek="showExpandedWeek"
          :user="user"
          :events="events"
          @toggleExpandedWeek="toggleExpandedWeek"
          @expandWeek="expandWeek"
          @submitEvent="submitEvent"
        />
        <!--
        <SidebarCoordinator
          :instructors="instructors"
          :equipment="equipment"
          :filters="filters"
          :isDisabled="isBubbleOpen"
          @updateFilters="updateFilters"
        />
        -->
    </div>
  </div>
</template>

<script>
import { filterAvailabilities } from '../utilities/filter-availabilities'
import { deepClone } from '../utilities/deep-clone'

import IconEventDuration from './IconEventDuration'
import IconInstructor from './IconInstructor'
import IconCheckbox from './IconCheckbox'
import IconControl from './IconControl'

import CalendarHeader from './CalendarHeader'
import CalendarBodyEvents from './CalendarBodyEvents'
import SidebarCoordinator from './SidebarCoordinator'

export default {
  components: {
    IconEventDuration,
    IconInstructor,
    IconCheckbox,
    IconControl,
    CalendarHeader,
    CalendarBodyEvents,
    SidebarCoordinator,
  },
  props: {
    user: Object,
    lookups: Object,
    totalAvailabilities: Array,
    events: Array,
  },
  data() {
    return {
      isCoordinator: false,
      showExpandedWeek: false,
      duration: 1,
      pendingEvent: null,
      bubbleIsOpen: false,
      filters: {
        duration: 1,
        instructors: [{
          id: -1,
        }],
        equipment: [{
          id: -1,
        }],
      },
    }
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
    bubbleService() {
      return this.$store.state.services.bubble
    },
    isCurrentMonth() {
      return this.selectedDate.isSame(this.today, 'month')
    },
    componentClasses() {
      const classes = {
        'is-current-month': this.isCurrentMonth,
        'is-expanded': this.showExpandedWeek,
      }
      classes[`is-${this.contextLabel}-context`] = true
      return classes
    },
    decoratedFilters() {
      const filters = deepClone(this.filters)
      filters.instructorCount = filters.instructors.length
      filters.instructors = filters.instructors
        .map(instructor => instructor.id)
        .filter(id => id > 0)
      return filters
    },
    filteredAvailabilities() {
      return filterAvailabilities([...this.totalAvailabilities], this.decoratedFilters)
    },
    selectedDateAvailabilities() {
      const selectedDate = this.selectedDate.format('YYYY-MM-DD')
      return this.user.availabilities[selectedDate] || []
    },
    contextLabel() {
      return this.isCoordinator ? 'coordinator' : 'instructor'
    },
    isBubbleOpen() {
      return this.bubbleService.isOpen
    },
  },
  methods: {
    toggleExpandedWeek() {
      this.showExpandedWeek = !this.showExpandedWeek
    },
    updateFilters(filters) {
      this.filters = filters
    },
    updateAvailabilities(date, availabilities) {
      this.$emit('updateAvailabilities', date, availabilities)
    },
    toggleContext() {
      this.isCoordinator = !this.isCoordinator
    },
    expandWeek() {
      this.showExpandedWeek = true
    },
    submitEvent(event) {
      this.$emit('submitEvent', event)
    },
  },
}
</script>

<style lang="scss">
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
  bottom: -1em;
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
    left: 3em;
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
</style>
