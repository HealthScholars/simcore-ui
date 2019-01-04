<template>
  <TimeBlock theme="duration" :class="blockClasses" :style="blockStyles">
    <StretchHandle direction="down" @mousedown.native="startStretchDown" />
    <TimeBlockLabel :duration="duration" />
  </TimeBlock>
</template>

<script>
  /* eslint no-nested-ternary: 0 */
  import TimeBlock from './TimeBlock'
  import TimeBlockLabel from './TimeBlockLabel'
  import StretchHandle from './StretchHandle'

  import strechDownable from '../mixins/stretch-down-block'

  export default {
    extends: TimeBlock,
    mixins: [strechDownable],
    components: {
      TimeBlock,
      TimeBlockLabel,
      StretchHandle,
    },
    props: {
      duration: Number,
      maximumDuration: Number,
    },
    computed: {
      block() {
        return {
          duration: this.duration,
          startTime: 0,
        }
      },
      blockClasses() {
        return {
          'is-stretching is-stretching-down': this.stretchDirection,
        }
      },
      blockStyles() {
        const styles = [
          '--start: 0',
          `--duration: ${this.duration}`,
          `--segment-size: ${this.segmentSize}`,
        ]

        return styles.join(';')
      },
    },
  }
</script>
