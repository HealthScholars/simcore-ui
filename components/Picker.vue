<template>
  <section class="filter-molecule filter--instructors sim-filter">
    <header class="filter-molecule--heading text--green">
      <slot
        name="icon"
        :selectedItemCount="selectedItemCount"
      />
    </header>
    <div class="filter-molecule--options sim-datalist">
      <transition-group
        name="sim-datalist"
        tag="ul"
        mode="out-in"
      >
        <li
          v-for="(item, index) in selected"
          :key="item.id"
        >
          <Autofinder
            :options="availableItems"
            :selectedItem="item"
            :canRemove="selectedItemCount > 1"
            :placeholder="placeholder"
            @select="select(index, ...arguments)"
            @clear="clear(index)"
            @remove="remove(index)"
            @next="next(index)"
          />
        </li>
        <li
          key="add"
          v-if="allowsMultipleBlanks || !hasEmptySlot"
        >
          <IconText
            class="control--add-item"
            icon="#icon--control--add"
            icon-type="svg"
            @click.native="add"
          />
        </li>
      </transition-group>
    </div>
  </section>
</template>

<script>
  import IconText from './IconText'
  import Autofinder from './Autofinder'

  import { cloneDeep, map, differenceBy } from 'lodash'
  import { find } from 'lodash/fp'

  export default {
    components: {
      IconText,
      Autofinder,
    },
    props: {
      options: Array,
      selected: Array,
      placeholder: {
        type: String,
        default: 'Please select an item',
      },
      allowsMultipleBlanks: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      selectedItemCount() {
        return this.selected.length
      },
      availableItems() {
        return differenceBy(this.options, this.selected, 'id')
      },
      hasEmptySlot() {
        return !!find({ id: -1 })(this.selected)
      },
    },
    methods: {
      add() {
        this.setSelected([...this.selected, { id: -1 }])
      },
      remove(index) {
        const selected = cloneDeep(this.selected)
        selected.splice(index, 1)
        this.setSelected(selected)
      },
      clear(index) {
        const selected = cloneDeep(this.selected)
        selected[index] = { id: -1 }
        this.setSelected(selected)
      },
      select(index, item) {
        const selected = cloneDeep(this.selected)
        selected[index] = item
        this.setSelected(selected)
      },
      next(index) {
        if (index + 1 >= this.selectedItemCount) {
          this.add()
        }
      },
      setSelected(items) {
        this.$emit('setSelected', items)
      },
    },
  }
</script>

<style lang="scss">
  @import "../styles/datalist";
</style>
