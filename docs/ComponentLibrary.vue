<template lang="html">
  <main
    id="main-content"
    class="app-main library library-gui"
    role="main"
    >
    <h1 class="library--page-title">{{ msg }}</h1>
    <hr />
    <transition appear name="slide-left" mode="out-in">
      <router-view name="details" />
    </transition>
    <div class="app-footer">
      <p>&copy; 2018 Health Scholars</p>
    </div>
  </main>
</template>

<script>
export default {
  name: 'library-ui',
  computed: {
    routes() {
      return this.$router.options.routes
    },
  },
  data() {
    return {
      msg: 'Components',
      menu: [],
    }
  },
  mounted() {
    this.menu = {
      label: 'Home',
      children: this.routes.map((route) => route),
    }
  },
}
</script>
