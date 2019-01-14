<template>
  <aside class="sidebar-coordinator sim-calendar--aside sim-calendar--filters" :class="{'sim-calendar--filters--disabled': isDisabled}">
    <div class="sim-calendar--aside--header">
      <span><b>Filters</b></span>
    </div>
    <div class="sim-calendar--aside--body">
      <TimeMeter
        :duration="filters.duration"
        @setDuration="setFilter('duration', ...arguments)"
      />
      <div class="filters sim-flex--2">
        <Component
           v-for="(picker, index) in pickers"
           :key="index"
           :is="picker.component"
           :options="picker.options"
           :selected="filters[picker.key]"
           :allowsMultipleBlanks="picker.allowsMultipleBlanks"
           @setSelected="setFilter(picker.key, ...arguments)"
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
      equipment: Array,
      roomAttributes: Array,
      isDisabled: Boolean,
    },
    computed: {
      decoratedRoomAttributes() {
        return this.roomAttributes.map(attribute => Object.assign({ label: attribute.name }, attribute))
      },
      pickers() {
        return [{
          options: this.instructors,
          key: 'instructors',
          component: 'InstructorPicker',
          allowsMultipleBlanks: true,
        },{
          options: this.learners,
          key: 'learners',
          component: 'LearnerPicker',
          allowsMultipleBlanks: false,
        },{
          options: this.equipment,
          key: 'equipment',
          component: 'EquipmentPicker',
          allowsMultipleBlanks: false,
        },{
          options: this.decoratedRoomAttributes,
          key: 'roomAttributes',
          component: 'RoomPicker',
          allowsMultipleBlanks: false,
        }]
      },
    },
    methods: {
      setFilter(key, value) {
        const filters = deepClone(this.filters)
        filters[key] = value
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
