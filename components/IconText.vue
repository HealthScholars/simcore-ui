<template>
  <span class="sim-icontext" :class="bling">
    <span v-if="icon && iconIsFA" class="sim-icon fa" :class="icon"></span>
    <span v-if="icon && iconIsSVG" class="sim-icon svg"><svg><use :xlink:href="icon" /></svg></span>
    <span v-if="text">{{ text }}</span>
  </span>
</template>

<script>
  export default {
    props: {
      icon: String,
      iconType: {
        type: String,
        default: 'fa',
      },
      text: [Number, String],
      circle: Boolean,
      round: Boolean,
      square: Boolean,
    },
    computed: {
      iconIsFA() {
        return this.iconType === 'fa'
      },
      iconIsSVG() {
        return this.iconType === 'svg'
      },
      bling() {
        if (this.circle) {
          return 'sim-icontext__circle'
        }
        if (this.round) {
          return 'sim-icontext__round'
        }
        if (this.square) {
          return 'sim-icontext__square'
        }
        return 'sim-icontext__plain'
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/icontext';
</style>
