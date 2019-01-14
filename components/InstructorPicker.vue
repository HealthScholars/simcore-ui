<template>
  <section class="instructor-picker">
    <Picker
      placeholder="Select an instructor"
      :selected="selected"
      :options="options"
      :allowsMultipleBlanks="allowsMultipleBlanks"
      @setSelected="setSelected"
    >
      <IconText
        slot="icon"
        slot-scope="{ selectedItemCount }"
        icon="#icon--instructors-checked"
        icon-type="svg"
        :text="`Instructors: ${selectedItemCount}`"
      />
    </Picker>
  </section>
</template>

<script>
  import IconText from './IconText'
  import Picker from './Picker'

  export default {
    components: {
      IconText,
      Picker,
    },
    extends: Picker,
  }
</script>
