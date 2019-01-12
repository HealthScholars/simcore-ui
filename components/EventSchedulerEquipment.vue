<template>
  <fieldset class="event-scheduler-equipment">
    <h4>Equipment</h4>
    <AutoFinderList
      :selectedItems="totalSelectedEquipment"
      :options="availableEquipment"
      @setSelectedList="update"
    >
      <AutoFinder
        slot-scope="slotProps"
        placeholder="Type to search"
        sortOrder="index"
        :options="slotProps.availableItems"
        :selectedItem="slotProps.item"
        :canRemove="true"
        :isFocused="slotProps.index === slotProps.selectedItems.length - 1"
        @select="slotProps.select(slotProps.index, ...arguments)"
        @clear="slotProps.clear(slotProps.index)"
        @remove="slotProps.remove(slotProps.index)"
        @next="slotProps.next(slotProps.index)"
      />
    </AutoFinderList>
  </fieldset>
</template>

<script>
import AutoFinderList from './AutofinderList'
import AutoFinder from './Autofinder'

import { flow, cloneDeep, map, reject, includes, xorBy, first, find, unionBy } from 'lodash/fp'

export default {
  components: {
    AutoFinderList,
    AutoFinder,
  },
  props: {
    scenarioEquipment: Array,
    selectedEquipment: Array,
    equipmentList: Array,
    equipmentBookings: Object,
    event: Object,
  },
  data() {
    return {
      manuallyAddedEquipment: [],
      manuallyRemovedEquipment: [],
    }
  },
  computed: {
    totalSelectedEquipment() {
      return unionBy('id')(this.adjustedScenarioEquipment, this.selectedEquipment)
    },
    availableEquipment() {
      const selectedIds = map('id')(this.selectedEquipment)
      const matchesSelectedId = ({ id }) => includes(id)(selectedIds)

      return reject(matchesSelectedId)(this.equipmentList)
    },
    adjustedScenarioEquipment() {
      return flow([
        reject(item => includes(item.id)(this.manuallyRemovedEquipmentIds)),
        reject(item => includes(item.id)(this.manuallyAddedEquipmentIds)),
      ])(this.scenarioEquipment)
    },
    manuallyRemovedEquipmentIds() {
      return map('id')(this.manuallyRemovedEquipment)
    },
    manuallyAddedEquipmentIds() {
      return map('id')(this.manuallyAddedEquipment)
    },
  },
  methods: {
    update(equipment) {
      const changedItem = flow([
        xorBy('id', this.totalSelectedEquipment),
        first,
      ])(equipment)
      equipment.length > this.totalSelectedEquipment.length
        ? this.add(changedItem)
        : this.remove(changedItem)

      this.$emit('update', equipment)
    },
    add(item) {
      find({ id: item.id })(this.manuallyRemovedEquipment)
        ? this.manuallyRemovedEquipment = reject({ id: item.id })(this.manuallyRemovedEquipment)
        : this.manuallyAddedEquipment = [...this.manuallyAddedEquipment, item]
    },
    remove(item) {
      find({ id: item.id })(this.manuallyAddedEquipment)
        ? this.manuallyAddedEquipment = reject({ id: item.id })(this.manuallyAddedEquipment)
        : this.manuallyRemovedEquipment = [...this.manuallyRemovedEquipment, item]
    },
  },
}
</script>

<style lang="scss">
.event-scheduler-equipment {
}
</style>
