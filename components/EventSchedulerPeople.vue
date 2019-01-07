<template>
  <fieldset>
    <h4>People</h4>
    <section v-if="allRequiredInstructors.length" class="sim-slide--content--section sim-slide--content--section--specific">
      <header class="text--green">
        <IconText icon="#icon--instructors-checked" icon-type="svg" text="Specific Instructors" />
      </header>
      <DataList :items="allRequiredInstructors" :animate="false">
        <li
          slot="item"
          slot-scope="props"
          :key="props.item.id"
          :class="`instructor-${props.item.id}`"
        >
          <IconText
            icon="#icon--checkbox--checked"
            icon-type="svg"
            :text="`${props.item.lastName}, ${props.item.firstName}`"
          />
        </li>
      </DataList>
    </section>

    <section v-if="allGeneralInstructors.length" class="sim-slide--content--section sim-slide--content--section--general">
      <header class="text--blue--lighter">
        <IconText icon="#icon--instructors-exist" icon-type="svg" text="General Instructors" />
      </header>
      <DataList
        :items="allGeneralInstructors"
        :animate="true"
        style="--selection-color: var(--green)"
      >
        <li
          slot="static-before"
          key="static-before"
          v-if="!allGeneralInstructors.length"
        >
          <IconText
            icon="#icon--checkbox--warning"
            icon-type="svg"
            text="No results found for this time span"
          />
        </li>
        <li
          slot="item"
          slot-scope="props"
          :key="props.item.id"
          :class="`instructor-${props.item.id}`"
        >
          <SimSelection
            :item="props.item"
            :item-id="props.item.id"
            :disabled="props.item.disabled"
            @toggle="toggleItemInSelectedItems"
          >
            {{ props.item.lastName }}, {{ props.item.firstName }}
            <small class="ghost" v-if="props.item.department_id">({{ getItemName(departments, props.item.department_id) }})</small>
          </SimSelection>
        </li>
      </DataList>
    </section>
  </fieldset>
</template>

<script>
import IconText from './IconText'
import DataList from './Datalist'
import SimSelection from './Selection'

export default {
  components: {
    IconText,
    DataList,
    SimSelection,
  },
  props: {
    scenarios: Array,
  },
  computed: {
    allRequiredInstructors() {
      return this.scenarios.reduce((requiredInstructors, scenario) => {
        const instructors = scenario.instructors.requiredIds
          .map(id => scenario.instructors.list.find(instructor => +instructor.id === +id))
        requiredInstructors.push(...instructors)
        return requiredInstructors
      }, [])
    },
    allGeneralInstructors() {
      return this.scenarios.reduce((generalInstructors, scenario) => {
        const instructors = scenario.instructors.list.filter(instructor => {
          return !scenario.instructors.requiredIds.includes(instructor.id)
        })
        generalInstructors.push(...instructors)
        return generalInstructors
      }, [])
    },
  },
  methods: {
    toggleItemInSelectedItems(){
    },
  },
}
</script>

<style lang="scss">
</style>
