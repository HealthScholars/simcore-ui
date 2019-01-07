<template>
  <section>
    <div class="local--day--time-blocks local--day--event-blocks">
      <SimTimeBlock v-for="(block, index) in events"
        theme="event"
        xv-bubble-trigger="{date: date, block, x: dayOfWeek+1, followMousemove: false, slideTemplate: 'SimSlideWithEventDetails'}"
        :key="index"
        :block="block"
        :index="index"
        :show-controls="false"
      />
    </div>

    <div class="local--day--blocks local--day--pending-blocks">
      <SimTimeBlock v-if="pendingEvent"
        theme="pending-event"
        key="peblox"
        :can-have-a-bubble="true"
        :offset="{ x: dayOfWeek + 1, y: 0 }"
        :block="pendingEvent"
        :index="0"
        :show-controls="showTimeBlockControls"
        :settings="pendingBlockSettings"
        @remove-time-block="removePendingBlock"
      />
    </div>

    <div class="local--day--blocks local--day--aggregate-blocks">
      <SimTimeBlock v-if="thereAreNoFilteredResultsForThisDay"
        theme="empty"
        block-icon="#icon--instructors-none"
        :tooltip="{icon: '#icon--instructors-none', text: 'No Instructors Found'}"
        :block="{startTime: 0, duration: 24}"
        :index="0"
        :show-controls="false"
      />

      <SimTimeBlock v-else-if="thereIsDataForThisDay" v-for="(item, segmentKey, index) in filteredSegments"
        :theme="availabilityBlockTheme"
        :block="{startTime: (segmentKey / 2), duration: 0.5, items: item.user_ids}"
        :index="index"
        :key="index"
        :show-controls="false"
        :settings="filteredBlockSettings"
        @time-block-clicked="aggregateTimeBlockClicked"
      />

      <SimTimeBlock v-else-if="thereIsNoDataForThisDay"
        theme="null"
        :tooltip="{icon: '#icon--instructors-null', text: 'No Data'}"
        :block="{startTime: 0, duration: 24}"
        :index="0"
        :show-controls="false"
      />
    </div>
  </section>
</template>

<script>
  import SimTimeBlock from './TimeBlock'

  export default {
    components: {
      SimTimeBlock,
    },
    props: {
      events: Array,
      pendingEvent: Boolean,
      showTimeBlockControls: Boolean,
      thereAreNoFilteredResultsForThisDay: Boolean,
      thereIsDataForThisDay: Boolean,
      thereIsNoDataForThisDay: Boolean,
      filteredSegments: Array,
      filteredBlockSettings: Object,
    },
    methods: {
      removePendingBlock() {
        this.$emit('removePendingBlock')
      },
      aggregateTimeBlockClicked(block) {
        this.$emit('removePendingBlock', block)
      },
    },
  }
</script>
