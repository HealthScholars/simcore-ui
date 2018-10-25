<template>
  <div class="sim-autofinder sim-autofinder--visible-options">
    <div v-if="errorMessage" class="error-message" :title="errorMessage">!</div>
    <label class="sim-autofinder--search">
      <IconText :icon="icon" icon-type="svg" />
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
      <IconText
        v-if="canRemove"
        class="sim-autofinder--remove-item"
        @click.native="$emit('remove')"
        icon="#icon--control--x" icon-type="svg"
      />
    </label>
    <div v-if="optionsOpen" class="sim-autofinder--options">
      <transition-group appear name="list" tag="ul" mode="in-out">
        <li v-for="(option, index) in matchingOptions"
          :key="index"
          :class="{highlighted: index == highlightedIndex}"
          @mouseenter="setHighlightedOption(index)"
          @mousedown="select(option)"
        >
          <p>{{ option.label }}</p>
        </li>
        <li key="no-results" v-if="!hasMatchingOptions">
          <i class="ghost">No results for "{{searchTerm}}"</i>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
  /* eslint no-unused-expressions: 0 */
  import IconText from './IconText'

  export default {
    components: {
      IconText,
    },
    data() {
      return {
        searchTerm: '',
        highlightedIndex: 0,
      }
    },
    props: {
      options: {
        type: Array,
        required: true,
      },
      placeholder: {
        type: String,
        default: 'find...',
      },
      canRemove: Boolean,
      selectedItem: Object,
      isRequired: Boolean,
      errorMessage: String,
    },
    computed: {
      inputValue() {
        return this.foundItem
          ? this.selectedItem.label
          : this.searchTerm
      },
      matchingOptions() {
        return this.options.filter((option) => {
          return option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
        }).map(option => {
          option.isHighlighted = +option.id === +this.highlightedId
          return option
        })
      },
      foundItem() {
        return this.selectedItem.id > 0
      },
      icon() {
        return this.foundItem ? '#icon--checkbox--checked' : '#icon--checkbox--available'
      },
      optionsOpen() {
        return this.searchTerm.length > 0 && !this.foundItem
      },
      currentIndex() {
        return this.matchingOptions.map(option => option.id).indexOf(this.highlightedId)
      },
      nextIndex() {
        return this.currentIndex < this.matchingOptions.length - 1
          ? this.currentIndex + 1
          : this.currentIndex
      },
      previousIndex() {
        return this.currentIndex > 0
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
          this.$emit('clear')
          this.highlightedId = -1
        }
        this.searchTerm = event.target.value
      },
      blur() {
        if (!this.foundItem) {
          this.searchTerm = ''
        }
      },
      select(option) {
        if (option) {
          this.$emit('select', option)
        }
      },
      selectHighlighted() {
          this.select(this.matchingOptions[this.highlightedIndex])
      },
      highlightPrevious() {
        if (this.highlightedIndex > 0) {
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
}
</style>
