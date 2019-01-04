<template>
  <fieldset>
    <h4>Sessions</h4>
    <ul class="session-list">
      <li v-for="(session, index) in sessions">
        <SessionListing
          :session="session"
          :lookups="nonSelfLookups"
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

import {
  isEqual, reject, cloneDeep, omit, assign, flatten,
  flatMap, flow, difference, includes, isArray, map, filter,
  some, partial,
} from 'lodash/fp'

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
        session => isEqual(session, sessionToRemove),
      )(cloneDeep(this.sessions))
      this.$emit('update', sessions)
    },
    getUnusedItems(label) {
      const items = this.lookups[label]
      const allIds = flatMap('id')(items)
      const eventIds = flow([
        flatMap(label),
        map('id'),
      ])(this.event.sessions)
      const availableIds = difference(allIds, eventIds)

      // Pack if not a nested collection
      return some(isArray)(items)
        ? this.getMultipleItems(availableIds, items)
        : this.getSingleItem(availableIds, [items])
    },
    getMultipleItems(availableIds, collections) {
      return map(partial(this.getSingleItem, [availableIds]))(collections)
    },
    getSingleItem(availableIds, collection) {
      return reject(item => includes(availableIds)(item.id))(collection)
    },
  },
  computed: {
    nonSelfLookups() {
      const lookups = cloneDeep(this.lookups)

      return assign(lookups, {
        rooms: this.getUnusedItems('rooms'),
        learners: this.getUnusedItems('learners'),
        instructors: this.getUnusedItems('instructors'),
      })
    },
  },
}
</script>

<style lang="scss">
.session-list {
  width: 100%;
}
</style>
