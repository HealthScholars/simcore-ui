<template>
  <fieldset class="event-scheduler-equipment">
    <h4>Equipment</h4>
    <AutoFinderList
      :selectedItems="adjustedScenarioEquipment"
      :availableItems="availableEquipment"
      @setSelectedList="update"
    >
      <AutoFinder
        slot-scope="slotProps"
        placeholder="Type to search"
        :options="slotProps.availableItems"
        :selectedItem="slotProps.item"
        :canRemove="slotProps.selectedItems.length > 1"
        :isFocused="slotProps.index === slotProps.selectedItems.length - 1"
        :errorMessage="getErrorMessage(slotProps.item)"
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

import { deepClone } from '../utilities/deep-clone'

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
      return this.equipmentList.filter(equipment => {
        return !this.selectedEquipment
          .find(selectedEquipment => +selectedEquipment.id === +equipment.id)
      })
    },
    adjustedScenarioEquipment() {
      const equipmentWithRemovals = this.scenarioEquipment.filter(item => {
        return !this.manuallyRemovedEquipment.map(item => item.id).includes(item.id)
      })
      return [...equipmentWithRemovals, ...this.manuallyAddedEquipment, {
        id: -1,
      }]
    },
    eventTimes() {
      return this.splitTimes(this.event.startTime, this.event.duration)
    },
    adjustedScenarioEquipmentIds() {
      return this.adjustedScenarioEquipment.map(item => item.id)
    },
  },
  methods: {
    update(equipment) {
      /* this works! */
      const newItems = equipment
        .filter(item => !this.adjustedScenarioEquipmentIds.includes(item.id))
      this.manuallyAddedEquipment = [...this.manuallyAddedEquipment, ...newItems]

      /* this doesn't, do this next */
      const itemsToRemove = this.adjustedScenarioEquipmentIds
        .filter(item => equipment.includes(item.id))
      console.log('r', itemsToRemove)
      this.manuallyRemovedEquipment = [...this.manuallyRemovedEquipment, ...itemsToRemove]

      this.$emit('update', equipment)
    },
    getErrorMessage(equipment) {
      const bookedTimes = this.equipmentBookings[equipment.id]

      return bookedTimes && this.eventTimes
        .filter(eventTime => bookedTimes.includes(eventTime)).length > 0
        ? 'This equipment is currently booked during this time'
        : ''
    },
    splitTimes(startTime, duration) {
      const times = []
      for (let i = 0; i <= duration; i += 0.5) {
        times.push(startTime + i)
      }
      return times
    },
  },
}
</script>

<style lang="scss">
.event-scheduler-equipment {
}
</style>
