<template>
  <section class="room-picker filter-molecule filter--instructors sim-filter">
    <header class="filter-molecule--heading text--green">
      <IconText
        icon="fa-square"
        icon-type="fa"
        :text="`Room Attributes: ${selectedItemCount}`"
      />
    </header>
    <TagList
      :options="options"
      :selectedTags="selected"
      @updateTagList="setSelected"
    />
  </section>
</template>

<script>
  import IconText from './IconText'
  import TagList from './TagList'
  import Picker from './Picker'

  export default {
    components: {
      IconText,
      TagList,
    },
    extends: Picker,
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
