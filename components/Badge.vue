<template lang="html">
  <span class="sim-badge">
    <span class="sim-badge__text"><slot></slot></span>
    <transition name="sim-badge" appear v-if="badge">
      <span class="sim-badge__content">{{ badge }}</span>
    </transition>
  </span>
</template>

<script>
export default {
  name: 'sim-badge',
  props: {
    badge: [Number, String],
  },
}
</script>

<style lang="scss">
  @import '../styles/badge';
</style>
