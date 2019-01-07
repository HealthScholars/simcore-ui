<template lang="html">
  <article>

    <h2>{{ msg }}</h2>

    <demobox :open="true">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">

        </template>

        <template slot="html">
          <pre v-highlightjs><code class="html"></code></pre>
        </template>

        <template slot="js">
          <pre v-highlightjs><code class="javascript"></code></pre>
        </template>

      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimIconText from '../../../components/IconText'
  import SimGrid from '../../utility/Grid'

export default {
  name: 'guide-grid',
  components: {
    Demobox,
    SimIconText,
    SimGrid,
  },
  data() {
    return {
      msg: 'Grid',
    }
  },
}
</script>
