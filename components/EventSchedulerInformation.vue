<template>
  <fieldset class="event-information">
    <h4>Event Information</h4>
    <label for="title">Title</label>
    <input
      required
      autofocus
      type="text"
      id="title"
      :value="title"
      @input="updateEventProperty('title', $event.target.value)"
    />
    <label for="description">Description</label>
    <textarea
      required
      id="description"
      :value="description"
      @input="updateEventProperty('description', $event.target.value)"
    ></textarea>
    <label>Department</label>
    <AutoFinder
      id="department"
      class="department-finder"
      placeholder="Type to search departments"
      sortOrder="alpha"
      :isRequired="true"
      :options="departmentsWithFacility"
      :canRemove="false"
      :selectedItem="department"
      groupBy="facility"
      @select="updateEventProperty('department', ...arguments)"
      @clear="updateEventProperty('department', {})"
    />
  </fieldset>
</template>

<script>
import AutoFinder from './Autofinder'

import { map, assign } from 'lodash/fp'

export default {
  components: {
    AutoFinder,
  },
  props: {
    title: String,
    description: String,
    department: Object,
    departments: Array,
  },
  computed: {
    departmentsWithFacility() {
      return map(department => {
        return assign(department)({
          facility: department.institution.name,
        })
      })(this.departments)
    },
  },
  methods: {
    updateEventProperty(property, value){
      this.$emit('updateEventProperty', property, value)
    },
  },
}
</script>

<style lang="scss">
.event-information {
  .department-finder {
    padding-bottom: 1em;
  }
}
</style>
