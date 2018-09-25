<template>
  <transition name="fade">
    <ul class="sim-timelines">
      <li
        v-for="segment in segments"
        :class="getHourClasses(segment)"
        @mousedown="createTimeBlock($event, segment)"
      >
        <div
          v-if="isNoon(segment)"
          class="sim-timeline--time sim-timeline--icon sim-timeline--icon--noon"
        >
          <IconText icon="fa-sun-o" />
        </div>
        <div
          v-else-if="isMidnight(segment)"
          class="sim-timeline--time sim-timeline--icon sim-timeline--icon--midnight"
        >
          <IconText icon="fa-moon-o" />
        </div>
        <div v-else-if="isWholeNumber(segment)" class="sim-timeline--time">{{ getDisplayHour(segment) }}</div>
      </li>
    </ul>
  </transition>
</template>

<script>
  import IconText from './IconText'
  import { isWholeNumber, isDayTime, isMidnight, isNoon, isHour, formatHoursAsMeridians } from '../utilities/date'

  export default {
    components: {
      IconText,
    },
    props: {
      showHalfHourTicks: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      segments() {
        const segments = []
        for (let index = 0; index <= 24; index += this.showHalfHourTicks ? 0.5 : 1) {
          segments.push(index)
        }
        return segments
      },
    },
    methods: {
      isNoon,
      isMidnight,
      isWholeNumber,
      getDisplayHour(hour) {
        return formatHoursAsMeridians(hour)
      },
      getHourClasses(hour) {
        const classes = {
          'is-daytime': isDayTime(hour),
          'is-nighttime': !isDayTime(hour),
          'is-midnight': isMidnight(hour),
          'is-noon': isNoon(hour),
          'is-hour': isHour(hour),
          'is-half-hour': !isHour(hour),
        }
        classes[`is-hour-${hour}`] = isHour(hour)
        classes[`is-hour-${hour}-half`] = !isHour(hour)

        return classes
      },
      createTimeBlock(event, hour) {
        if (event.which === 1) {
          this.$emit('createTimeBlock', hour)
        }
      },
    },
  }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 300ms ease-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
