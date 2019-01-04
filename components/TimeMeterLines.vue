<template>
  <transition name="fade">
    <ul class="sim-timelines">
      <li
        v-for="(segment, index) in segments"
        :key="index"
        :class="getHourClasses(segment)"
      >
        <div v-if="isWholeNumber(segment)" class="sim-timeline--time">
          {{ segment }}
        </div>
      </li>
    </ul>
  </transition>
</template>

<script>
  import { isWholeNumber } from '../utilities/date'

  export default {
    props: {
      maximumDuration: Number,
    },
    computed: {
      segments() {
        const segments = []
        for (let index = 0; index <= 6; index += 0.5) {
          segments.push(index)
        }
        return segments
      },
    },
    methods: {
      isWholeNumber,
      getHourClasses(hour) {
        return hour % 1 === 0
          ? `is-hour is-hour-${hour}`
          : `is-half-hour is-hour-${Math.floor(hour)}-half`
      },
    },
  }
</script>
