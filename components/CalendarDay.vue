<template>
  <div class="sim-calendar-day sim-calendar--grid--day" :class="dayClasses">
    <div class="local--day">
      <slot name="timelines" />
      <div class="sim-calendar--grid--date">{{ dayLabel }}</div>
      <slot />
      <div class="sim-calendar--grid--tools">
      <IconText
        :icon="expandIcon"
        iconType="svg"
        @click.native="toggleExpandedWeek"
      />
      </div>
    </div>
  </div>
</template>

<script>
  import IconText from './IconText'
  import dayjs from 'dayjs'
  import weekOfYear from 'dayjs/plugin/weekOfYear'

  dayjs.extend(weekOfYear)

  export default {
    components: {
      IconText,
    },
    props: {
      day: Object,
      showExpandedWeek: Boolean,
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      today() {
        return this.dateService.today
      },
      isSelected() {
        return this.dateService.selectedDate.isSame(this.day, 'day')
      },
      isInActiveWeek() {
        // Need to offset by a day to account for Sunday-start weeks
        const currentWeek = this.dateService.selectedDate.add(1, 'day').week()
        const dayWeek = this.day.add(1, 'day').week()
        return currentWeek === dayWeek
      },
      dayLabel() {
        return this.day.format('D')
      },
      dayClasses() {
        const dayOfWeek = this.day.day()
        const classes = {
          'is-before-today': this.day.isBefore(this.today, 'day'),
          'is-today': this.day.isSame(this.today, 'day'),
          'is-after-today': this.day.isAfter(this.today, 'day'),
          'is-weekend': [0, 6].includes(dayOfWeek),
          'is-weekday': ![0, 6].includes(dayOfWeek),
          'is-in-active-week': this.isInActiveWeek,
          'is-selected': this.isSelected,
        }
        classes[`day-${dayOfWeek}`] = true
        return classes
      },
      expandIcon() {
        return this.showExpandedWeek && this.isInActiveWeek
          ? '#icon--control--contract'
          : '#icon--control--expand'
      },
    },
    methods: {
      expandWeek(){
        this.$emit('expandWeek')
      },
      toggleExpandedWeek(){
        this.$emit('toggleExpandedWeek')
      }
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar-day';
</style>
