<template>
  <div class="sim-overlay" :class="{active: shouldBeOpen}">
    <slot></slot>
    <div class="sim-overlay__dismiss" v-if="shouldShowDismiss" @click="dismiss">&times;</div>
  </div>
</template>

<script>
  export default {
    name: 'sim-overlay',
    props: ['should-be-open', 'should-show-dismiss', 'dismiss-to'],
    methods: {
      dismiss() {
        if (this.$router && this.dismissTo && typeof this.dismissTo === 'string') {
          this.$router.replace(this.dismissTo)
        } else {
          this.$root.closeOverlay()
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/overlay';
</style>
