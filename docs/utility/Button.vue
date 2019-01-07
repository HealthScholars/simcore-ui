<template lang="html">
  <button class="sim-button">{{ button }}</button>
</template>

<script>
  export default {
    name: 'sim-button',
    props: ['button']
}
</script>

<style lang="scss">
  @import '../../docs/assets/sass/buttons';
</style>

