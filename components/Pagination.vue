<template>
  <v-pagination
    v-model="page"
  ></v-pagination>
</template>

<script>

  export default {
    name: 'Pagination',
    // props: {
    //   currentPage: Number,
    //   totalPages: Number
    // },
    data () {
      return {
        page: 1
      }
    }
  }
</script>

<style lang="scss">

</style>
