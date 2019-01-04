<template lang="html">
  <li v-if="model.name">
    <router-link :to="{name: model.name}"><sim-icontext :icon="model.icon" :text="model.label" /></router-link>
    <ul v-if="hasChildren">
      <directory v-for="(model, index) in model.children" :key="index" :model="model" />
    </ul>
  </li>
  <section v-else-if="model.label">
    <header><sim-icontext :icon="model.icon" :text="model.label" /></header>
    <ul v-if="hasChildren">
      <directory v-for="(model, index) in model.children" :key="index" :model="model" />
    </ul>
  </section>
  <ul v-else-if="hasChildren" class="app-menu">
    <directory v-for="(model, index) in model.children" :key="index" :model="model" />
  </ul>
</template>

<script>
import SimIcontext from '../../components/IconText'

export default {
  name: 'directory',
  components: {
    SimIcontext,
  },
  props: ['model'],
  mounted() {
    // console.log(this.model.label, this.model)
  },
  computed: {
    hasChildren() {
      return (this.model.children && this.model.children.length)
    },
  },
}
</script>