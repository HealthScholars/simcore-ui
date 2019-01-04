<template>
  <form class="event-scheduler" @submit.prevent="submitEvent">
    <EventSchedulerHeader
      :day="event.day"
      :startTime="event.startTime"
      :duration="event.duration"
      :isDeletable="event.id > 0"
      :headline="event.id > 0 ? 'Update Event' : 'New Event'"
      @deleteEvent="deleteEvent"
    />
    <main>
      <ol>
        <li>
          <EventSchedulerInformation
            :title="event.title"
            :description="event.description"
            :department="event.department"
            :departments="lookups.departments"
            :category="event.category"
            @updateEventProperty="updateEventProperty"
          />
        </li>
        <li>
          <EventSchedulerSessions
            :sessions="event.sessions"
            :lookups="lookups"
            :bookings="bookings"
            :event="event"
            @update="updateEventProperty('sessions', ...arguments)"
          />
        </li>
        <li>
          <EventSchedulerEquipment
            :scenarioEquipment="scenarioEquipment"
            :equipmentList="lookups.equipment"
            :selectedEquipment="event.equipment"
            :equipmentBookings="bookings.equipment"
            :event="event"
            @update="updateEventProperty('equipment', ...arguments)"
          />
        </li>
        <li>
          <EventSchedulerAttachments
            :attachments="event.attachments"
            @update="updateEventProperty('attachments', ...arguments)"
          />
        </li>
        <li>
          <fieldset>
            <h4>Note</h4>
            <textarea v-model="event.note"></textarea>
          </fieldset>
        </li>
      </ol>
    </main>
    <EventSchedulerFooter />
  </form>
</template>

<script>
import IconText from './IconText'
import AutoFinderList from './AutofinderList'

import EventSchedulerHeader from './EventSchedulerHeader'
import EventSchedulerInformation from './EventSchedulerInformation'
import EventSchedulerSessions from './EventSchedulerSessions'
import EventSchedulerAttachments from './EventSchedulerAttachments'
import EventSchedulerEquipment from './EventSchedulerEquipment'
import EventSchedulerFooter from './EventSchedulerFooter'

import { expandAvailability } from '../utilities/expand-availability'
import {
  flow, every, omit, map, partition, includes,
  filter, intersection, mapValues, assign, sortBy,
  inRange, some, cloneDeep,
} from 'lodash/fp'
import warningIconUrl from '../utilities/warning-icon'

