<template>
  <div class="sim-timeblock--info">
    <div v-if="duration" class="sim-timeblock--info--hours">{{ displayBlockHours }}</div>
    <div v-if="startTime" class="sim-timeblock--info--time">{{ displayBlockTime }}</div>
  </div>
</template>

<script>
import { formatTimesForDisplay, formatBlockHoursForDisplay } from '../utilities/date'

export default {
  props: {
    startTime: Number,
    duration: Number,
  },
  computed: {
    displayBlockHours() {
      return formatBlockHoursForDisplay(this.duration)
    },
    displayBlockTime() {
      return formatTimesForDisplay(this.startTime, this.duration)
    },
  },
}
</script>
