<template>
  <TimeBlock theme="aggregate" :style="blockStyles" />
</template>

<script>
  import TimeBlock from './TimeBlock'

  export default {
    extends: TimeBlock,
    components: {
      TimeBlock,
    },
    props: {
      block: Object,
    },
    computed: {
      blockStyles() {
        const styles = []

        styles.push(`--start: ${this.block.startTime - this.timeShiftOffset}`)
        styles.push(`--duration: ${this.block.duration}`)
        if (this.maximumDuration < 24) {
          styles.push(`--segment-size: ${this.segmentSize}`)
        }

        return styles.join(';')
      },
    },
  }
</script>
