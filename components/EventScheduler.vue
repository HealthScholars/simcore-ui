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

import { deepClone } from '../utilities/deep-clone'
import { omit } from 'lodash'

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
    lookups() {
      return this.properties.lookups
    },
    bookings() {
      return this.removeEventBookings(this.properties.bookings)
    },
    scenarioEquipment() {
      return this.properties.event.sessions
        .map(session => session.scenario)
        .filter(this.isNotEmpty)
        .map(scenario => scenario.equipment)
        .reduce(this.accumulateEquipment, [])
    },
  },
  methods: {
    isNotEmpty(object) {
      return !Object.keys(object).length === 0 && object.constructor === Object
    },
    saveDraft() {
      this.$emit('saveDraft', this.event)
    },
    accumulateEquipment(accumulatedEquipment, scenarioEquipment) {
      console.log('hey buddy', accumulatedEquipment, scenarioEquipment)
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
    removeEventBookings(bookings) {
      const currentEquipment = Object.keys(bookings.equipment).filter(item => {
        return this.event.equipment
          .map(item => item.id)
          .includes(+item)
      }).map(item => item.id)
      bookings.equipment = omit(bookings.equipment, currentEquipment)

      const currentRooms = Object.keys(bookings.rooms).filter(room => {
        return this.event.sessions
          .map(session => session.rooms)
          .map(room => room.id)
          .includes(room.id)
      })
      bookings.rooms = omit(bookings.rooms, currentRooms)

      const currentPeople = Object.keys(bookings.people).filter(person => {
        return this.event.sessions
          .map(session => {
            return [session.instructors, session.learners].flat()
          }).map(person => person.id)
          .includes(person.id)
      })
      bookings.people = omit(bookings.people, currentPeople)

      return bookings
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
