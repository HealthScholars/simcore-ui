<template lang="html">
  <div class="sim-filter sim-accordion" :class="{ active: shouldBeActive, open: isOpen }">

    <div class="sim-filter--header sim-accordion--label" @click="toggleOpenList">{{ label }}</div>

    <div v-if="filterDepartmentByAlphaNum" class="sim-accordion--items department-items">
        <ul class="list">
          <li
            v-for="item in filterList"
            :key="item">
            <a href="#0" v-on:click="getDepartments(item)">{{ item }}</a>
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
                      class="sim-accordion--items"
                      @toggle="toggleSelection"
    ></sim-selection-set>

    <div v-if="filterDepartmentByAlphaNum" class="sim-accordion--items paginatedList">
      <ul>
        <li v-for="department in paginatedDepartments"
          :key="department.id">
          {{ department.name }}
        </li>
      </ul>
    </div>

    <div v-if="filterDepartmentByAlphaNum" class="sim-accordion--items">
        <button @click="prevDepartmentPage" class="link">
            <SimIconText data-testid="previousButton" icon="fa-arrow-left fa-fw"></SimIconText>
        </button>
        <span class="nowrap"></span>
        <button @click="nextDepartmentPage" class="link">
            <SimIconText data-testid="nextButton" icon="fa-arrow-right fa-fw"></SimIconText>
        </button>
    </div>

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
      departments: [],
      selectedItems: [],
      items: [],
      isOpen: false,
      totalPages: 1,
      filterList: ["All", "#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    }
  },
  computed: {
    shouldBeActive() {
      return this.selectedItems.length > 0
    },
    showSystemEcho() {
      return this.systemEcho && this.systemEcho.length && !this.list.length;
    },
    shouldShowAutocomplete() {
      return this.list.length >= this.autocompleteThreshold;
    },
    getDepartmentsByLetter() {
      return $store.getters.paginatedDepartments;
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
    nextDepartmentPage() {
      this.isLoading = true;
      this.pageRequest < this.totalPages ? this.pageRequest++ : this.totalPages;
    },
    prevDepartmentPage() {
      this.isLoading = true;
      this.pageRequest > 1 ? this.pageRequest-- : 1;
    },
    getDepartments(departmentLetter) {
      console.log(departmentLetter)
    },
    // getDepartmentsByLetter() {
    //   return this.$store.getters.paginatedDepartments
    // }

  },
  watch: {
    selectedItems(newValue) {
      this.$emit("filter", this.type, newValue);
    }
  },
  mounted() {
    console.log(this.$store.getters.paginatedDepartments)
  }
};
</script>


<style lang="scss">
  @import "../styles/filter-by";
</style>

