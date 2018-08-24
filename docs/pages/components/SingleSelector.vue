<template lang="html">
  <article>
    <h2>{{ msg }}</h2>

    <demobox :open="true">
      <template slot="view">
        <SimSingleSelector
          :items="this.items"
        >
          <template slot="option" slot-scope="props">
            {{ props.option.name }}
          </template>
        </SimSingleSelector>
      </template>
    </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimSingleSelector from '../../../components/SingleSelector'

  export default {
    name: 'single-selector-doc',
    components: {
      Demobox,
      SimSingleSelector,
    },
    data() {
      return {
        msg: 'Single Selector',
        items: [
          {
            name: 'Abc Def',
          },
          {
            name: 'Ghi jkl',
          },
        ],
      }
    },
  }
</script>

<style lang="scss">
</style>
