<template>
  <form class="event-listing" @submit.prevent="submitEvent">
    <EventSchedulerHeader
      :day="day"
      :startTime="properties.event.startTime"
      :duration="properties.event.duration"
      :headline="properties.event.title"
    />
    <main>
      <ol>
        <li>
          <fieldset class="event-information">
            <h4>Event Information</h4>
            <p>{{properties.event.description}}</p>
            <p>Department: {{properties.event.department.name}}</p>
          </fieldset>
        </li>
        <li>
          <section>
            <h4>Sessions</h4>
            <ul class="session-list">
              <li v-for="(session, index) in properties.event.sessions">
                <section class="session-listing">
                  <header v-if="session.scenario">
                    <p>Scenario: {{session.scenario.name}}</p>
                  </header>
                  <main>
                    <ul>
                      <li>
                        <fieldset>
                          <h5>Rooms</h5>
                          <ul>
                            <li v-for="room in session.rooms">{{room.name}}</li>
                          </ul>
                        </fieldset>
                      </li>
                      <li>
                        <fieldset>
                          <h5>Instructors</h5>
                          <ul>
                            <li v-for="instructor in session.instructors">{{instructor.lastname}}, {{instructor.firstname}}</li>
                          </ul>
                        </fieldset>
                      </li>
                      <li>
                        <fieldset>
                          <h5>Learners</h5>
                          <ul>
                            <li v-for="learner in session.learners">{{learner.lastname}}, {{learner.firstname}}</li>
                          </ul>
                        </fieldset>
                      </li>
                    </ul>
                  </main>
                </section>
              </li>
            </ul>
          </section>
        </li>
        <li>
          <fieldset class="event-scheduler-equipment">
            <h4>Equipment</h4>
            <ul>
              <li v-for="item in properties.event.equipment">{{item.name}}</li>
            </ul>
          </fieldset>
        <li>
          <fieldset class="event-scheduler-attachments">
            <h4>Attachments</h4>
            <ul>
              <li v-for="(attachment, index) in properties.event.attachments">
                <p><a :href="attachment.filePath" target="_BLANK">{{attachment.fileDisplayName}}</a></p>
              </li>
            </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
            <h4>Note</h4>
            <p>{{properties.event.note}}</p>
          </fieldset>
        </li>
      </ol>
    </main>
  </form>
</template>

<script>

import EventSchedulerHeader from './EventSchedulerHeader'
import dayjs from 'dayjs'

import { deepClone } from '../utilities/deep-clone'

export default {
  components: {
    EventSchedulerHeader,
  },
  props: {
    properties: Object,
  },
  computed: {
    day() {
      return new dayjs(this.properties.event.date);
    },
  },
}
</script>

<style lang="scss">
.event-listing {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100%;
  header, main {
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
        h5 {
          margin-bottom: 0;
        }
        a {
          color: #fff;
          text-decoration: underline;
        }
        .session-listing {
          background-color: #333;
          header {
            background-color: inherit;
          }
          li {
            padding: 0;
          }
        }
      }
    }
    section {
      width: 100%;
    }
    fieldset {
      border: none;
      width: 100%;
      padding: 0;
      margin-bottom: 1rem;
      h5 {
        margin-bottom: 0;
      }
      ul {
        list-style-type: disc;
        li {
          margin-left: 1em;
        }
      }
    }
  }
}
</style>
