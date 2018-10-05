<template>
  <fieldset class="event-scheduler-equipment">
    <h4>Equipment</h4>
    <AutoFinderList
      :selectedItems="selectedEquipment"
      :availableItems="availableEquipment"
      @setSelectedList="update"
    />
  </fieldset>
</template>

<script>
import AutoFinderList from './AutofinderList'

import { deepClone } from '../utilities/deep-clone'

export default {
  components: {
    AutoFinderList,
  },
  props: {
    selectedEquipment: Array,
    equipmentList: Array,
  },
  computed: {
    availableEquipment() {
      return this.equipmentList.filter(equipment => {
        return !this.selectedEquipment
          .find(selectedEquipment => +selectedEquipment.id === +equipment.id)
      })
    },
  },
  methods: {
    update(equipment) {
      this.$emit('update', equipment)
    },
  },
}
</script>

<style lang="scss">
.event-scheduler-equipment {
}
</style>
