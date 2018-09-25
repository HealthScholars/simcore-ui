<template lang="html">
  <div class="sim-autocomplete" :class="{'sim-autocomplete--options-visible': isOpen}">
    <div class="sim-autocomplete--search">
      <span class="sim-autocomplete--search--icon">
        <SimIconText icon="fa-search"></SimIconText>
      </span>
      <input type="search" v-model="keyword"
             class="sim-autocomplete--search--input"
             :placeholder="placeholder"
             :disabled="isDisabled"
             @input="onInput($event.target.value)"
             @keyup.esc="reset"
             @focus="focus"
             @blur="blur"
             @keydown.down="moveDown"
             @keydown.up="moveUp"
             @keydown.enter="select"
             @keydown.delete="onDelete"
      />
      <span class="sim-autocomplete--search--item-count">
        {{ filteredOptionsCount }}
      </span>
    </div>
    <div class="sim-autocomplete--items" v-show="isOpen">
      <transition-group appear name="list" tag="ul" mode="in-out">
        <li v-for="(option, index) in this.filteredOptions"
            :key="index"
            :class="{highlighted: index === position}"
            @mouseenter="position = index"
            @mousedown="clickSelect"
        >
          <slot name="item" :option="option"></slot>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import SimIconText from './IconText'

  export default {
    name: 'sim-autocomplete',
    components: {
      SimIconText,
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
      shouldBeDisabled: {
        type: Boolean,
        default: false,
      },
      searchKey: {
        type: String,
        default: 'name',
      },
    },
    data() {
      return {
        isOpen: false,
        position: 0,
        keyword: '',
        remainingItems: [],
      }
    },
    watch: {
      keyword(newKeyword) {
        if (this.filteredOptionsCount > 0) {
          const lowerKeyword = newKeyword.toLowerCase()

          this.remainingItems = this.options.filter((option) => {
            return _.includes(option[this.searchKey].toLowerCase(), lowerKeyword)
          })
        }
      },
      options(newOptions) {
        this.remainingItems = newOptions
      },
    },
    computed: {
      filteredOptions() {
        return _.take(this.remainingItems, 10)
      },
      filteredOptionsCount() {
        return this.remainingItems.length
      },
      isDisabled() {
        return this.shouldBeDisabled
      },
    },
    mounted() {
      this.remainingItems = this.options
    },
    methods: {
      onInput(value) {
        this.position = 0
        this.isOpen = !!value
      },
      moveDown(event) {
        if (!this.isOpen) {
          return
        }
        event.preventDefault()

        this.position = (this.position + 1) % this.filteredOptionsCount
      },
      moveUp(event) {
        if (!this.isOpen) {
          return
        }
        event.preventDefault()

        this.position = (this.position - 1 < 0 ? this.filteredOptionsCount - 1 : this.position - 1)
      },
      select() {
        if (this.isOpen) {
          const selectedOption = this.remainingItems[this.position]

          this.$emit('select', selectedOption)
        }
      },
      clickSelect() {
        this.select()
        this.reset()
      },
      onDelete() {
        this.remainingItems = this.options
      },
      reset() {
        this.remainingItems = this.options
        this.isOpen = false
        this.keyword = ''
      },
      blur() {
        this.isOpen = false
      },
      focus() {
        this.isOpen = true
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/autocomplete';
</style>
