<template>
  <main class="sim-calendar--main">
    <div class="sim-calendar--grid">
      <div class="sim-calendar--grid--header">
        <div v-for="dayName in dayNames" class="sim-calendar--grid--header--day">
          <span class="sim-calendar--grid--header--dayname">{{ dayName }}</span>
        </div>
      </div>
      <div class="sim-calendar--grid--body">
        <div class="sim-calendar--grid--days" @click.meta="toggleExpandedWeek">
          <div v-if="startOffset > 0" class="sim-calendar--grid--before" :style="{'--offset': startOffset}"></div>
          <slot name="day" />
          <div v-if="endOffset > 0" class="sim-calendar--grid--after"></div>
        </div>
        <slot name="bubble" />
        <div class="sim-loader--shield" v-if="isLoading"><Loader /></div>
      </div>
    </div>
  </main>
</template>

<script>
  import dayjs from 'dayjs'
  import Loader from './Loader'

  export default {
    components: {
      Loader,
    },
    data() {
      return {
        dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      }
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      selectedDate() {
        return this.dateService.selectedDate
      },
      isLoading() {
        return this.$store.getters['services/loading/isLoading']
      },
      startOffset() {
        return dayjs(this.selectedDate).startOf('month').day()
      },
      endOffset() {
        return 6 - dayjs(this.selectedDate).endOf('month').day()
      },
      daysInCurrentMonth() {
        const daysInMonth = []
        for (let day = 1, count = this.selectedDate.daysInMonth(); day <= count; day += 1) {
          let dayString = day.toString()
          if (day < 10) {
            dayString = `0${dayString}`
          }
          daysInMonth.push(dayString)
        }
        const currentMonthString = this.selectedDate.format('YYYY-MM-')
        return daysInMonth.map(day => dayjs(`${currentMonthString}${day}`))
      },
    },
    methods: {
      toggleExpandedWeek() {
        this.$emit('toggleExpandedWeek')
      },
      expandWeek() {
        this.$emit('expandWeek')
      },
      setDate(date) {
        this.$store.dispatch('services/date/setDate', date)
      },
    },
  }
</script>
