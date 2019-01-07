<template>
  <section class="learner-picker">
    <Picker
      placeholder="Select a learner"
      :selected="selected"
      :options="options"
      @setSelected="setSelected"
    >
      <IconText
        slot="icon"
        slot-scope="{ selectedItemCount }"
        icon="#icon--instructors-checked"
        icon-type="svg"
        :text="`Learners: ${selectedItemCount}`"
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
