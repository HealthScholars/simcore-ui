<template lang="html">
  <article>
      <h2>{{ msg }}</h2>
      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <SimProgress :percent="percent"></SimProgress>
        </template>
        <template slot="html">
        <pre v-highlightjs><code class="html">&lt;SimProgress :percent="myPercentValue">&lt;/SimProgress></code></pre>
        </template>
        <template slot="js">
          <div class="flex-center-between">
            <pre>
              <code class="javascript">let myPercentValue = {{ percent }}</code>
            </pre>
            <button @click="randomizePercent">randomize</button>
          </div>

        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimProgress from '../../../components/Progress'

  export default {
    name: 'progress-doc',
    components: {
      Demobox,
      SimProgress,
    },
    data() {
      return {
        msg: 'Progress',
        percent: 29,
      }
    },
    methods: {
      randomizePercent() {
        this.percent = Math.round(Math.random() * 100)
      },
    },
  }
</script>
