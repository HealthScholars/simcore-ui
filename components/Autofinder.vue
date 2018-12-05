<template>
  <div class="sim-autofinder sim-autofinder--visible-options">
    <div v-if="errorMessage" class="error-message" :title="errorMessage">!</div>
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
    <AutofinderDetails
      v-if="optionsOpen"
      :options="matchingOptions"
      :highlightedIndex="highlightedIndex"
      @selectItem="select"
    />
  </div>
</template>

<script>
  /* eslint no-unused-expressions: 0 */
  import IconText from './IconText'
  import AutofinderDetails from './AutofinderDetails'

  import { flatten, sortBy } from 'lodash'

  export default {
    components: {
      IconText,
      AutofinderDetails,
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
      errorMessage: String,
      sortOrder: {
        type: String,
        default: 'alpha',
      },
    },
    computed: {
      inputValue() {
        return this.foundItem
          ? this.selectedItem.label
          : this.searchTerm
      },
      flattenedOptions() {
        return flatten(this.options)
      },
      optionsByIndex() {
        return this.flattenedOptions
      },
      optionsByAlpha() {
        return sortBy(this.flattenedOptions, 'label')
      },
      sortedOptions() {
        return this.sortOrder === 'index'
          ? this.optionsByIndex
          : this.optionsByAlpha
      },
      matchingOptions() {
        return this.searchTerm
          ? this.sortedOptions
              .filter(option => {
                return option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
              }).map(option => {
                option.isHighlighted = +option.id === +this.highlightedIndex
                return option
              })
          : this.sortedOptions
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
        this.select(this.matchingOptions[this.highlightedIndex])
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

  .error-message {
    position: absolute;
    border-radius: 4px;
    font-weight: 700;
    font-size: 1em;
    opacity: 0.7;
    right: 0;
    top: -1.5em;
    width: 2em;
    text-align: center;
    padding: 4px;
    color: white;
    background-color: orange;
    z-index: 1000;
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
