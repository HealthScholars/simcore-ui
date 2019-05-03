<template>
  <v-card>
    <v-card-title>
      Schedule Training
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="rooms"
      :search="search"
      :pagination.sync="pagination"
      select-all
      item-key="name"
    >
      <template v-slot:headers="props">
        <tr>
          <th class="actions checkbox">
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
            class="text-xs-left"
          >
            {{ header.text }}
            <v-icon small>arrow_upward</v-icon>
          </th>
        </tr>
      </template>
      <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
      <template v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td class="actions checkbox">
            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.number }}</td>
          <td>{{ props.item.day }}</td>
          <td>{{ props.item.date }}</td>
          <td>{{ props.item.time }}</td>
        </tr>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

  export default {
    name: 'DataTable',
    props: {},

    data: () => ({
      search: '',
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [
        { text: 'Room Name', value: 'name' },
        { text: 'Room #', value: 'number' },
        { text: 'Day', value: 'day' },
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time' }
      ],
      rooms: [
        {
          name: 'Alaska Room',
          number: '1',
          day: 'Monday',
          date: '2019-05-07',
          time: '1:00PM'
        },
        {
          name: 'Alaska Room',
          number: '1',
          day: 'Monday',
          date: '2019-05-07',
          time: '1:30PM'
        },
        {
          name: 'Alaska Room',
          number: '1',
          day: 'Monday',
          date: '2019-05-07',
          time: '2:00PM'
        },
        {
          name: 'Test Room',
          number: '201',
          day: 'Tuesday',
          date: '2019-05-07',
          time: '9:00AM'
        },
        {
          name: 'Test Room',
          number: '201',
          day: 'Tuesday',
          date: '2019-05-08',
          time: '7:00AM'
        },
        {
          name: 'Test Room',
          number: '201',
          day: 'Tuesday',
          date: '2019-05-08',
          time: '9:00AM'
        },
        {
          name: 'Test Room',
          number: '201',
          day: 'Tuesday',
          date: '2019-05-08',
          time: '9:30AM'
        }
      ]
    }),

    methods: {
      toggleAll() {
        if (this.selected.length) this.selected = [];
        else this.selected = this.desserts.slice();
      },
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending;
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false;
        }
      }
    }
  }
</script>

<style lang="scss">
  .theme--light.v-input:not(.v-input--is-disabled) input {
    box-shadow: none;
  }

  .v-table .actions {
    &.checkbox {
      width: 2rem;
      padding: 0 0 0 24px;
    }
  }
</style>
