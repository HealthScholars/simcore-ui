<template lang="html">
  <span class="sim-selection" :class="{selected: selected}">
    <label :class="{disabled: shouldBeDisabled}">
      <input type="checkbox" :disabled="shouldBeDisabled" :checked="selected" @change="toggleSelection" />
      <span><slot></slot></span>
    </label>
  </span>
</template>

<script>
  export default {
    name: 'sim-selection',
    props: {
      itemId: [String, Number],
      shouldBeDisabled: Boolean,
      shouldBeSelected: Boolean,
      toggleable: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        selected: this.shouldBeSelected,
      }
    },
    methods: {
      toggleSelection() {
        if (this.toggleable) {
          this.selected = !this.selected
        }

        this.$emit('toggle', this.itemId, this.selected)
      },
    },
    watch: {
      shouldBeSelected(value) {
        this.selected = value
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/selection';
</style>
