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
  </main>
</template>

<script>
export default {
  name: 'extras',
  data() {
    return {
      msg: 'Other Things',
    }
  },
}
</script>
