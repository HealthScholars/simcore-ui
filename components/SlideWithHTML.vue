<template lang="html">
  <div class="sim-slide">

    <header v-if="data.title || data.subtitle" class="sim-slide--header">
      <h2 v-if="data.title" class="sim-slide--title">{{ data.title }}</h2>
      <div v-if="data.subtitle" class="sim-slide--subtitle">{{ data.subtitle }}</div>
    </header>

    <div v-if="data.intro">
      {{ data.intro }}
    </div>

    <div v-if="data.content" v-html="data.content"></div>
  </div>
</template>

<script>
  export default {
    name: 'sim-slide',
    props: ['data'],
  }
</script>

<style lang="scss">
  // uses: '../styles/slide-presenter';
</style>
