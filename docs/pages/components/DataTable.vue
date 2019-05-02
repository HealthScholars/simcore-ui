<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">

          <DataTable></DataTable>

        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html" v-pre></code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript"></code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../../utility/Demobox'
import DataTable from '../../../components/DataTable'

export default {
  name: 'datatable-doc',
  components: {
    Demobox,
    DataTable,
  },
  data() {
    return {
      msg: 'DataTable'
    }
  },
}
</script>
