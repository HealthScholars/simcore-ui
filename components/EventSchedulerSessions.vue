<template>
  <fieldset>
    <h4>Sessions</h4>
    <ul class="session-list">
      <li v-for="(session, index) in sessions">
        <SessionListing
          :session="session"
          :lookups="lookups"
          :canRemove="true"
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
import { deepClone } from '../utilities/deep-clone'

export default {
  components: {
    SessionListing,
    IconText,
  },
  props: {
    sessions: Array,
    lookups: Object,
  },
  methods: {
    add() {
      const sessions = deepClone(this.sessions)
      sessions.push({
        scenario: {},
        rooms: [],
        learners: [],
        instructors: [],
      })
      this.$emit('update', sessions)
    },
    setSession(index, session) {
      const sessions = deepClone(this.sessions)
      sessions[index] = session
      this.$emit('update', sessions)
    },
    removeSession(sessionToRemove) {
      const sessions = this.sessions
        .filter(session => session === sessionToRemove)
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
