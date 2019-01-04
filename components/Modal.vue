<template lang="html">
  <div class="sim-modal" :class="{active: shouldBeOpen}">
    <div
      v-if="shouldShowMask"
      class="sim-modal__mask"
      @click="clickMask"
      ></div>
    <div class="sim-modal__wrapper">
      <slot></slot>
      <div
        v-if="shouldShowDismiss"
        class="sim-modal__dismiss"
        @click="dismiss"
        >
          &times;
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      shouldBeOpen: {
        type: Boolean,
        default: false,
      },
      dismissTo: {
        type: String,
        default: '',
      },
      shouldShowDismiss: {
        type: Boolean,
        default: true,
      },
      shouldShowMask: {
        type: Boolean,
        default: true,
      },
      canClickMask: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      dismiss() {
        if (this.$router && this.dismissTo && typeof this.dismissTo === 'string') {
          this.$router.push(this.dismissTo)
        } else {
          this.$root.closeModal()
        }
      },
      clickMask() {
        if (this.canClickMask) {
          this.dismiss()
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/modal';
</style>
