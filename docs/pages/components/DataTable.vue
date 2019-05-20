<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">

          <DataTable />

        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html" v-pre>
&lt;template&gt;
  &lt;v-card&gt;
    &lt;v-card-title&gt;
      Schedule Training
      &lt;v-spacer&gt;&lt;/v-spacer&gt;
      &lt;v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details&gt;&lt;/v-text-field&gt;
    &lt;/v-card-title&gt;

    &lt;v-data-table
      v-model="selected"
      :headers="headers"
      :items="rooms"
      :search="search"
      :pagination.sync="pagination"
      select-all
      item-key="name"
    &gt;
      &lt;template v-slot:headers="props"&gt;
        &lt;tr&gt;
          &lt;th class="actions checkbox"&gt;
            &lt;v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            &gt;&lt;/v-checkbox&gt;
          &lt;/th&gt;
          &lt;th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
            class="text-xs-left"
          &gt;
            {{ header.text }}
            &lt;v-icon small&gt;arrow_upward&lt;/v-icon&gt;
          &lt;/th&gt;
        &lt;/tr&gt;
      &lt;/template&gt;
      &lt;v-progress-linear v-slot:progress color="blue" indeterminate&gt;&lt;/v-progress-linear&gt;
      &lt;template v-slot:items="props"&gt;
        &lt;tr :active="props.selected" @click="props.selected = !props.selected"&gt;
          &lt;td class="actions checkbox"&gt;
            &lt;v-checkbox :input-value="props.selected" primary hide-details&gt;&lt;/v-checkbox&gt;
          &lt;/td&gt;
          &lt;td&gt;{{ props.item.name }}&lt;/td&gt;
          &lt;td&gt;{{ props.item.number }}&lt;/td&gt;
          &lt;td&gt;{{ props.item.day }}&lt;/td&gt;
          &lt;td&gt;{{ props.item.date }}&lt;/td&gt;
          &lt;td&gt;{{ props.item.time }}&lt;/td&gt;
        &lt;/tr&gt;
      &lt;/template&gt;
      &lt;template v-slot:no-results&gt;
        &lt;v-alert
          :value="true"
          color="error"
          icon="warning"
        &gt;Your search for "{{ search }}" found no results.&lt;/v-alert&gt;
      &lt;/template&gt;
    &lt;/v-data-table&gt;
  &lt;/v-card&gt;
&lt;/template&gt;

</code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">
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
</code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../../utility/Demobox'
import DataTable from '../../../components/DataTable'

export default {
  name: 'datatable-doc',
  components: {
    Demobox,
    DataTable,
  },
  data() {
    return {
      msg: 'DataTable'
    }
  },
  computed: {
  }
}
</script>
