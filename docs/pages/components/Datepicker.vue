<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <SimDatepicker required></SimDatepicker>
        </template>
        <template slot="html"><pre v-highlightjs><code class="html">&lt;SimDatepicker required>&lt;/SimDatepicker></code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">
// https://github.com/charliekassel/vuejs-datepicker

import Datepicker from 'vuejs-datepicker'
  </code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimDatepicker from '../../../components/Datepicker'

  export default {
    name: 'datepicker-doc',
    components: {
      Demobox,
      SimDatepicker,
    },
    data() {
      return {
        msg: 'Datepicker',
      }
    },
    computed: {
    },
  }
</script>

<style lang="scss">
  .vdp-datepicker input[readonly] {
    border: 1px solid var(--light-grey);
  }
</style>