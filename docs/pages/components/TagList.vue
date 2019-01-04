<template lang="html">
  <article>
      <h2>{{ message }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <TagList
            :options="options"
            :selectedTags="selectedTags"
            @updateTagList="updateTagList"
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
  import TagList from '../../../components/TagList'

  export default {
    components: {
      Demobox,
      TagList,
    },
    data() {
      return {
        message: 'Tag List',
        options: [{
          id: 1,
          label: "Tag A",
        }, {
          id: 2,
          label: "Tag B",
        }],
        selectedTags: [{
          id: 1,
          label: "Tag A",
        }],
      }
    },
    methods: {
      updateTagList(tags){
        this.selectedTags = tags
      },
    },
  }
</script>
