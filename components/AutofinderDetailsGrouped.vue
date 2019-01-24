<template>
  <div class="autofinder-details">
    <transition-group appear name="list" tag="ul" mode="in-out">
      <li
        v-for="(options, key) in groupedOptions"
        :key="key"
      >
        <h3>{{key}}</h3>
        <ul>
          <li
            v-for="(item, index) in options"
            :key="item.id"
            @mousedown="selectItem(item)"
          >
            <AutofinderDetailItem
              :label="item.label"
              :category="item.category"
              :iconUrl="item.iconUrl"
              :class="{ selected: item.highlightIndex === highlightedIndex }"
            />
          </li>
        </ul>
      </li>
      <li key="no-results" v-if="groupedOptions.length === 0">
        <i class="ghost">No matches</i>
      </li>
    </transition-group>
  </div>
</template>

<script>
import AutofinderDetailItem from './AutofinderDetailItem.vue'

export default {
  components: {
    AutofinderDetailItem,
  },
  props: {
    groupedOptions: Object,
    highlightedIndex: Number,
  },
  methods: {
    selectItem(item) {
      this.$emit('selectItem', item)
    },
  },
}
</script>

<style lang="scss">

.autofinder-details {
  max-width: 25rem;
  max-height: 15rem;
  overflow-y: auto;
  box-shadow: 4px 4px 5px #111;
  background-color: #333;
  li {
    padding: 0;
    margin: 0;
    .autofinder-detail-item {
      &:hover, &.selected {
        background-color: #555;
      }
    }
  }
  h3 {
    padding: 0.5rem 0.25rem;
    margin-bottom: 0;
    font-size: 0.85rem;
  }
}
</style>
