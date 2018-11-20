<template>
  <section class="filter-molecule filter--instructors sim-filter">
    <header class="filter-molecule--heading text--green">
      <IconText
        icon="#icon--instructors-checked"
        icon-type="svg"
        :text="`Learners: ${selectedLearnerCount}`"
      />
    </header>
    <div class="filter-molecule--options sim-datalist">
      <transition-group
        name="sim-datalist"
        tag="ul"
        mode="out-in"
      >
        <li
          v-for="(learner, index) in selectedLearners"
          :key="`general-${index}`"
          :class="`learner-${learner.id}`"
        >
          <Autofinder
            :options="availableLearners"
            :selectedItem="learner"
            :canRemove="selectedLearners.length > 1"
            :isFocused="index === selectedLearners.length - 1"
            placeholder="Select a learner"
            @select="selectLearner(index, ...arguments)"
            @clear="clearLearner(index)"
            @remove="removeLearner(index)"
            @next="next(index)"
          />
        </li>
        <li key="add">
          <IconText
            class="control--add-item"
            icon="#icon--control--add"
            icon-type="svg"
            @click.native="addLearner"
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
      learners: Array,
      selectedLearners: Array,
    },
    computed: {
      selectedLearnerCount() {
        return this.selectedLearners.length
      },
      selectedLearnerIds() {
        return this.selectedLearners.map(learner => learner.id)
      },
      availableLearners() {
        return this.learners
          .filter(learner => !this.selectedLearnerIds.includes(learner.id))
      },
    },
    methods: {
      addLearner() {
        this.selectedLearners.push({ id: -1 })
        this.$emit('setLearners', this.selectedLearners)
      },
      removeLearner(index) {
        this.selectedLearners.splice(index, 1)
        this.$emit('setLearners', this.selectedLearners)
      },
      clearLearner(index) {
        Vue.set(this.selectedLearners, index, { id: -1 })
        this.$emit('setLearners', this.selectedLearners)
      },
      selectLearner(index, learner) {
        Vue.set(this.selectedLearners, index, learner)
        this.$emit('setLearners', this.selectedLearners)
      },
      next(index) {
        if (index + 1 >= this.selectedLearnerCount) {
          this.addLearner()
        }
      },
    },
  }
</script>

<style lang="scss">
  @import "../styles/datalist";
</style>
