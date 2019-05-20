<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

  <demobox>
    <template slot="intro">
      Normal / Default
    </template>
    <template slot="view">
      <pagination 
        :currentPage="1"
        :totalPages="5"
        :totalItems="25"
        @page="alertPage"
      ></pagination>
    </template>
  </demobox>

  </article>
</template>

<script>
import Demobox from '../../utility/Demobox'
import Pagination from '../../../components/Pagination'

  export default {
    name: 'pagination',
      components: {
    //     Demobox,
    //     VPagination,
    // },
      data() {
        return {
         msg: 'Pagination',
        }
      },
    computed:{
        currentPage(){
            return 1
        },
        totalPages(){
            return 5
        },
        totalItems(){
            return 25
        }
    },
    methods: {
        alertPage(page){
            alert(page)
        }

    }
  }
</script>

<style lang="scss">
</style>
