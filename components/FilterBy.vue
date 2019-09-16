<template lang="html">
  <div class="sim-filter sim-accordion" :class="{ active: shouldBeActive, open: isOpen }">

    <div class="sim-filter--header sim-accordion--label" @click="toggleOpenList">{{ label }}</div>
      <div v-if="filterDepartmentByAlphaNum" class="filter filter--alpha sim-accordion--items">
        <ul class="list">
          <li
            v-for="item in filterList"
            :key="item.title">
            <a href="#0" @click="filterDepartment">{{ item.title }}</a>
          </li>
        </ul>
      </div>

    <SimDatalist v-if="!this.shouldShowAutocomplete" :items="list" :animate="true" class="sim-filter--items sim-accordion--items">
        <li slot="static-before" key="static-before" class="static system-echo FIXME-generic-classes" v-if="showSystemEcho">
          {{ systemEcho }}
        </li>
        <li slot="item" slot-scope="props" :key="props.item.id" class="no-wrap">
          <SimSelection :item-id="props.item.id" :should-be-selected="false" @toggle="toggleSelection">
            {{ props.item.name }}
          </SimSelection>
        </li>
    </SimDatalist>

    <sim-selection-set v-if="this.shouldShowAutocomplete"
                       :sourceItems="this.list"
                       class="sim-filter--items sim-accordion--items"
                       @toggle="toggleSelection"
    ></sim-selection-set>
    
      <button @click="prevPage" class="link">
          <SimIconText data-testid="previousButton" icon="fa-arrow-left fa-fw"></SimIconText>
        </button>
          <span class="nowrap"></span>
      <button @click="nextPage" class="link">
        <SimIconText data-testid="nextButton" icon="fa-arrow-right fa-fw"></SimIconText>
      </button>
  </div>
</template>

<script>
import SimIconText from "./IconText";
import SimDatalist from "./Datalist";
import SimSelection from "./Selection";
import SimSelectionSet from "./Filters/SelectionSet";

export default {
  name: "sim-filter-by",
  components: {
    SimSelectionSet,
    SimIconText,
    SimDatalist,
    SimSelection
  },
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    systemEcho: {
      type: String
    },
    autocompleteThreshold: {
      type: Number,
      default: 15
    },
    filterDepartmentByAlphaNum: {
      type: Boolean
    }
  },
  data() {
    return {
      selectedItems: [],
      items: [],
      isOpen: false,
      totalPages:1,
      filterList: [
        {
          title: "All"
        },
        {
          title: "#"
        },
        {
          title: "A"
        },
        {
          title: "B"
        },
        {
          title: "C"
        },
        {
          title: "D"
        },
        {
          title: "E"
        },
        {
          title: "F"
        },
        {
          title: "G"
        },
        {
          title: "H"
        },
        {
          title: "I"
        },
        {
          title: "J"
        },
        {
          title: "K"
        },
        {
          title: "L"
        },
        {
          title: "M"
        },
        {
          title: "N"
        },
        {
          title: "O"
        },
        {
          title: "P"
        },
        {
          title: "Q"
        },
        {
          title: "R"
        },
        {
          title: "S"
        },
        {
          title: "T"
        },
        {
          title: "U"
        },
        {
          title: "V"
        },
        {
          title: "W"
        },
        {
          title: "X"
        },
        {
          title: "Y"
        },
        {
          title: "Z"
        }
      ]
    };
  },
  computed: {
    shouldBeActive() {
      return this.selectedItems.length > 0;
    },
    showSystemEcho() {
      return this.systemEcho && this.systemEcho.length && !this.list.length;
    },
    shouldShowAutocomplete() {
      return this.list.length >= this.autocompleteThreshold;
    }
  },
  methods: {
    toggleOpenList() {
      this.isOpen = !this.isOpen;
    },
    toggleSelection(id, isSelected) {
      if (isSelected) {
        this.selectedItems.push(id);
      } else {
        this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
      }
    },
    filterDepartment() {
      return true;
    },
    nextPage () {
    this.isLoading = true
    this.pageRequest < this.totalPages ? this.pageRequest++ : this.totalPages
    },
    prevPage () {
        this.isLoading = true
        this.pageRequest > 1 ? this.pageRequest-- : 1
    },
  },
  watch: {
    selectedItems(newValue) {
      this.$emit("filter", this.type, newValue);
    }
  }
};
</script>


<style lang="scss">
@import "../styles/filter-by";
</style>

