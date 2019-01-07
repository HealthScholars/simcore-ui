<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <SimTag
            :icon="tag"
            :text="vuejs"
            ></SimTag>
            <SimTag
            :icon="tag"
            :text="sass"
            ></SimTag>
            <SimTag
            :icon="tag"
            :text="flexbox"
            ></SimTag>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;SimTag :icon="iconName" :text="tagName">&lt;/SimTag></code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">icon: 'iconName'

text: 'tagName'
            </code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimTag from '../../../components/Tag'

  export default {
    name: 'tag-doc',
    components: {
      Demobox,
      SimTag,
    },
    data() {
      return {
        msg: 'Tag',

        // icon
        tag: 'fa-tag',

        // text
        vuejs: 'Vuejs',
        sass: 'Sass',
        flexbox: 'Flexbox',
      }
    },
  }
</script>
