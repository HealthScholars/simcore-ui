<template>
  <section class="equipment-picker">
    <header class="filter-molecule--heading text--green">
      <IconText
        icon="fa-wrench"
        icon-type="fa"
        :text="`Equipment: ${selectedItemCount}`"
      />
    </header>
    <ul>
      <li
        v-for="(selectedItem, index) in selectedItems"
        :key="index"
      >
        <AutoFinder
          :options="availableItems"
          :selectedItem="selectedItem"
          :canRemove="index !== selectedItems.length - 1"
          placeholder="Select a piece of equipment"
          @select="addEquipment"
          @remove="removeEquipment(selectedItem)"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import IconText from './IconText'
import AutoFinder from './Autofinder'

export default {
  components: {
    IconText,
    AutoFinder,
  },
  props: {
    selectedItems: {
      type: Array,
      default: () => [{}],
    },
    availableItems: Array,
  },
  computed: {
    selectedItemCount() {
      return this.selectedItems.length - 1
    },
  },
  methods: {
    addEquipment(item){
      this.$emit('addEquipment', item)
    },
    removeEquipment(item){
      this.$emit('removeEquipment', item)
    },
  },
}
</script>

<style lang="scss">
.equipment-picker {
  header {
    .fa-wrench {
      font-size: 2em;
    }
  }
}
</style>
