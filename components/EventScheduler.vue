<template>
  <form class="event-scheduler" @submit.prevent="submitEvent">
    <EventSchedulerHeader
      :day="event.day"
      :startTime="event.startTime"
      :duration="event.duration"
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
            @update="updateEventProperty('sessions', ...arguments)"
          />
        </li>
        <li>
          <EventSchedulerEquipment
            :equipmentList="lookups.equipment"
            :selectedEquipment="event.equipment"
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
  },
  methods: {
    saveDraft() {
      this.$emit('saveDraft', this.properties.event)
    },
    submitEvent() {
      this.$emit('submitEvent', this.properties.event)
    },
    updateEventProperty(property, value) {
      this.$emit('updateEventProperty', property, value)
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
