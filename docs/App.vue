<template lang="html">
  <v-app id="app">
    <Layout></Layout>
  </v-app>
</template>

<script>
import Layout from './Layout'

export default {
  name: 'app',
  components: {
    Layout,
  },
}
</script>

<style lang="scss" src="./assets/sass/main.scss"></style>
