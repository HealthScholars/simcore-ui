<template lang="html">
  <div class="sim-panel" :class="{active: shouldBeOpen}">
    <slot></slot>
    <div class="sim-panel__dismiss" v-if="shouldShowDismiss" @click="dismiss">&times;</div>
  </div>
</template>

<script>
  export default {
    name: 'sim-panel',
    props: ['should-be-open', 'should-show-dismiss', 'dismiss-to'],
    methods: {
      dismiss() {
        if (this.$router && this.dismissTo && typeof this.dismissTo === 'string') {
          this.$router.replace(this.dismissTo)
        } else {
          this.$root.closePanel()
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/panel';
</style>
