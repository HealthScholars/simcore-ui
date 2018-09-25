<template>
  <div :class="`sim-timeblock--handle sim-timeblock--handle--${orientation} sim-timeblock--handle--${direction}`"></div>
</template>

<script>
  export default {
    props: {
      orientation: {
        type: String,
        default: 'y',
      },
      direction: String,
    },
  }
</script>
