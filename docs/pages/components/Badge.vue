<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><SimBadge :badge="badge">Some text</SimBadge> Some more text</p>
          <input type="text" v-model="example" />
        </template>
        <template slot="html">
<pre v-highlightjs><code class="html" v-pre>&lt;p>&lt;SimBadge :badge="BadgeValue">Some text&lt;/SimBadge>Some more text&lt;/p></code></pre>
        </template>
        <template slot="js">
          <div pre-label="Javascript">
            <pre v-highlightjs><code class="javascript">BadgeValue = {{ badge }}</code></pre>
          </div>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimBadge from '../../../components/Badge'

  export default {
    name: 'badge-doc',
    components: {
      Demobox,
      SimBadge,
    },
    data() {
      return {
        msg: 'Badge',
        example: 9
      }
    },
    computed: {
      badge() {
        return this.example
      },
    },
    methods: {
      randomizeBadge() {
        this.example = Math.round(Math.random() * 100)
      },
    },
  }
</script>

<style lang="scss">
  .sim-badge_content {
    background: rebeccapurple;
  }
</style>
