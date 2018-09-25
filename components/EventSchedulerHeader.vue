<template>
  <header>
    <IconText icon="#icon--event-duration" icon-type="svg" text="New Event" />
    <div class="schedule">
      <time class="event-date">{{eventDate}}</time>
      <time class="event-time">{{eventTime}}</time>
    </div>
  </header>
</template>

<script>
import IconText from './IconText'

import { getHour, formatTimesForDisplay } from '../utilities/date'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  components: {
    IconText,
  },
  props: {
    time: Object,
    duration: Number,
  },
  computed: {
    eventDate() {
      return this.time.format('dddd, MMMM Do, YYYY')
    },
    eventHour() {
      return getHour(this.time)
    },
    eventTime() {
      return formatTimesForDisplay(this.eventHour, this.duration)
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

