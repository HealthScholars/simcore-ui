<template lang="html">
  <Datepicker class="sim-datepicker"></Datepicker>
</template>

<script>
  // https://github.com/charliekassel/vuejs-datepicker
  import Datepicker from 'vuejs-datepicker'

  export default {
    name: 'sim-datepicker',
    components: {
      Datepicker,
    },
  }
</script>

<style lang="scss">
  @import '../styles/datepicker';
</style>
