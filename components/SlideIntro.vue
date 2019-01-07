<template lang="html">
  <div v-if="content" class="sim-slide--intro">
    <slot>{{ content }}</slot>
  </div>
</template>

<script>
  export default {
    props: ['content'],
  }
</script>
