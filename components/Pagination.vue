<template>
  <v-pagination
    v-model="props.currentPage"
    :length="totalPages"
    :dark="dark"
    :circle="circle"
    :prev-icon="prevIcon"
    :next-icon="nextIcon"
  ></v-pagination>
</template>

<script>


  export default {
    name: 'Pagination',
    props: {
      currentPage: Number,
      totalPages: Number,
      theme: String,
      dark: Boolean,
      circle: Boolean,
      prevIcon: String,
      nextIcon: String
    },
    data () {
      return {
        page: 1
      }
    }
  }
</script>

<style lang="scss">
  .v-pagination__navigation .v-icon.v-icon {
    font-size: 1.5em;
    line-height: .75;
  }
</style>
