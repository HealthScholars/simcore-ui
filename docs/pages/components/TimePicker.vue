<template lang="html">
  <article>
    <h2>{{ msg }}</h2>

    <demobox>
      <template slot="intro">
        Normal / Default
      </template>
      <template slot="view">
        <SimTimePicker orientation="x"
          :date="date"
          :blocks="blocks"
          :should-show-date="true"
          @calendar-day-selected="manageDayControlPanel"
          @all-time-blocks-removed="allTimeBlocksRemoved"
          @time-block-removed="timeBlockRemoved"
          ></SimTimePicker>
        <br/>
        <p>Data</p>
        <div class="flex-baseline-around">
          <pre v-highlightjs><code class="javascript">{{ blocks }}</code></pre>
          <pre v-highlightjs><code class="javascript">{{ user_dates }}</code></pre>
        </div>
      </template>
      <template slot="html">
      <pre v-highlightjs><code class="html">&lt;SimTimePicker
    :date="date"
    :blocks="blocks"
    :should-show-date="true"
    @calendar-day-selected="manageDayControlPanel"
    @all-time-blocks-removed="allTimeBlocksRemoved"
    @time-block-removed="timeBlockRemoved"
    >&lt;/SimTimePicker></code></pre>
      </template>
      <template slot="js">
        <pre v-highlightjs><code class="javascript">data() {
  return {
    msg: 'TimePicker',
    dateFormat: 'YYYY-MM-DD',
    date: dayjs()
      .format('YYYY-MM-DD'),
    displayDate: dayjs()
      .format('dddd, MMMM Do'),
    user_dates: {},
    blocks: [],
    block: {},
  }
},
methods: {
  manageDayControlPanel(date) {
    const dayMoment = dayjs(date)
    dateObject.month-1, dateObject.day])
    this.displayDate = dayMoment.format('dddd, MMMM Do')
    this.date = dayMoment.format('YYYY-MM-DD')
    this.blocks = this.user_dates[this.date] || []
    if (this.blocks.length) {
      this.user_dates[this.date] = this.blocks
    }
  },
  allTimeBlocksRemoved(date) {
    delete this.user_dates[date]
  },
  timeBlockWasCreated(date, blocks) {
    this.user_dates[date] = blocks
  },
  timeBlockRemoved(date, blocks) {
    this.user_dates[date] = blocks
  },
},</code></pre>
      </template>
    </demobox>

  </article>
</template>

<script>
  import dayjs from 'dayjs'
  import Demobox from '../../utility/Demobox'
  import SimTimePicker from '../../../components/TimePicker'

  export default {
    name: 'time-picker-doc',
    components: {
      Demobox,
      SimTimePicker,
    },
    data() {
      return {
        msg: 'TimePicker',
        dateFormat: 'YYYY-MM-DD',
        date: dayjs().format('YYYY-MM-DD'),
        displayDate: dayjs().format('dddd, MMMM Do'),
        user_dates: {},
        blocks: [],
        block: {},
      }
    },
    computed: {},
    methods: {
      manageDayControlPanel(date) {
        const dayMoment = dayjs(date)
        // let dayMoment = moment([dateObject.year, dateObject.month-1, dateObject.day])
        this.displayDate = dayMoment.format('dddd, MMMM Do')
        this.date = dayMoment.format('YYYY-MM-DD')
        this.blocks = this.user_dates[this.date] || []
        if (this.blocks.length) {
          this.user_dates[this.date] = this.blocks
        }
      },
      allTimeBlocksRemoved(date) {
        delete this.user_dates[date]
      },
      timeBlockWasCreated(date, blocks) {
        this.user_dates[date] = blocks
      },
      timeBlockRemoved(date, blocks) {
        this.user_dates[date] = blocks
      },
    },
  }
</script>