export default {
  components: {
    IconText,
    AutoFinderList,
    EventSchedulerHeader,
    EventSchedulerInformation,
    EventSchedulerSessions,
    EventSchedulerAttachments,
    EventSchedulerEquipment,
    EventSchedulerFooter,
  },
  props: {
    properties: Object,
  },
  computed: {
    event() {
      return this.properties.event
    },
    bookings() {
      return this.properties.bookings
    },
    lookups() {
      return {
        rooms: this.roomOptions,
        equipment: this.equipmentOptions,
        instructors: this.instructorOptions,
        learners: this.learnerOptions,
        scenarios: this.properties.lookups.scenarios,
        departments: this.properties.lookups.departments,
      }
    },
    instructorOptions() {
      const instructorSets = this.getBooked(
        this.properties.lookups.instructors,
        this.properties.bookings.people,
      )

      return this.getOptions(this.getBookedCategories, instructorSets)
    },
    learnerOptions() {
      const learnerSets = this.getBooked(
        this.properties.lookups.learners,
        this.properties.bookings.people,
      )

      return this.getOptions(this.getBookedCategories, learnerSets)
    },
    roomOptions() {
      const roomSets = this.getMatchedBookedMatrix(
        this.properties.lookups.rooms,
        filter(item => item.id > 0)(this.properties.filters.roomAttributes),
        this.bookings.rooms,
        this.isTagMatch,
        'custom_attributes',
      )

      return this.getOptions(this.getStandardCategories, roomSets)
    },
    equipmentOptions() {
      const equipmentSets = this.getMatchedBookedMatrix(
        this.properties.lookups.equipment,
        filter(item => item.id > 0)(this.properties.filters.equipment),
        this.bookings.equipment,
        this.isItemMatch,
        'id',
      )

      return this.getOptions(this.getStandardCategories, equipmentSets)
    },
    scenarioRooms() {
    },
    scenarioEquipment() {
      return [
        ...this.properties.event.sessions
          .map(session => session.scenario)
          .filter(this.isNotEmpty)
          .map(scenario => scenario.equipment)
          .reduce(this.accumulateEquipment, []),
        ...this.properties.event.equipment,
      ]
    },
  },
  methods: {
    getStandardCategories({
      isNotBookedMatched,
      isNotBookedNotMatched,
      isBookedMatched,
      isBookedNotMatched,
    }){
      return [{
        category: '',
        iconUrl: '',
        data: isNotBookedMatched,
      }, {
        category: 'Not a match',
        iconUrl: warningIconUrl,
        data: isNotBookedNotMatched,
      }, {
        category: 'Booked',
        iconUrl: warningIconUrl,
        data: isBookedMatched,
      }, {
        category: 'Booked, not a match',
        iconUrl: warningIconUrl,
        data: isBookedNotMatched,
      }]
    },
    getBookedCategories({ isNotBooked, isBooked }){
      return [{
        category: '',
        iconUrl: '',
        data: isNotBooked,
      }, {
        category: 'Booked',
        iconUrl: warningIconUrl,
        data: isBooked,
      }]
    },
    getBooked(items, bookings) {
      const state = map(item => {
        return assign(item, {
          isBooked: this.isDuringEvent(bookings[item.id]),
          isBooked: bookings[item.id] ? this.isDuringEvent(bookings[item.id]) : false,
        })
      })(items)

      const [isNotBooked, isBooked] = partition(item => !item.isBooked)(state)
      return {
        isNotBooked,
        isBooked,
      }

    },
    getMatchedBookedMatrix(items, activeFilters, bookings, matchingFunction, matchingLabel) {
      const state = map(item => {
        return assign(item, {
          isMatched: activeFilters.length === 0 || matchingFunction(item[matchingLabel], activeFilters),
          isBooked: bookings[item.id] ? this.isDuringEvent(bookings[item.id]) : false,
        })
      })(items)

      const [isNotBooked, isBooked] = partition(item => !item.isBooked)(state)
      const [isMatched, isNotMatched] = partition(item => item.isMatched)(state)

      return {
        isNotBookedMatched: intersection(isNotBooked, isMatched),
        isNotBookedNotMatched: intersection(isNotBooked, isNotMatched),
        isBookedMatched: intersection(isBooked, isMatched),
        isBookedNotMatched: intersection(isBooked, isNotMatched)
      }
    },
    isItemMatch(id, equipment) {
      const ids = map('id')(equipment)
      return includes(id)(ids)
    },
    isTagMatch(rawAttributes, roomsToFilterFor) {
      const tags = map('value')(roomsToFilterFor)
      const attributes = map('value')(rawAttributes)
      const includesTag = every(tag => {
        return includes(tag)(attributes)
      })
      return includesTag(tags)
    },
    isDuringEvent(times) {
      const { startTime, duration } = this.event
      const duringEvent = inRange(startTime, startTime + duration + 0.5)

      return some(duringEvent)(times)
    },
    decorateOptions({ data, iconUrl, category }) {
      return flow([
        map(item => assign(item, { category, iconUrl })),
        sortBy('label'),
      ])(data)
    },
    getOptions(categories, sets) {
      return map(this.decorateOptions)(categories(sets))
    },
    isNotEmpty(object) {
      return !Object.keys(object).length === 0 && object.constructor === Object
    },
    saveDraft() {
      this.$emit('saveDraft', this.event)
    },
    accumulateEquipment(accumulatedEquipment, scenarioEquipment) {
      return [ ...accumulatedEquipment, ...scenarioEquipment ]
    },
    submitEvent() {
      this.$emit('submitEvent', this.properties.event)
    },
    deleteEvent() {
      this.$emit('deleteEvent', this.properties.event)
    },
    updateEventProperty(property, value) {
      this.$emit('updateEventProperty', this.properties.event, property, value)
    },
    setSessions(sessions) {
      this.$set(this.properties.event, "sessions", sessions)
    },
  },
}
</script>

<style lang="scss">
.event-scheduler {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100%;
  header, main, footer {
    padding: 0.5rem;
  }
  #category {
    background-color: var(--dark);
    color: var(--light);
  }
  header {
    background-color: #fff;
    span {
      color: orange;
      font-size: 1rem;
    }
    .schedule {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      color: black;
    }
  }
  .sim-slide--content--section--specific, .sim-slide--content--section--general {
    header {
      padding-left: 0;
      background-color: var(--dark-grey);
    }
  }
  main {
    flex: 1;
    overflow-y: auto;
    > ol {
      counter-reset: event-planning-counter;
      list-style-type: none;
      padding-left: 0;
      > li {
        display: flex;
        flex-flow: row no-wrap;
        &:not(:last-child) {
          border-bottom: 2px solid #333;
        }
        h4 {
          margin-bottom: 0;
          color: orange;
        }
        h4::before {
          content: counter(event-planning-counter);
          counter-increment: event-planning-counter;
          color: orange;
          font-size: 2rem;
          margin-right: 0.5rem;
        }
        input, textarea, select {
          background-color: #eee;
          margin-bottom: 0.5rem;
        }
      }
    }
    fieldset {
      border: none;
      width: 100%;
      padding: 0;
    }
    textarea {
      resize: none;
    }
  }
  footer {
    display: flex;
    justify-content: space-between;
    .save-draft {
      padding: 1rem;
      background-color: orange;
      color: white;
      border-radius: 4px;
    }
    [type=submit] {
      padding: 1rem;
      background-color: #ccc;
      color: #999;
      border-radius: 4px;
    }
  }
}
</style>
