<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">

          <Pagination
            :currentPage="3"
            :totalPages="totalPages"
            :dark="true"
            :circle="true"
            :prev-icon="prevIcon"
            :next-icon="nextIcon"
            @input-emit-page="emitPage()"
          />

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
      msg: 'Pagination'
    }
  },
  computed: {
    prevIcon() {
      return 'mdi-menu-left'
    },
    nextIcon() {
      return 'mdi-menu-right'
    },
    totalPages() {
      return this.length = 15 // need to create mock data
    },
    emitPage(page) {
      this.$emit('page', page)
    }
  }
}
</script>
