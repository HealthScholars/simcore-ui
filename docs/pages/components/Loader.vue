<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <div v-if="isLoading" class="sim-loader--shield">
            <SimLoader :is-loading="true"></SimLoader>
          </div>
        </template>
        <template slot="html"><pre v-highlightjs><code class="html" v-pre>&lt;div v-if="isLoading" class="sim-loader--shield">
  &lt;SimLoader :is-loading="true">&lt;/SimLoader>
&lt;/div></code></pre>
        </template>
        <template slot="js"><pre v-highlightjs><code class="javascript">data() {
  return {
    isLoading: true,
  }
},</code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimLoader from '../../../components/Loader'

  export default {
    name: 'loader-doc',
    components: {
      Demobox,
      SimLoader,
    },
    data() {
      return {
        msg: 'Loader',
        isLoading: true,
      }
    },
    computed: {
    },
  }
</script>

<style lang="scss" scoped>
  
</style>
