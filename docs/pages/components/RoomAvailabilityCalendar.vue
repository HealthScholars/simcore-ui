<template lang="html">
  <article>
    <h2>{{ title }}</h2>

    <demobox>
      <template slot="intro">
        Normal / Default
      </template>
      <template slot="view">

        <CalendarRoomAvailability
          :rooms="rooms"
          :roomAvailabilities="roomAvailabilities"
          @updateAvailabilities="updateAvailabilities"
        />

      </template>
      <template slot="html">
        <pre v-highlightjs><code class="html"></code></pre>
      </template>
      <template slot="js">
        <pre><code class="javascript"></code></pre>
      </template>
    </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import CalendarRoomAvailability from '../../../components/CalendarRoomAvailability'
  import { flatMap, identity } from 'lodash/fp'

  export default {
    name: 'calendar-doc',
    components: {
      Demobox,
      CalendarRoomAvailability,
    },
    data() {
      return {
        title: 'Room Availability',
      }
    },
    created() {
      this.$store.dispatch('fetchList', 'rooms')
      this.$store.dispatch('fetchRoomAvailabilities', 'rooms')
    },
    computed: {
      roomAvailabilities() {
        return this.$store.state.purviewRoomAvailabilities
      },
      rooms() {
        return flatMap(identity)(this.$store.getters.list({ list: 'rooms', value: 'name' }))
      },
    },
    methods: {
      updateAvailabilities(date, availabilities) {
        this.$store.dispatch('updateRoomAvailabilities', {
          date: date.format('YYYY-MM-DD'),
          availabilities,
        })
      },
    },
  }
</script>
