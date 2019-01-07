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
        <ul v-if="groupingTypes.heading" v-for="heading in tree.items" :key="heading.name">
          <span class="heading">{{heading.name}}</span>

          <ul v-if="groupingTypes.subheading" v-for="subheading in heading.subheadings">
            <span class="subheading">{{subheading.name}}</span>
            <li v-for="option in subheading.items"
                :key="tree.getIndexByItemId(option.id)"
                :class="{highlighted: tree.getIndexByItemId(option.id) === position}"
                @mouseenter="position = tree.getIndexByItemId(option.id)"
                @mousedown="clickSelect"
            >
              <slot name="option" :option="option"></slot>
            </li>
          </ul>

          <li v-if="!groupingTypes.subheading" v-for="option in heading.items"
              :key="tree.getIndexByItemId(option.id)"
              :class="{highlighted: tree.getIndexByItemId(option.id) === position}"
              @mouseenter="position = tree.getIndexByItemId(option.id)"
              @mousedown="clickSelect"
          >
            <slot name="option" :option="option"></slot>
          </li>
        </ul>

        <ul v-if="!groupingTypes.heading" key="tree-items">
          <li v-for="option in tree.items"
              :key="tree.getIndexByItemId(option.id)"
              :class="{highlighted: tree.getIndexByItemId(option.id) === position}"
              @mouseenter="position = tree.getIndexByItemId(option.id)"
              @mousedown="clickSelect"
          >
            <slot name="option" :option="option"></slot>
          </li>
        </ul>

        <li key="no-results" v-if="noOptions">
          <i class="ghost">No results for "{{search}}"</i>
        </li>
      </transition-group>
    </div>

  </div>
</template>

<script>
  import SelectionTree from '../data/SelectionTree'

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
      groupingTypes: {
        type: Object,
        default: () => ({
          heading: 'facility',
          subheading: 'department',
        }),
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
      didSelect: {
        type: Function,
        default: (item) => item,
      },
    },
    data() {
      return {
        isOpen: false,
        position: 0,
        search: '',
        foundItem: null,
        previousValueLength: 0,
        tree: {
          size: 0,
          originalItems: [],
          items: [],
          indexes: [],
        },
      }
    },
    computed: {
      noOptions() {
        return !this.tree.size
      },
      shouldShowRemoveItemCue() {
        return !this.isAlone || this.search.length || this.foundItem
      },
    },
    methods: {
      onInput() {
        const foundItems = this.items.filter((item) => this.filter(item, this.search))

        this.tree = new SelectionTree({ ...this.groupingTypes, items: foundItems })

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

        this.position = (this.position + 1) % this.tree.size
      },
      moveUp() {
        if (!this.isOpen) {
          return
        }

        this.position = (this.position - 1 < 0 ? this.tree.size - 1 : this.position - 1)
      },
      select() {
        if (this.isOpen && this.tree.size) {
          this.foundItem = this.tree.getItemByIndex(this.position)
          this.didSelect(this.foundItem)
          this.previousValueLength = this.search.length

          this.isOpen = false
        }
      },
      selectAndAddAnother() {
        if (this.isOpen && this.tree.size) {
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
        this.isOpen = (!this.foundItem && this.tree.size && this.search.length > 2)
        this.previousValueLength = this.search.length
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/autofinder';

  .heading {
    font-weight: 500;
    font-size: 1.2em;
    padding: 0.3em;
    border-top: 1px solid #bbb;
    display: block;
  }

  .subheading {
    font-weight: 600;
    font-size: 0.85em;
    padding: 0.3em;
    display: block;
  }
</style>
