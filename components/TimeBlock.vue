<template>
  <div class="sim-timeblock" :class="blockClasses">
    <slot />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timeShiftOffset: 0,
      }
    },
    props: {
      orientation: {
        type: String,
        default: 'y',
      },
      theme: String,
      maximumDuration: {
        type: Number,
        default: 24,
      },
      minimumDuration: {
        type: Number,
        default: 0.5,
      },
    },
    computed: {
      segmentSize() {
        return (100 / this.maximumDuration)
      },
      blockClasses() {
        const classes = {}
        classes[`sim-timeblock--theme--${this.theme}`] = true
        classes[`sim-timeblock--${this.orientation}`] = true
        return classes
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/timeblock';
</style>
