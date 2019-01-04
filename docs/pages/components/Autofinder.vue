<template lang="html">
  <article>
      <h2>{{ message }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <Autofinder
            sortOrder="index"
            :rawOptions="lists"
            :selectedItem="selectedItem"
            @select="selectItem"
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
  import Autofinder from '../../../components/Autofinder'

  export default {
    components: {
      Demobox,
      Autofinder,
    },
    data() {
      return {
        message: 'AutofinderDetails',
        selectedItem: {
          id: -1,
        },
        lists: [[{
          id: 1,
          label: "Good Choice",
          typeLabel: "",
          iconUrl: "",
        }, {
          id: 2,
          label: "Another Good Choice",
          typeLabel: "",
          iconUrl: "",
        }], [{
          id: 3,
          label: "Poor Choice",
          typeLabel: "Unavailable",
          iconUrl: "https://photos.smugmug.com/Dogs/Special-Puppy-Images/i-M6Hn9Pr/0/5e35a664/O/Addi.png",
        }, {
          id: 4,
          label: "Lame Choice",
          typeLabel: "Unavailable",
          iconUrl: "https://photos.smugmug.com/Dogs/Special-Puppy-Images/i-M6Hn9Pr/0/5e35a664/O/Addi.png",
        }, {
          id: 5,
          label: "Egregious Choice",
          typeLabel: "Unavailable",
          iconUrl: "https://photos.smugmug.com/Dogs/Special-Puppy-Images/i-M6Hn9Pr/0/5e35a664/O/Addi.png",
        }]],
      }
    },
    methods: {
      selectItem(item) {
        this.selectedItem = item
      },
    },
  }
</script>
