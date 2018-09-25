<template>
  <div class="sim-switch">
    <label>
      <span v-if="leftLabel">{{ leftLabel }}</span>
      <input
        type="checkbox"
        :checked="value"
        @change="$emit('change', !value)"
      />
      <span v-if="rightLabel">{{ rightLabel }}</span>
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      value: Boolean,
      leftLabel: String,
      rightLabel: String,
    },
  }
</script>

<style lang="scss">
  @import '../styles/switch';
</style>
