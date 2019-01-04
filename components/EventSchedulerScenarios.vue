<template>
  <fieldset class="event-scenarios">
    <h4>Scenarios</h4>
    <AutoFinder
      id="scenario-finder"
      placeholder="Start typing to find scenarios"
      :options="allScenarios"
      :canRemove="false"
      :selectedItem="{}"
      @select="addScenario"
    />
    <section class="selected-scenarios">
      <h5>Selected Scenarios</h5>
      <ul>
        <li
          v-for="(scenario, index) in scenarios"
          :key="index"
        >{{scenario.label}}</li>
      </ul>
    </section>
  </fieldset>
</template>

<script>
import AutoFinder from './Autofinder'

export default {
  components: {
    AutoFinder,
  },
  props: {
    scenarios: Array,
  },
  mounted(){
    console.log('asdf', this.scenarios)
  },
  computed: {
    allScenarios(){
      return [{
        id: 1,
        label: "Scenario A",
      },{
        id: 2,
        label: "Scenario B",
      }]
    }
  },
  methods: {
    updateEventProperty(property, value) {
      this.$emit('updateEventProperty', property, title)
    },
    addScenario(scenario) {
      this.$emit('addScenario', scenario)
    }
  },
}
</script>

<style lang="scss">
.event-scenarios {
  width: 100%;
}
</style>
