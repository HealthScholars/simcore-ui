<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><SimBulkCheck :items="items" @toggle="setSelectedItems"></SimBulkCheck> {{ selectedItems}} selected items</p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html" v-pre>&lt;p>
  &lt;SimBulkCheck
    :items="items"
    @toggle="setSelectedItems"
    >&lt;/SimBulkCheck>
  {{ selectedItems}} selected items
&lt;/p></code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">data() {
  return {
    msg: 'Bulk Check',
    items: [{id:1},{id:2},{id:3},{id:4},{id:5}],
    selectedItems: [],
  }
},
computed: {
  badge() {
    return this.example
  },
},
methods: {
  setSelectedItems (items) {
    this.selectedItems = items
  }
},</code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimBulkCheck from '../../../components/BulkCheck'

  export default {
    name: 'bulkcheck-doc',
    components: {
      Demobox,
      SimBulkCheck,
    },
    data() {
      return {
        msg: 'Bulk Check',
        items: [{id:1},{id:2},{id:3},{id:4},{id:5}],
        selectedItems: [],
      }
    },
    computed: {
      badge() {
        return this.example // common.getRandomInt(0, 100)
      },
    },
    methods: {
      setSelectedItems (items) {
        this.selectedItems = items
      }
    },
  }
</script>

<style lang="scss">
  .sim-badge_content {
    background: rebeccapurple;
  }
</style>
