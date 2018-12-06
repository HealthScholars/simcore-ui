<template>
  <fieldset>
    <h4>Sessions</h4>
    <ul class="session-list">
      <li v-for="(session, index) in sessions">
        <SessionListing
          :session="session"
          :lookups="lookups"
          :canRemove="true"
          :bookings="bookings"
          :event="event"
          @remove="removeSession(session)"
          @update="setSession(index, ...arguments)"
        />
      </li>
      <li key="add">
        <IconText
          class="control--add-item"
          icon="#icon--control--add"
          icon-type="svg"
          @click.native="add"
        />
      </li>
    </ul>
  </fieldset>
</template>

<script>
import SessionListing from './SessionListing'
import IconText from './IconText'

import { isEqual, reject, cloneDeep } from 'lodash'

export default {
  components: {
    SessionListing,
    IconText,
  },
  props: {
    sessions: Array,
    lookups: Object,
    bookings: Object,
    event: Object,
  },
  methods: {
    add() {
      const sessions = cloneDeep(this.sessions)
      sessions.push({
        scenario: {},
        rooms: [{ id: -1 }],
        learners: [{ id: -1 }],
        instructors: [{ id: -1 }],
      })
      this.$emit('update', sessions)
    },
    setSession(index, session) {
      const sessions = cloneDeep(this.sessions)
      sessions[index] = session
      this.$emit('update', sessions)
    },
    removeSession(sessionToRemove) {
      const sessions = reject(
        cloneDeep(this.sessions),
        session => isEqual(session, sessionToRemove),
      )
      this.$emit('update', sessions)
    },
  },
}
</script>

<style lang="scss">
.session-list {
  width: 100%;
}
</style>
