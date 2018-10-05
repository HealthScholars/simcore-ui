<template>
  <div class="sim-autofinder sim-autofinder--visible-options">
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
  @import '../styles/autofinder';
</style>
