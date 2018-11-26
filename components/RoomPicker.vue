<template>
  <section class="room-picker filter-molecule filter--instructors sim-filter">
    <header class="filter-molecule--heading text--green">
      <IconText
        icon="fa-square"
        icon-type="fa"
        :text="`Room Attributes: ${selectedAttributeCount}`"
      />
    </header>
    <TagList
      :options="attributes"
      :selectedTags="selectedAttributes"
      @updateTagList="updateRoomAttributes"
    />
  </section>
</template>

<script>
  import Vue from 'vue'
  import IconText from './IconText'
  import Autofinder from './Autofinder'
  import TagList from './TagList'

  export default {
    components: {
      IconText,
      Autofinder,
      TagList,
    },
    props: {
      attributes: Array,
      selectedAttributes: Array,
    },
    computed: {
      selectedAttributeCount() {
        return this.selectedAttributes.length;
      },
    },
    methods: {
      updateRoomAttributes(attributes) {
        this.$emit('setRoomAttributes', attributes)
      },
    },
  }
</script>

<style lang="scss">
.room-picker {
  header {
    .fa-square {
      font-size: 2em;
    }
  }
}
</style>
