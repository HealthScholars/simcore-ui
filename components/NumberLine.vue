<template>
  <transition name="fade">
    <ul class="sim-timelines">
      <li
        v-for="(segment, index) in segments"
        :key="index"
        :class="getHourClasses(segment)"
        @mousedown="createTimeblock($event, segment)"
      >
        <div v-if="isWholeNumber(segment)" class="sim-timeline--time">{{ segment }}</div>
      </li>
    </ul>
  </transition>
</template>

<script>
  import { isWholeNumber, isDayTime, isMidnight, isNoon, isHour } from '../utilities/date'

  export default {
    computed: {
      segments() {
        const segments = []
        for (let index = 0; index <= 24; index += 0.5) {
          segments.push(index)
        }
        return segments
      },
    },
    methods: {
      isWholeNumber,
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
          this.$emit('createTimeblock', hour)
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

