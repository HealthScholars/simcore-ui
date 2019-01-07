<template lang="html">
  <span class="sim-tag">
    <span v-if="icon" class="fa" :class="icon"></span>
    <span v-if="text">{{ text }}</span>
  </span>
</template>

<script>
  export default {
    name: 'sim-tag',
    props: {
      icon: String,
      text: [String, Number],
    },
  }
</script>

<style lang="scss">
  @import '../styles/tag';
</style>
