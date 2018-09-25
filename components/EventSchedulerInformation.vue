<template>
  <fieldset class="event-information">
    <h4>Event Information</h4>
    <label for="title">Title</label>
    <input
      required
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
    <label>Department</label>
    <AutoFinder
      id="department"
      placeholder="Start typing to find a Department"
      :options="departments"
      :canRemove="false"
      :selectedItem="department"
      @select="updateEventProperty('department', $event.target.value)"
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
    category: Object,
  },
  computed: {
    departments() {
      return [{
        id: 1,
        label: 'A',
      }, {
        id: 2,
        label: 'B',
      }, {
        id: 3,
        label: 'C',
      }]
    },
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
      this.$emit('updateEventProperty', property, title)
    },
  },
}
</script>

<style lang="scss">
</style>
