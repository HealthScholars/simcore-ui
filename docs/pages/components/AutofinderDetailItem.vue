<template lang="html">
  <article>
      <h2>{{ message }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <AutofinderDetailItem
            :label="itemLabel"
            :category="typeLabel"
            :iconUrl="iconUrl"
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
  import AutofinderDetailItem from '../../../components/AutofinderDetailItem'

  export default {
    components: {
      Demobox,
      AutofinderDetailItem,
    },
    data() {
      return {
        message: "AutofinderDetailItem",
        label: "List item",
        category: "Unavailable",
        iconUrl: "https://photos.smugmug.com/Dogs/Special-Puppy-Images/i-M6Hn9Pr/0/5e35a664/O/Addi.png",
      }
    },
    methods: {
      updateTagList(tags){
        this.selectedTags = tags
      },
    },
  }
</script>
