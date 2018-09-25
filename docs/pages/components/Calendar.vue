<template lang="html">
  <article>
    <h2>{{ title }}</h2>

    <demobox>
      <template slot="intro">
        Normal / Default
      </template>
      <template slot="view">

        <Calendar
          :user="currentUser"
          :instructors="instructors"
          :equipment="equipment"
          :totalAvailabilities="totalAvailabilities"
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
  import { normalize } from '../../../utilities/filter-availabilities'
  import Demobox from '../../utility/Demobox'
  import Calendar from '../../../components/Calendar'

  export default {
    name: 'calendar-doc',
    components: {
      Demobox,
      Calendar,
    },
    data() {
      return {
        title: 'Calendar',
      }
    },
    created() {
      this.$store.dispatch('fetchInstructorList')
      this.$store.dispatch('fetchEquipmentList')
      this.$store.dispatch('fetchCurrentUserAvailabilities')
      this.$store.dispatch('fetchInstructorAvailabilities')
    },
    computed: {
      currentUser() {
        return this.$store.state.currentUser
      },
      instructors() {
        return this.$store.getters.instructors
      },
      equipment() {
        return this.$store.getters.equipment
      },
      totalAvailabilities() {
        return normalize(this.$store.state.purviewAvailabilities)
      },
    },
    methods: {
      updateAvailabilities(date, availabilities) {
        this.$store.dispatch('updateCurrentUserAvailabilities', {
          date: date.format('YYYY-MM-DD'),
          availabilities,
        })
      },
    },
  }
</script>
