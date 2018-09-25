<template>
  <header v-if="title || subtitle" class="sim-slide--header">
    <h2 v-if="title" class="sim-slide--header--title">{{ title }}</h2>
    <div v-if="subtitle" class="sim-slide--header--subtitle">{{ subtitle }}</div>
  </header>
</template>

<script>
  export default {
    props: {
      title: String,
      subtitle: String,
    },
  }
</script>
