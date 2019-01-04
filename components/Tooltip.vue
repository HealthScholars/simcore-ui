<template lang="html">
  <span class="sim-tooltip">
    <span class="sim-tooltip__cue"><slot name="cue"><i class="fa fa-question-circle"></i></slot></span>
    <span class="sim-tooltip__bubble" :class="popTo"><slot name="text"></slot></span>
  </span>
</template>

<script>
  export default {
    name: 'sim-tooltip',
    props: {
      pop: {
        type: String,
        default: 'up',
      },
      shift: {
        type: String,
        default: 'none',
      },
    },
    computed: {
      popTo() {
        return `sim-tooltip__bubble--${this.pop}`
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/tooltip';
</style>
