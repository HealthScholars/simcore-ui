<template>
  <div class="tag-list">
    <ul>
      <li v-for="(tag, index) in selectedTags">
        <TagListItem
          :label="tag.label"
          @remove="remove(tag)"
        />
      </li>
    </ul>
    <Autofinder
      class="tag-input"
      :options="availableOptions"
      :selectedItem="{}"
      :canRemove="false"
      :isFocused="true"
      placeholder="Select a tag and press enter"
      @select="add"
    />
  </div>
</template>

<script>
import TagListItem from './TagListItem'
import Autofinder from './Autofinder'

import { deepClone } from '../utilities/deep-clone'
import { differenceBy } from 'lodash'

export default {
  components: {
    TagListItem,
    Autofinder,
  },
  props: {
    selectedTags: Array,
    options: Array,
  },
  computed: {
    availableOptions() {
      return differenceBy(this.options, this.selectedTags, "id")
    },
  },
  methods: {
    remove(tagToDelete) {
      const selectedTags = deepClone(this.selectedTags)
      this.$emit('updateTagList', selectedTags
        .filter(existingTag => existingTag.id !== tagToDelete.id)
      )
    },
    add(tag) {
      const selectedTags = deepClone(this.selectedTags)
      selectedTags.push(tag)
      this.$emit('updateTagList', selectedTags)
    },
  },
}
</script>

<style lang="scss">
.tag-list {
  > ul > li {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
  .tag-input {
    max-width: 20rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: inherit;
    &.sim-autofinder {
      padding: 0;
      .sim-icontext {
        display: none;
      }
      input {
        padding: 0.25rem 0.5rem;
        margin: 0;
        color: inherit;
      }
    }
  }
}
</style>
