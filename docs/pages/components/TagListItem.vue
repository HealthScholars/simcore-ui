<template lang="html">
  <article>
      <h2>{{ message }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <TagListItem
            :label="message"
            @remove="remove"
          />
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
  import TagListItem from '../../../components/TagListItem'

  export default {
    components: {
      Demobox,
      TagListItem,
    },
    data() {
      return {
        message: 'Tag List Item',
      }
    },
    methods: {
      remove(){
        console.log("I got clicked!")
      }
    },
  }
</script>
