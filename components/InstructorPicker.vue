<template>
  <section class="filter-molecule filter--instructors sim-filter">
    <header class="filter-molecule--heading text--green">
      <IconText
        icon="#icon--instructors-checked"
        icon-type="svg"
        :text="`Instructors: ${selectedInstructorCount}`"
      />
    </header>
    <div class="filter-molecule--options sim-datalist">
      <transition-group
        name="sim-datalist"
        tag="ul"
        mode="out-in"
      >
        <li
          v-for="(instructor, index) in selectedInstructors"
          :key="`general-${index}`"
          :class="`instructor-${instructor.id}`"
        >
          <Autofinder
            :options="availableInstructors"
            :selectedItem="instructor"
            :canRemove="selectedInstructors.length > 1"
            :isFocused="index === selectedInstructors.length - 1"
            placeholder="Any Available Instructor"
            @select="selectInstructor(index, ...arguments)"
            @clear="clearInstructor(index)"
            @remove="removeInstructor(index)"
            @next="next(index)"
          />
        </li>
        <li key="add">
          <IconText
            class="control--add-item"
            icon="#icon--control--add"
            icon-type="svg"
            @click.native="addInstructor"
          />
        </li>
      </transition-group>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  import IconText from './IconText'
  import Autofinder from './Autofinder'

  export default {
    components: {
      IconText,
      Autofinder,
    },
    props: {
      instructors: Array,
      selectedInstructors: Array,
    },
    computed: {
      selectedInstructorCount() {
        return this.selectedInstructors.length
      },
      selectedInstructorIds() {
        return this.selectedInstructors.map(instructor => instructor.id)
      },
      availableInstructors() {
        return this.instructors
          .filter(instructor => !this.selectedInstructorIds.includes(instructor.id))
      },
    },
    methods: {
      addInstructor() {
        this.selectedInstructors.push({ id: -1 })
        this.$emit('setInstructors', this.selectedInstructors)
      },
      removeInstructor(index) {
        this.selectedInstructors.splice(index, 1)
        this.$emit('setInstructors', this.selectedInstructors)
      },
      clearInstructor(index) {
        Vue.set(this.selectedInstructors, index, { id: -1 })
        this.$emit('setInstructors', this.selectedInstructors)
      },
      selectInstructor(index, instructor) {
        Vue.set(this.selectedInstructors, index, instructor)
        this.$emit('setInstructors', this.selectedInstructors)
      },
      next(index) {
        if (index + 1 >= this.selectedInstructorCount) {
          this.addInstructor()
        }
      },
    },
  }
</script>

<style lang="scss">
  @import "../styles/datalist";
</style>
