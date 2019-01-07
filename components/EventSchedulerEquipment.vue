<template>
  <fieldset class="event-scheduler-equipment">
    <h4>Equipment</h4>
    <AutoFinderList
      :selectedItems="adjustedScenarioEquipment"
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

import { differenceWith, isEqual } from 'lodash'
import { map, reject, includes } from 'lodash/fp'

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
    availableEquipment() {
      const selectedIds = map('id')(this.selectedEquipment)
      const matchesSelectedId = ({ id }) => includes(id)(selectedIds)

      return reject(matchesSelectedId)(this.equipmentList)
    },
    adjustedScenarioEquipment() {
      console.log('check', this.scenarioEquipment)
      const equipmentWithRemovals = this.scenarioEquipment.filter(item => {
        return !this.manuallyRemovedEquipmentIds.includes(item.id)
      })
      return [
        ...equipmentWithRemovals,
        ...this.manuallyAddedEquipment,
      ]
    },
    adjustedScenarioEquipmentIds() {
      return this.adjustedScenarioEquipment.map(item => item.id)
    },
    manuallyRemovedEquipmentIds() {
      return this.manuallyRemovedEquipment.map(item => item.id)
    },
  },
  methods: {
    update(equipment) {
      this.add(equipment)
      this.remove(equipment.filter(item => item.id > -1))

      this.$emit('update', equipment)
    },
    adjust({ itemsToAdjust, primaryManualAdjustments, secondaryManualAdjustments }) {
      return {
        primaryList: primaryManualAdjustments
          .filter(item => !itemsToAdjust.map(item => item.id).includes(item.id)),
        secondaryList: [
          ...secondaryManualAdjustments,
          ...differenceWith(itemsToAdjust, this.scenarioEquipment, isEqual),
        ],
      }
    },
    add(equipment) {
      const { primaryList, secondaryList } = this.adjust({
        itemsToAdjust: differenceWith(equipment, this.adjustedScenarioEquipment, isEqual),
        primaryManualAdjustments: this.manuallyRemovedEquipment,
        secondaryManualAdjustments: this.manuallyAddedEquipment,
      })
      this.manuallyRemovedEquipment = primaryList
      this.manuallyAddedEquipment = secondaryList
    },
    remove(equipment) {
      const { primaryList, secondaryList } = this.adjust({
        itemsToAdjust: differenceWith(this.adjustedScenarioEquipment, equipment, isEqual),
        primaryManualAdjustments: this.manuallyAddedEquipment,
        secondaryManualAdjustments: this.manuallyRemovedEquipment,
      })
      this.manuallyAddedEquipment = primaryList
      this.manuallyRemovedEquipment = secondaryList
    },
  },
}
</script>

<style lang="scss">
.event-scheduler-equipment {
}
</style>
