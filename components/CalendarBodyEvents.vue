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
      @selectEvent="selectPendingEvent"
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
      @updateEvent="updateEvent"
      @submitEvent="submitEvent"
      @deleteEvent="deleteEvent"
    />
  </CalendarBody>
</template>

<script>
  /* eslint no-nested-ternary: 0 */
  import CalendarBody from './CalendarBody'
  import CalendarDayEvent from './CalendarDayEvent'
  import Bubble from './Bubble'

  import importedEvents from '../test/e2e/fixtures/clinic_events.json'

  import dayjs from 'dayjs'
  import { mixin as clickaway } from 'vue-clickaway'
  import { expandAvailability } from '../utilities/expand-availability'
  import { filterAvailabilities } from '../utilities/filter-availabilities'
  import {
    getEquipmentAvailability,
    getRoomAvailability,
    getPersonActualAvailability,
  } from '../utilities/actual-availability'
  import { getDaysInMonth, initializeMonth } from '../utilities/date'
  import { partition } from 'lodash'
  import {
    cloneDeep, map, reduce, uniq, partial, intersection,
    mapValues, flow, filter, partialRight, includes,
    differenceWith, isEqual, flatMap, flatten, assign,
  } from 'lodash/fp'
  import warningIconUrl from '../utilities/warning-icon'
  const mapValuesWithKey = mapValues.convert({ 'cap': false });

  export default {
    components: {
      CalendarBody,
      CalendarDayEvent,
      Bubble,
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
      totalAvailabilities: Object,
      showExpandedWeek: Boolean,
      lookups: Object,
      user: Object,
      events: Array,
      filters: Object,
    },
    mounted() {
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      decoratedFilters() {
        const filters = cloneDeep(this.filters)
        filters.instructorCount = filters.instructors.length
        filters.instructors = filters.instructors
          .map(instructor => instructor.id)
          .filter(id => id > 0)
        return filters
      },
      daysInMonth() {
        return getDaysInMonth(this.dateService.selectedDate)
      },
      initialMonthAvailabilities() {
        return initializeMonth(this.daysInMonth)
      },
      equipmentIds() {
        return flow([
          map('id'),
          filter(id => id > 0)
        ])(this.filters.equipment)
      },
      roomTags() {
        return map('value')(this.filters.roomAttributes)
      },
      peopleIds() {
        return flow([
          map('id'),
          uniq,
          filter(id => id > 0)
        ])([...this.filters.learners, ...this.filters.instructors])
      },
      roomAvailability() {
        return partialRight(
          getRoomAvailability,
          [this.daysInMonth, this.events, this.lookups.rooms],
        )
      },
      equipmentAvailability() {
        return partialRight(
          getEquipmentAvailability,
          [this.daysInMonth, this.events],
        )
      },
      peopleAvailability() {
        return partialRight(
          getPersonActualAvailability,
          [this.daysInMonth, this.events, this.totalAvailabilities],
        )
      },
      filteredAvailabilities() {
        return flow([
          partial(this.getAvailabilities, [this.roomAvailability, this.roomTags]),
          partial(this.getAvailabilities, [this.equipmentAvailability, this.equipmentIds]),
          partial(this.getAvailabilities, [this.peopleAvailability, this.peopleIds]),
        ])(this.initialMonthAvailabilities)
      },
    },
    methods: {
      getAvailabilities(filteringFunction, ids, initialState) {
        return reduce(
          this.accumulateAvailabilities(filteringFunction),
          initialState,
        )(ids)
      },
      accumulateAvailabilities(itemAvailabilityForDate) {
        return (cumulativeAvailabiltities, id) => {
          return flow([
            this.getDayMatches,
            mapValuesWithKey,
          ])(itemAvailabilityForDate(id))(cumulativeAvailabiltities)
        }
      },
      getDayMatches(itemAvailabilties) {
        return (dayAvailabilities, date) => {
          return intersection(dayAvailabilities, itemAvailabilties[date])
        }
      },
      getEventAvailabilitiesForDay(day) {
        return this.filteredAvailabilities[day.format('YYYY-MM-DD')] || []
      },
      addTimes(totalList, initialList, times) {
        return totalList.reduce((list, item) => {
          list[item]
            ? list[item].push(...times)
            : list[item] = [ ...times ]
          return list
        }, cloneDeep(initialList))
      },
      getBookings(day) {
        const date = day.format('YYYY-MM-DD')
        const bookings = flow([
          filter(event => event.date === date),
          reduce((bookings, event) => {
            const times = expandAvailability(event.startTime, event.duration)
            const getIds = flatMap('id')

            const equipment = getIds(event.equipment)
            const rooms = flow([
              flatMap('rooms'),
              getIds,
            ])(event.sessions)
            const people = flatten(flatMap(session => [
              getIds(session.instructors),
              getIds(session.learners),
            ])(event.sessions))

            return assign(cloneDeep(bookings), {
              equipment: this.addTimes(equipment, bookings.equipment, times),
              rooms: this.addTimes(rooms, bookings.rooms, times),
              people: this.addTimes(people, bookings.people, times),
            })
          })({
            rooms: {},
            people: {},
            equipment: {},
          })
        ])(this.events)

        return bookings
      },
      getEvents(day) {
        const date = day.format('YYYY-MM-DD')
        return this.events.filter(event => event.date === date)
      },
      CalendarEvent({ day, startTime, duration, user, instructors, equipment, learners }) {
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
          equipment,
          attachments: [{
            id: -1
          }],
          sessions: [{
            scenario: {},
            rooms: [{
              id: -1,
            }],
            learners,
            instructors,
          }],
        }
      },
      createPendingEvent(day, startTime) {
        this.pendingEvent = new this.CalendarEvent({
          day,
          startTime,
          duration: this.filters.duration,
          instructors: this.filters.instructors,
          learners: this.filters.learners,
          equipment: this.filters.equipment,
          user: this.user,
        })
        this.selectPendingEvent(this.pendingEvent);
      },
      closeBubble() {
        this.resetBubbleContent()
        this.$store.dispatch('services/bubble/setOpen', false)
      },
      clearPendingEvent() {
        this.pendingEvent = null
      },
      updateEvent(updatedEvent) {
        const matchingEvent = this.events.find((event, index) => {
          if (+event.id === +updatedEvent.id) {
            this.$set(this.events, index, updatedEvent)
            return updatedEvent
          }

          return event
        })

        if (matchingEvent.id < 0) {
          this.$set(this.pendingEvent, property, value)
        }
      },
      updateEventProperty(updatedEvent, property, value) {
        if (!updatedEvent.id) {
          this.$set(this.pendingEvent, property, value)
        } else {
          const index = this.events.findIndex(event => +event.id === +updatedEvent.id)
          updatedEvent[property] = value
          this.$set(this.events, index, updatedEvent)
        }
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
        this.clearPendingEvent()
        this.closeBubble()
      },
      deleteEvent(event) {
        this.$emit('deleteEvent', event)
        this.closeBubble()
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
      /*
      selectEvent(event) {
        this.bubbleContent = {
          component: 'EventListing',
          props: {
            event,
          },
        }
      },
      */
      decorateEvent(event) {
        event.day = event.day || dayjs(event.date)
        event.attachments = event.attachments.map(attachment => {
          attachment.location = attachment.filePath
          return attachment
        })
        event.department.label = event.department.name
        event.equipment = event.equipment.map(item => {
          item.label = item.name
          return item
        })
        event.sessions = event.sessions.map(session => {
          session.rooms = (session.rooms && session.rooms.map(room => {
            room.label = room.name
            return room
          }) || [])
          session.instructors = (session.instructors && session.instructors.map(instructor => {
            instructor.label = `${instructor.firstname} ${instructor.lastname}`
            return instructor
          }) || [])
          session.learners = (session.learners && session.learners.map(learner => {
            learner.label = `${learner.firstname} ${learner.lastname}`
            return learner
          }) || [])
          session.scenario = session.scenario || {}
          return session
        })
        return event
      },
      selectPendingEvent(event) {
        this.bubbleContent = {
          component: 'EventScheduler',
          props: {
            event: this.decorateEvent(event),
            lookups: {
              rooms: this.lookups['rooms'],
              equipment: this.lookups['equipment'],
              instructors: this.lookups['instructors'],
              learners: this.lookups['learners'],
              departments: this.lookups['departments'],
              scenarios: this.lookups['scenarios'],
            },
            bookings: this.getBookings(event.day),
            filters: this.filters,
          },
        }
      },
      resetBubbleContent() {
        this.bubbleContent = null
      },
    },
  }
</script>
