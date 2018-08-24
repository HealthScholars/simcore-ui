<template>
  <div class="sim-autofinder" :class="{'sim-autofinder--visible-options': isOpen}">
    <label class="sim-autofinder--search">
      <input type="text"
             class="sim-autofinder--search--input"
             v-model="search"
             :disabled="shouldBeDisabled"
             :placeholder="placeholder"
             @blur="blur"
             @focus="focus"
             @keydown.down="moveDown"
             @keydown.up="moveUp"
             @keydown.enter="select"
             @keyup.esc="blur"
             @input="onInput"
             @keydown.tab="selectAndAddAnother"
      />

      <div class="sim-autofinder--remove-item" @click="removeItem" v-if="shouldShowRemoveItemCue">
        <SimIconText icon="fa fa-close" icon-type="fa"></SimIconText>
      </div>
    </label>

    <div class="sim-autofinder--options" v-if="isOpen">
      <transition-group appear name="list" tag="ul" mode="in-out">
        <li v-for="(option, optionIndex) in foundItems"
            :key="optionIndex"
            :class="{highlighted: optionIndex === position}"
            @mouseenter="position = optionIndex"
            @mousedown="clickSelect"
        >
          <slot name="option" :option="option"></slot>
        </li>
        <li key="no-results" v-if="noOptions">
          <i class="ghost">No results for "{{search}}"</i>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import SimIconText from './IconText'

export default {
  name: 'sim-single-selector',
  components: {
    SimIconText,
  },
  props: {
    placeholder: {
      type: String,
      default: 'find...',
    },
    items: {
      type: Array,
      required: true,
    },
    template: {
      type: Function,
      default: (item) => {
        return `${item.name}`
      },
    },
    filter: {
      type: Function,
      default: (item, search) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
      },
    },
    shouldBeDisabled: {
      type: Boolean,
      default: false,
    },
    isAlone: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpen: false,
      position: 0,
      search: '',
      foundItem: null,
      foundItems: [],
      previousValueLength: 0,
    }
  },
  computed: {
    noOptions() {
      return !this.foundItems.length
    },
    shouldShowRemoveItemCue() {
      return !this.isAlone || this.search.length || this.foundItem
    },
  },
  methods: {
    onInput() {
      this.foundItems = this.items.filter((item) => this.filter(item, this.search))

      this.isOpen = (this.search.length > 0)
      this.position = 0

      // @NOTE if we have an item in context AND subtract-altering the search string, reset the input - Jase
      if (this.foundItem && this.search.length <= this.previousValueLength) {
        this.$emit('clear', this.foundItem)
        this.search = ''
        this.previousValueLength = this.search.length
        this.foundItem = null
        this.isOpen = false
      }

      this.previousValueLength = this.search.length
    },
    moveDown() {
      if (!this.isOpen) {
        return
      }

      this.position = (this.position + 1) % this.foundItems.length
    },
    moveUp() {
      if (!this.isOpen) {
        return
      }

      this.position = (this.position - 1 < 0 ? this.foundItems.length - 1 : this.position - 1)
    },
    select() {
      if (this.isOpen && this.foundItems.length) {
        this.foundItem = this.foundItems[this.position]
        this.$emit('select', this.foundItem, this.index)
        this.search = this.template(this.foundItem)
        this.previousValueLength = this.search.length

        this.isOpen = false
      }
    },
    selectAndAddAnother() {
      if (this.isOpen && this.foundOptions.length) {
        this.$emit('add-another')
        this.select()
      }
    },
    clickSelect() {
      this.select()
    },
    removeItem() {
      if (this.isAlone) {
        this.onInput()
      } else {
        this.$emit('remove', (this.foundItem ? this.foundItem : this.item))
      }
    },
    blur() {
      if (!this.foundItem) {
        this.search = ''
      }

      this.isOpen = false
    },
    focus() {
      this.isOpen = (!this.foundItem && this.foundItems.length && this.search.length > 2)
      this.previousValueLength = this.search.length
    },
  },
}
</script>

<style lang="scss">
  @import '../styles/autofinder';
</style>
