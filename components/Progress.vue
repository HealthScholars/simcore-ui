<template>
  <div
    class="sim-progress"
    :style="stylePercentComplete"
    :tooltip="bubbleText"
  >
    <div class="sim-progress__completed"></div>
  </div>
</template>

<script>
  export default {
    props: {
      percent: [Number, String],
    },
    computed: {
      percentComplete() {
        return this.percent || 0
      },
      stylePercentComplete() {
        return `--percent:${this.percentComplete}%`
      },
      bubbleText() {
        return `${this.percentComplete}% Complete`
      },
    },
  }
</script>

<style lang="scss">
  @import "../styles/progress"
</style>
