<template>
  <TimeBlock theme="pending-event" class="is-moveable" :style="blockStyles">
    <IconText
      class="sim-timeblock--remover"
      icon="#icon--control--minus"
      icon-type="svg"
      @click.native.stop="$emit('clearPendingEvent')"
    />
    <div class="sim-timeblock--mover" @mousedown="startMove"></div>
    <TimeBlockLabel :startTime="block.startTime" :duration="block.duration" />
  </TimeBlock>
</template>

<script>
  import IconText from './IconText'
  import TimeBlock from './TimeBlock'
  import TimeBlockLabel from './TimeBlockLabel'

  import dragAndDroppable from '../mixins/drag-drop-block'

  export default {
    extends: TimeBlock,
    mixins: [dragAndDroppable],
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
