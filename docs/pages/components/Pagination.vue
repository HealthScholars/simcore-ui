<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">

          <!-- <Pagination
            :currentPage="this.currentPage"
            :length="this.totalPages"
          /> -->

          <v-pagination
            :length="pageItems"
            dark
          ></v-pagination>

        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html" v-pre>


</code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs>
            <code class="javascript">

            </code>
          </pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../../utility/Demobox'
import Pagination from '../../../components/Pagination'

export default {
  name: 'pagination-doc',
  components: {
    Demobox,
    Pagination,
  },
  data() {
    return {
      msg: 'Pagination',
      page: 1
    }
  },
  computed: {
    pageItems() {
      return this.length = 25
    }
  }
}
</script>
