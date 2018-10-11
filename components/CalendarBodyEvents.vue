<template>
  <CalendarBody>
    <CalendarDayEvent slot="day" v-for="(day, index) in daysInCurrentMonth"
      :key="index"
      :day="day"
      :availabilities="getEventAvailabilitiesForDay(day)"
      :showExpandedWeek="showExpandedWeek"
      :pendingEvent="isPendingEventToday(pendingEvent, day)"
      :events="getEvents(day)"
      @click.native="setDate(day)"
      @toggleExpandedWeek="toggleExpandedWeek"
      @expandWeek="expandWeek"
      @createPendingEvent="createPendingEvent"
      @selectEvent="selectEvent"
      @selectPendingEvent="selectPendingEvent"
      @clearPendingEvent="clearPendingEvent"
      @updateBlockPosition="updateBlockPosition(...arguments, day)"
    />
    <Bubble
      v-if="bubbleContent"
      ref="bubble"
      slot="bubble"
      :style="getStyles(position)"
      :position="position"
      :content="bubbleContent"
      v-on-clickaway="resetBubbleContent"
      @keydown.esc="resetBubbleContent"
      @dismiss="resetBubbleContent"
      @updateEventProperty="updateEventProperty"
      @submitEvent="submitEvent"
    />
    <!--
      <EventScheduler
        :event="pendingEvent"
        :lookups="lookups"
        @submitEvent="submitEvent"
        @updateEventProperty="updateEventProperty"
      />
      <EventListing
        :event="selectedEvent"
      />
    -->
  </CalendarBody>
</template>

<script>
  /* eslint no-nested-ternary: 0 */
  import dayjs from 'dayjs'
  import Vue from 'vue'

  import CalendarBody from './CalendarBody'
  import CalendarDayEvent from './CalendarDayEvent'
  import EventListing from './EventListing'
  import Bubble from './Bubble'
  import EventScheduler from './EventScheduler'

  import { formatTimesForDisplay, formatBlockHoursForDisplay } from '../utilities/date'
  import { mixin as clickaway } from 'vue-clickaway'

  export default {
    components: {
      CalendarBody,
      CalendarDayEvent,
      Bubble,
      EventScheduler,
      EventListing,
    },
    extends: CalendarBody,
    mixins: [ clickaway ],
    data() {
      return {
        position: {},
        pendingEvent: null,
        bubbleContent: null,
      }
    },
    props: {
      filteredAvailabilities: Array,
      showExpandedWeek: Boolean,
      lookups: Object,
      user: Object,
      events: Array,
    },
    computed: {
      isBubbleOpen() {
        return this.$store.state.services.bubble.isOpen
      },
      getEquipmentIds(){
        return this.event.equipment
          .map(this.getIds)
          .filter(this.getNonBlanks)
      },
      getNonBlanks(item) {
        return +item >= 0
      },
      getIds(item) {
        return item.id
      },
    },
    methods: {
      getEventAvailabilitiesForDay(date) {
        const matchingDay = this.filteredAvailabilities
          .find(day => date.isSame(day.date, 'day'))
        return matchingDay
          ? matchingDay.availabilities
          : []
      },
      getEvents(day) {
        const date = day.format('YYYY-MM-DD')
        return this.events.filter(event => event.date === date)
      },
      CalendarEvent({ day, startTime, duration, user }) {
        return {
          day,
          startTime,
          duration,
          title: '',
          description: '',
          department: {},
          isApproved: false,
          institution: user.institution,
            note: '',
          equipment: [{
            id: -1
          }],
          attachments: [{
            id: -1
          }],
          sessions: [{
            scenario: {},
            rooms: [{
              id: -1,
            }],
            learners: [{
              id: -1,
            }],
            instructors: [{
              id: -1,
            }]
          }],
        }
      },
      createPendingEvent(day, startTime) {
        const duration = 1;
        this.pendingEvent = new this.CalendarEvent({ day, startTime, duration, user: this.user })
        this.selectPendingEvent(this.pendingEvent);
      },
      getInstructor(id){
        return this.lookups.instructors.find(instructor => +instructor.id === +id)
      },
      closeBubble() {
        this.resetSelectedEvent()
        this.$store.dispatch('services/bubble/setOpen', false)
      },
      clearPendingEvent() {
        this.pendingEvent = null
      },
      updateEventProperty(property, value) {
        this.$set(this.pendingEvent, property, value)
      },
      addScenario(scenario) {
        this.pendingEvent.scenarios.push(scenario)
      },
      isValidId(id) {
        return +id > 0
      },
      getId(object) {
        return object.id
      },
      prepareSession(session) {
        return {
          scenario_id: session.scenario.id || -1,
          instructors: session.instructors
            .map(this.getId)
            .filter(this.isValidId),
          learners: session.learners
            .map(this.getId)
            .filter(this.isValidId),
          rooms: session.rooms
            .map(this.getId)
            .filter(this.isValidId),
        }
      },
      prepareEvent(event) {
        return {
          title: event.title,
          description: event.description,
          date: event.day.format('YYYY-MM-DD'),
          start_time: +event.startTime,
          duration: +event.duration,
          institution_id: 1,//+event.institution.id,
          department_id: +event.department.id,
          equipment: event.equipment.map(this.getId).filter(this.isValidId),
          attachments: Object.assign([], event.attachments).filter(attachment => attachment.id > 0),
          sessions: event.sessions.map(this.prepareSession),
          note: event.note,
        }
      },
      submitEvent(event) {
        this.$emit('submitEvent', this.prepareEvent(event))
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
      selectEvent(event) {
        this.bubbleContent = {
          component: 'EventListing',
          props: {
            event,
          },
        }
      },
      selectPendingEvent(event) {
        this.bubbleContent = {
          component: 'EventScheduler',
          props: {
            event,
            lookups: this.lookups,
          },
        }
      },
      resetBubbleContent() {
        this.bubbleContent = null
      },
    },
  }
</script>

