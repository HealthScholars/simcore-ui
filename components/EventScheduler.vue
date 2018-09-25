<template>
  <form class="event-scheduler" @submit.prevent="submitEvent" v-on-clickaway="closeBubble">
    <EventSchedulerHeader
      :time="event.time"
      :duration="event.duration"
    />
    <main>
      <ol>
        <li>
          <EventSchedulerInformation
            :title="event.title"
            :description="event.description"
            :department="event.department"
            :category="event.category"
            @updateEventProperty="updateEventProperty"
          />
        </li>
        <li>
          <EventSchedulerScenarios
            :scenarios="event.scenarios"
            @addScenario="addScenario"
          />
        </li>
        <li>
          <EventSchedulerPeople
            :scenarios="event.scenarios"
            @updateEventProperty="updateEventProperty"
          />
        </li>
      </ol>
    </main>
    <footer>
      <button class="save-draft" @click="saveDraft">Save Draft</button>
      <input type="submit" value="Submit For Approval" />
    </footer>
  </form>
</template>

<script>
import IconText from './IconText'
import AutoFinder from './Autofinder'
import DataList from './Datalist'
import SimSelection from './Selection'

import EventSchedulerHeader from './EventSchedulerHeader'
import EventSchedulerInformation from './EventSchedulerInformation'
import EventSchedulerScenarios from './EventSchedulerScenarios'
import EventSchedulerPeople from './EventSchedulerPeople'

import { getHour, formatTimesForDisplay } from '../utilities/date'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  components: {
    IconText,
    AutoFinder,
    DataList,
    SimSelection,
    EventSchedulerHeader,
    EventSchedulerInformation,
    EventSchedulerScenarios,
    EventSchedulerPeople,
  },
  mixins: [ clickaway ],
  props: {
    event: Object,
  },
  computed: {
    eventDate() {
      return this.event.time.format('dddd, MMMM Do, YYYY')
    },
    eventHour() {
      return getHour(this.event.time)
    },
    eventTime() {
      return formatTimesForDisplay(this.eventHour, this.event.duration)
    },
  },
  methods: {
    closeBubble() {
      this.$store.dispatch('services/bubble/setOpen', false)
    },
    saveDraft() {
      this.$emit('saveDraft', this.event)
    },
    submitEvent() {
      console.log("submitting", this.event)
      this.$emit('submitEvent', this.event)
    },
    updateEventProperty(property, value) {
      this.$emit('updateEventProperty', property, value)
    },
    addScenario(scenario) {
      this.$emit('addScenario', scenario)
    }
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
