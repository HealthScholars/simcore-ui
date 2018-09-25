<template>
  <CalendarBody>
    <CalendarDayEvent slot="day" v-for="(day, index) in daysInCurrentMonth"
      :key="index"
      :day="day"
      :availabilities="getEventAvailabilitiesForDay(day)"
      :showExpandedWeek="showExpandedWeek"
      :pendingEvent="isPendingEventToday(pendingEvent, day)"
      @click.native="setDate(day)"
      @toggleExpandedWeek="toggleExpandedWeek"
      @expandWeek="expandWeek"
      @createPendingEvent="createPendingEvent"
      @clearPendingEvent="clearPendingEvent"
      @updateBlockPosition="updateBlockPosition(...arguments, day)"
      @updatePendingEvent="updatePendingEvent"
    />
    <Bubble v-if="isBubbleOpen && pendingEvent"
      slot="bubble"
      ref="bubble"
      :style="getStyles(position)"
      :position="position"
      @keydown.esc="closeBubble"
      @dismiss="closeBubble"
    >
      <EventScheduler
        :event="event"
        @submitEvent="submitEvent"
        @updateEventProperty="updateEventProperty"
      />
    </Bubble>
  </CalendarBody>
</template>

<script>
  /* eslint no-nested-ternary: 0 */
  import dayjs from 'dayjs'

  import CalendarBody from './CalendarBody'
  import CalendarDayEvent from './CalendarDayEvent'
  import Bubble from './Bubble'
  import EventScheduler from './EventScheduler'

  import { formatTimesForDisplay, formatBlockHoursForDisplay } from '../utilities/date'

  export default {
    components: {
      CalendarBody,
      CalendarDayEvent,
      Bubble,
      EventScheduler,
    },
    extends: CalendarBody,
    data() {
      return {
        position: {},
        pendingEvent: null,
      }
    },
    props: {
      filteredAvailabilities: Array,
      instructors: Array,
      showExpandedWeek: Boolean,
    },
    computed: {
      event() {
        return {
          time: dayjs('2018-07-01 01:00:00'),
          duration: 1.5,
          title: 'A Title',
          description: 'A Description',
          department: {
            id: 1,
            label: 'A Department',
          },
          isApproved: false,
          scenarios: [{
            label: "Scenario 1",
            instructors: {
              minimumCount: 2,
              requiredIds: [1],
              list: [{
                id: 1,
                firstName: "Albert",
                lastName: "Bezel",
              },{
                id: 2,
                firstName: "Chris",
                lastName: "Delmer",
              }]
            },
          }],
        }
      },
      departments() {
        return [{
          id: 1,
          label: 'A',
        }, {
          id: 2,
          label: 'B',
        }, {
          id: 3,
          label: 'C',
        }]
      },
      categories() {
        return [{
          id: 1,
          label: 'X',
        }, {
          id: 2,
          label: 'Y',
        }, {
          id: 3,
          label: 'Z',
        }]
      },
      isBubbleOpen() {
        return this.$store.state.services.bubble.isOpen
      },
    },
    methods: {
      getEventAvailabilitiesForDay(date) {
        const matchingDay = this.filteredAvailabilities.find(day => date.isSame(day.date, 'day'))
        return matchingDay
          ? matchingDay.availabilities
          : []
      },
      createPendingEvent(block) {
        this.pendingEvent = {
          day: block.day,
          specificInstructors: block.specificInstructors.map(this.getInstructor),
          generalInstructors: block.generalInstructors.map(this.getInstructor),
          startTime: block.startTime,
          duration: block.duration,
          scenarios: [],
        }
        this.$store.dispatch('services/bubble/setOpen', true)
      },
      getInstructor(id){
        return this.instructors.find(instructor => +instructor.id === +id)
      },
      updatePendingEvent(block) {
        const matchingAvailability = this.filteredAvailabilities
          .find(day => day.date === block.day.format("YYYY-MM-DD"))
          .availabilities
          .find(availability => availability.startTime === block.startTime)

        const {
          specificInstructors,
          generalInstructors,
        } = matchingAvailability || {
          specificInstructors: [],
          generalInstructors: [],
        }

        Object.assign(this.pendingEvent, {
          startTime: block.startTime,
          duration: block.duration,
          specificInstructors: specificInstructors.map(this.getInstructor),
          generalInstructors: generalInstructors.map(this.getInstructor),
        })
      },
      closeBubble() {
        this.$store.dispatch('services/bubble/setOpen', false)
      },
      clearPendingEvent() {
        this.pendingEvent = null
      },
      updateEventProperty(property, value) {
        this.$set('event', property, value)
      },
      addScenario(scenario) {
        this.pendingEvent.scenarios.push(scenario)
      },
      submitEvent() {
      },
      getStyles(position) {
        const top = this.$refs.bubble
          ? this.$refs.bubble.$el.getBoundingClientRect().top
          : 0
        return {
          "--x": +position.x,
          "--y": +position.y,
          "--dink-y": +position.dinkY - top,
        }
      },
      async updateBlockPosition(position, day) {
        position.offset.x = day.day() + 1
        await this.$nextTick() // Wait for bubble to be in the DOM
        this.position = this.getBubblePosition(position)
      },
      getBubblePosition({ domPosition, offset }) {
        const position = {
          dinkY: domPosition.top + domPosition.height / 2,
          dinkX: domPosition.left + domPosition.width / 2,
          x: offset.x,
          y: offset.y,
        }

        if (position.x > this.position.x && position.x > 2) {
          position.orientation = 'right'
        } else if (this.x < this.position.x && position.x < 6) {
          position.orientation = 'left'
        } else {
          position.orientation = 'right'
        }

        return position
      },
      isPendingEventToday(pendingEvent, day) {
        return pendingEvent
          ? day.isSame(pendingEvent.day, 'day')
            ? pendingEvent
            : undefined
          : undefined
      },
    },
  }
</script>
