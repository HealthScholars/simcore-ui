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
    <!--
    <label for="category">Category</label>
    <select id="category">
      <option
        v-for="(category, id) in categories"
        :key="id"
        @change="updateEventProperty('category', $event.target.value)"
      >
        {{category.label}}
      </option>
    </select>
    -->
    <label>Department</label>
    <AutoFinder
      id="department"
      class="department-finder"
      placeholder="Type to search departments"
      :isRequired="true"
      :options="departments"
      :canRemove="false"
      :selectedItem="department"
      @select="updateEventProperty('department', ...arguments)"
      @clear="updateEventProperty('department', {})"
    />
  </fieldset>
</template>

<script>
import AutoFinder from './Autofinder'

export default {
  components: {
    AutoFinder,
  },
  props: {
    title: String,
    description: String,
    department: Object,
    departments: Array,
    category: Object,
  },
  computed: {
    categories() {
      return [{
        id: 1,
        label: 'X',
      }, {
        id: 2,
        label: 'Y',
      }, {
        id: 3,
        label: 'Z',
      }]
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
