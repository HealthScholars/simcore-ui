<template>
  <section>
    <sim-autocomplete
      :options='this.remainingItems'
      @select='didSelectAnItem'
      searchKey="name"
    >
      <template slot="item" slot-scope="props">
        <article class='media'>
          <p>
            <strong>{{ props.option.name }}</strong>
            <br> {{ props.option.description }}
          </p>
        </article>
      </template>
    </sim-autocomplete>

    <sim-datalist
      :items="selectedItems"
    >
      <li slot="item" slot-scope="props">
        <sim-selection
          :item="props.item"
          :item-id="props.item.id"
          :disabled="props.item.disabled"
          :should-be-selected="true"
          @toggle="toggleAnItem"
          :toggleable="false"
        >
          {{ props.item.name }}
          <small class="ghost" v-if="props.item.description">{{ props.item.description }}</small>
        </sim-selection>
      </li>
    </sim-datalist>

  </section>
</template>
<script>
  import _ from 'lodash'

  import SimAutocomplete from '../Autocomplete'
  import SimDatalist from '../Datalist'
  import SimSelection from '../Selection'

  export default {
    name: 'sim-selection-set',
    components: {
      SimSelection,
      SimDatalist,
      SimAutocomplete,
    },
    props: {
      sourceItems: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        remainingItems: [],
        selectedItems: [],
      }
    },
    mounted() {
      this.remainingItems = this.sourceItems
    },
    methods: {
      didSelectAnItem(selectedItem) {
        this.selectedItems.push(selectedItem)

        this.remainingItems = _.difference(this.sourceItems, this.selectedItems)

        this.$emit('toggle', selectedItem.id, true)
      },
      toggleAnItem(item) {
        const itemIndex = _.findIndex(this.selectedItems, (selectedItem) => selectedItem.id === item)

        if (itemIndex >= 0) {
          const selectedItems = [...this.selectedItems]
          const itemToRemove  = _.pullAt(selectedItems, [itemIndex])

          this.selectedItems  = selectedItems
          this.remainingItems = _.difference(this.sourceItems, this.selectedItems)

          this.$emit('toggle', _.first(itemToRemove).id, false)
        }
      },
    },
  }
</script>
