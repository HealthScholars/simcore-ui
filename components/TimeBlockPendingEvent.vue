<template>
  <TimeBlock theme="pending-event" class="is-moveable" :style="blockStyles">
    <IconText
      class="sim-timeblock--remover"
      icon="#icon--control--minus"
      icon-type="svg"
      @click.native.stop="$emit('clearPendingEvent')"
    />
    <StretchHandle direction="up" @mousedown.native="startStretchUp" />
    <div class="sim-timeblock--mover" @mousedown="startMove"></div>
    <StretchHandle direction="down" @mousedown.native="startStretchDown" />
    <TimeBlockLabel :startTime="block.startTime" :duration="block.duration" />
  </TimeBlock>
</template>

<script>
  import IconText from './IconText'
  import TimeBlock from './TimeBlock'
  import TimeBlockLabel from './TimeBlockLabel'
  import StretchHandle from './StretchHandle'

  import dragAndDroppable from '../mixins/drag-drop-block'
  import stretchUppable from '../mixins/stretch-up-block'
  import stretchDownable from '../mixins/stretch-down-block'

  export default {
    extends: TimeBlock,
    mixins: [dragAndDroppable, stretchUppable, stretchDownable],
    components: {
      IconText,
      TimeBlock,
      TimeBlockLabel,
      StretchHandle,
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
