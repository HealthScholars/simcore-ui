<template lang="html">
  <article>
      <h2>{{ message }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <AutofinderDetails
            :lists="lists"
            sortOrder="index"
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
  import AutofinderDetails from '../../../components/AutofinderDetails'

  export default {
    components: {
      Demobox,
      AutofinderDetails,
    },
    data() {
      return {
        message: 'AutofinderDetails',
        lists: [[{
          label: "Good Choice",
          category: "",
          iconUrl: "",
        }, {
          label: "Another Good Choice",
          category: "",
          iconUrl: "",
        }], [{
          label: "Poor Choice",
          category: "Unavailable",
          iconUrl: "https://photos.smugmug.com/Dogs/Special-Puppy-Images/i-M6Hn9Pr/0/5e35a664/O/Addi.png",
        }, {
          label: "Lame Choice",
          category: "Unavailable",
          iconUrl: "https://photos.smugmug.com/Dogs/Special-Puppy-Images/i-M6Hn9Pr/0/5e35a664/O/Addi.png",
        }, {
          label: "Egregious Choice",
          category: "Unavailable",
          iconUrl: "https://photos.smugmug.com/Dogs/Special-Puppy-Images/i-M6Hn9Pr/0/5e35a664/O/Addi.png",
        }]],
      }
    },
    methods: {
      updateTagList(tags){
        this.selectedTags = tags
      },
    },
  }
</script>
