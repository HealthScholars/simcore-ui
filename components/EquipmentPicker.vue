<template>
  <section class="equipment-picker">
    <Picker
      placeholder="Select an item"
      :selected="selected"
      :options="options"
      @setSelected="setSelected"
    >
      <IconText
        slot="icon"
        slot-scope="{ selectedItemCount }"
        icon="fa-wrench"
        icon-type="fa"
        :text="`Equipment: ${selectedItemCount}`"
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

<style lang="scss">
.equipment-picker {
  header {
    .fa-wrench {
      font-size: 2em;
    }
  }
  .equipment-list {
    max-width: 100%;
    li {
      max-width: 100%;
    }
  }
}
</style>
