<template>
  <TimeBlock theme="event" :style="blockStyles">
    <TimeBlockLabel :startTime="block.startTime" :duration="block.duration" />
  </TimeBlock>
</template>

<script>
  import IconText from './IconText'
  import TimeBlock from './TimeBlock'
  import TimeBlockLabel from './TimeBlockLabel'

  export default {
    extends: TimeBlock,
    components: {
      IconText,
      TimeBlock,
      TimeBlockLabel,
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
    mounted() {
      this.$emit('updatePosition')
    },
  }
</script>
