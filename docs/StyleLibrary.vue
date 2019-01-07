<template lang="html">
  <main
    id="main-content"
    class="app-main library library-gui"
    role="main"
    >
    <h1 class="library--page-title">{{ msg }}</h1>
    <hr />
    <transition
      appear
      name="slide-left"
      mode="out-in"
      >
      <router-view name="details" />
    </transition>
    <div class="app-footer">
      <p>&copy; 2014-2018 Health Scholars</p>
    </div>
  </main>
</template>



<script>
  import SimIconText from '../components/IconText'

  export default {
    name: 'library-gui',
    components: {
      SimIconText,
    },
    data() {
      return {
        msg: 'Style Guide',
      }
    },
    methods: {

    },
  }
</script>
