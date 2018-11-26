<template>
  <aside class="sidebar-coordinator sim-calendar--aside sim-calendar--filters" :class="{'sim-calendar--filters--disabled': isDisabled}">
    <div class="sim-calendar--aside--header">
      <span><b>Filters</b></span>
    </div>
    <div class="sim-calendar--aside--body">
      <TimeMeter
        :duration="filters.duration"
        @setDuration="setDuration"
      />
      <div class="filters sim-flex--2">
        <InstructorPicker
          :instructors="instructors"
          :selectedInstructors="filters.instructors"
          @setInstructors="setInstructors"
        />
        <LearnerPicker
          :learners="learners"
          :selectedLearners="filters.learners"
          @setLearners="setLearners"
        />
        <EquipmentPicker
          :availableItems="filteredEquipment"
          :selectedItems="filters.equipment"
          @addEquipment="addEquipment"
          @removeEquipment="removeEquipment"
        />
        <RoomPicker
          :attributes="decoratedRoomAttributes"
          :selectedAttributes="filters.roomAttributes"
          @setRoomAttributes="setRoomAttributes"
        />
      </div>
    </div>
  </aside>
</template>

<script>
  import TimeMeter from './TimeMeter'
  import InstructorPicker from './InstructorPicker'
  import LearnerPicker from './LearnerPicker'
  import EquipmentPicker from './EquipmentPicker'
  import RoomPicker from './RoomPicker'
  import { deepClone } from '../utilities/deep-clone'

  export default {
    components: {
      TimeMeter,
      InstructorPicker,
      LearnerPicker,
      EquipmentPicker,
      RoomPicker,
    },
    props: {
      filters: Object,
      instructors: Array,
      learners: Array,
      isDisabled: Boolean,
      equipment: Array,
      roomAttributes: Array,
    },
    computed: {
      decoratedRoomAttributes() {
        return this.roomAttributes.map(attribute => Object.assign({ label: attribute.value }, attribute))
      },
      filteredEquipment() {
        const ids = this.filters.equipment.map(equipment => equipment.id)
        return this.equipment.filter(equipment => !(ids.includes(equipment.id)))
      },
    },
    methods: {
      setDuration(duration) {
        const filters = deepClone(this.filters)
        filters.duration = duration
        this.$emit('updateFilters', filters)
      },
      setInstructors(instructors) {
        const filters = deepClone(this.filters)
        filters.instructors = instructors
        this.$emit('updateFilters', filters)
      },
      setLearners(learners) {
        const filters = deepClone(this.filters)
        filters.learners = learners
        this.$emit('updateFilters', filters)
      },
      addEquipment(equipment) {
        const filters = deepClone(this.filters)
        filters.equipment = filters.equipment.reduce((list, item, index) => {
          if (+item.id === -1) {
            list[index] = equipment
          }
          return list
        }, filters.equipment)
        filters.equipment.push({ id: -1 })
        this.$emit('updateFilters', filters)
      },
      removeEquipment(newEquipment) {
        const filters = deepClone(this.filters)
        filters.equipment = this.filters.equipment
          .filter(oldEquipment => +oldEquipment.id !== +newEquipment.id)
        this.$emit('updateFilters', filters)
      },
      setRoomAttributes(newAttributes) {
        const filters = deepClone(this.filters)
        filters.roomAttributes = newAttributes
        this.$emit('updateFilters', filters)
      },
    },
  }
</script>

<style lang="scss">
.sidebar-coordinator {
  .filters {
    section {
      margin-bottom: 1rem;
    }
  }
}
</style>
