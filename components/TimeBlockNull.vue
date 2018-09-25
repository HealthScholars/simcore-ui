<template>
  <TimeBlock theme="null" style="--start: 0; --duration: 24" />
</template>

<script>
  import TimeBlock from './TimeBlock'

  export default {
    extends: TimeBlock,
    components: {
      TimeBlock,
    },
  }
</script>

