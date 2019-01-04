<template>
  <div class="filter-molecule--options sim-datalist auto-finder-list">
    <transition-group
      name="sim-datalist"
      tag="ul"
      mode="out-in"
    >
      <li
        v-for="(item, index) in selectedItems"
        :key="`general-${index}`"
        :class="`item-${item.id}`"
      >
        <slot
          :selectedItems="selectedItems"
          :availableItems="availableItems"
          :index="index"
          :item="item"
          :select="select"
          :clear="clear"
          :remove="remove"
          :next="next"
        />
      </li>
      <li key="add">
        <IconText
          class="control--add-item"
          icon="#icon--control--add"
          icon-type="svg"
          @click.native="add"
        />
      </li>
    </transition-group>
  </div>
</template>

<script>
  import IconText from './IconText'
  import Autofinder from './Autofinder'

  import { deepClone } from '../utilities/deep-clone'
  import { differenceBy, flatten } from 'lodash'

  export default {
    components: {
      IconText,
      Autofinder,
    },
    props: {
      selectedItems: Array,
      options: Array,
    },
    watch: {
      availableItems(value){
      }
    },
    computed: {
      selectedItemCount() {
        return this.selectedItems.length
      },
      availableItems() {
        return differenceBy(
          flatten(this.options),
          this.selectedItems,
          'id',
        )
      },
    },
    methods: {
      add(){
        const selectedItems = deepClone(this.selectedItems)
        selectedItems.push({ id: -1 })
        this.$emit('setSelectedList', selectedItems)
      },
      remove(index){
        const selectedItems = deepClone(this.selectedItems)
        selectedItems.splice(index, 1)
        this.$emit('setSelectedList', selectedItems)
      },
      clear(index){
        const selectedItems = deepClone(this.selectedItems)
        selectedItems[index] = { id: -1 }
        this.$emit('setSelectedList', selectedItems)
      },
      next(index){
        if (index + 1 >= this.selectedItemCount) {
          this.add()
        }
      },
      select(index, item){
        const selectedItems = deepClone(this.selectedItems)
        selectedItems[index] = item
        this.$emit('setSelectedList', selectedItems)
      },
    },
  }
</script>

<style lang=scss>
  @import "../styles/datalist";
</style>
