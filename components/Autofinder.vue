<template>
  <div class="sim-autofinder sim-autofinder--visible-options">
    <label class="sim-autofinder--search">
      <IconText :icon="icon" icon-type="svg" />
      <div class="input-container">
        <input type="text" class="sim-autofinder--search--input"
          ref="input"
          :placeholder="placeholder"
          :value="inputValue"
          :required="isRequired"
          @input="updateInput"
          @blur="blur"
          @keydown.down="highlightNext"
          @keydown.up="highlightPrevious"
          @keydown.enter.prevent="selectHighlighted"
          @keydown.tab.exact="selectHighlighted"
          @keyup.esc="blur"
        />
        <img
          v-if="selectedItem.iconUrl"
          :src="selectedItem.iconUrl"
          :alt="selectedItem.category"
        />
      </div>
      <IconText
        v-if="canRemove"
        class="sim-autofinder--remove-item"
        @click.native="$emit('remove')"
        icon="#icon--control--x" icon-type="svg"
      />
    </label>
    <AutofinderDetailsGrouped
      v-if="optionsOpen && groupBy"
      :groupedOptions="matchingOptionsGrouped"
      :highlightedIndex="highlightedIndex"
      @selectItem="select"
    />
    <AutofinderDetails
      v-else-if="optionsOpen && !groupBy"
      :options="availableOptions"
      :highlightedIndex="highlightedIndex"
      @selectItem="select"
    />
  </div>
</template>

<script>
  /* eslint no-unused-expressions: 0 */
  import IconText from './IconText'
  import AutofinderDetails from './AutofinderDetails'
  import AutofinderDetailsGrouped from './AutofinderDetailsGrouped'

  import {
    flatMap, identity, unescape, find,
    filter, flatten, flow, map, sortBy,
    groupBy, assign
  } from 'lodash/fp'
  const mapWithIndex = map.convert({ cap: false })

  export default {
    components: {
      IconText,
      AutofinderDetails,
      AutofinderDetailsGrouped,
    },
    data() {
      return {
        searchTerm: '',
        highlightedIndex: -1,
      }
    },
    props: {
      options: Array,
      placeholder: {
        type: String,
        default: 'find...',
      },
      canRemove: Boolean,
      selectedItem: Object,
      isRequired: Boolean,
      sortOrder: {
        type: String,
        default: 'alpha',
      },
      groupBy: String,
    },
    computed: {
      inputValue() {
        return this.foundItem
          ? unescape(this.selectedItem.label)
          : this.searchTerm
      },
      flattenedOptions() {
        return flatten(this.options)
      },
      optionsByIndex() {
        return this.flattenedOptions
      },
      optionsByAlpha() {
        return sortBy('label')(this.flattenedOptions)
      },
      sortedOptions() {
        return this.sortOrder === 'index'
          ? this.optionsByIndex
          : this.optionsByAlpha
      },
      availableOptions() {
        return this.searchTerm
          ? this.matchingOptions
          : this.sortedOptions
      },
      matchingOptions() {
        return flow([
          filter(option => {
            return option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
          }),
          map(option => {
            return assign(option, {
              isHighlighted: +option.id === +this.highlightedIndex
            })
          }),
        ])(this.sortedOptions)
      },
      matchingOptionsGrouped() {
        return flow([
          sortBy(this.groupBy),
          mapWithIndex(this.addHighlightIndex),
          groupBy(this.groupBy),
        ])(this.matchingOptions)
      },
      foundItem() {
        return this.selectedItem.id > 0
      },
      icon() {
        return this.foundItem ? '#icon--checkbox--checked' : '#icon--checkbox--available'
      },
      optionsOpen() {
        return !this.foundItem && this.highlightedIndex >= 0 || this.searchTerm.length > 0
      },
      currentIndex() {
        return this.matchingOptions.map(option => option.id).indexOf(this.highlightedIndex)
      },
      nextIndex() {
        return this.currentIndex < this.matchingOptions.length - 1
          ? this.currentIndex + 1
          : this.currentIndex
      },
      previousIndex() {
        return this.currentIndex > -1
          ? this.currentIndex - 1
          : this.currentIndex
      },
      hasMatchingOptions() {
        return this.matchingOptions.length > 0
      },
    },
    methods: {
      updateInput(event) {
        if (this.foundItem) {
          this.clear()
          this.highlightedIndex = -1
        }
        this.searchTerm = event.target.value
      },
      blur() {
        if (!this.foundItem) {
          this.searchTerm = ''
          this.highlightedIndex = -1
        }
      },
      clear() {
        this.$emit('select', { id: -1 })
      },
      select(option) {
        this.highlightedIndex = -1
        if (option) {
          this.$emit('select', option)
        }
      },
      selectHighlighted() {
        const item = this.groupBy
          ? flow([
              flatMap(identity),
              find({ highlightIndex: this.highlightedIndex }),
            ])(this.matchingOptionsGrouped)
          : this.matchingOptions[this.highlightedIndex]

        this.select(item)
        this.searchTerm = ''
      },
      highlightPrevious() {
        if (this.highlightedIndex >= 0) {
          this.highlightedIndex -= 1
        }
      },
      highlightNext() {
        if (this.highlightedIndex < this.matchingOptions.length - 1) {
          this.highlightedIndex += 1
        }
      },
      setHighlightedOption(index) {
        this.highlightedIndex = index
      },
      isHighlighted(index) {
        return index === this.highlightedIndex
      },
      addHighlightIndex(item, index) {
        return assign(item, {
          highlightIndex: index,
        })
      },
    },
  }
</script>

<style lang="scss">
.sim-autofinder {
  flex: 1;
  position: relative;

  .input-container {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    img {
      height: 1rem;
    }
  }

  .sim-autofinder--search {
    display: flex;

    &--input[type="text"] {
      background: transparent;
      border: 0;
      border-radius: 0;
      box-shadow: none;
      color: var(--light);
      flex: 1;
      font-weight: normal;
      margin: -.2em .2em;
      padding: .2em;

      &::placeholder {
        font-style: italic;
      }
    }
  }

  &--remove-item {
    cursor: pointer;
    line-height: 0;

    .sim-icontext {
      opacity: 0;
    }
  }

  &:hover {

    .sim-autofinder--remove-item  {
      .sim-icontext {
        opacity: .5;
      }
    }
  }

  &--visible-options {
  }

  /*
  &--options {
    color: var(--autofinder-items-fg, var(--dark));
    background: var(--autofinder-items-bg, var(--lighter));
    border-radius: .2rem;
    box-shadow: 0 0 0 1px var(--fog), 0 .3em 1em -.3em var(--shadow);
    max-height: 15em;
    overflow: auto;
    position: absolute;
    top: calc(100% + 1px);
    left: 1em;
    right: 1em;
    max-height: 15em;
    overflow: auto;
    color: var(--autofinder-items-fg, var(--dark));
    background: var(--autofinder-items-bg, var(--lighter));
    border-radius: .2rem;
    box-shadow: 0 0 0 1px var(--fog), 0 .3em 1em -.3em var(--shadow);
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 100;

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

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      padding: .5em;

      &.highlighted {
        background: var(--autofinder-highlight-bg, var(--shade));
        color: var(--autofinder-highlight-fg, var(--blue));
      }
    }
  }
  */
}
</style>
