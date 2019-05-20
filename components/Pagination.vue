<template>
  <v-pagination
      v-model="props.currentPage"
      :length="length"
      @input="emitPage"
    ></v-pagination>
</template>

<script>
  export default {
    props: [
      'currentPage',
      'totalPages',
      'totalItems',
    ],
    computed: {
      page(){
        return 1
      },
      length(){
        return 5
      }
    },
    methods: {
      emitPage(page){
        this.$emit('page', page)
      }
    }
  }
</script>

<style>
.pagination {
 display: flex;
 justify-content: flex-end;
}