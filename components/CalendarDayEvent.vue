<template>
  <CalendarDay
    @toggleExpandedWeek="$emit('toggleExpandedWeek')"
    :showExpandedWeek="showExpandedWeek"
    :day="day"
  >
    <TimeLines
      v-if="showTimelines"
      slot="timelines"
      class="sim-calendar--grid--day--timelines"
      :showHalfHourTicks="false"
    />
    <div class="local--day--blocks local--day--event-blocks"></div>
    <div class="local--day--blocks local--day--pending-blocks">
      <TimeBlockPendingEvent
        v-if="pendingEvent"
        ref="pendingEvent"
        :block="pendingEvent"
        @click.native.stop="openBubble"
        @updatePosition="updateBlockPosition"
        @updateTimeBlock="updatePendingEvent"
        @clearPendingEvent="$emit('clearPendingEvent')"
      />
    </div>
    <div class="local--day--blocks local--day--aggregate-blocks"
       @click="expandWeek"
     >
      <template v-if="availabilities.length">
        <div v-for="(block, index) in availabilities">
          <TimeBlockSpecificAvailability
            v-if="hasOnlySpecificInstructors(block)"
            :key="index"
            :block="block"
            @click.native="creatependingevent(block, day)"
          />
          <TimeBlockAggregateAvailability
            v-else
            :key="index"
            :block="block"
            @click.native="createPendingEvent(block, day)"
          />
        </div>
      </template>
      <template v-else><TimeBlockNull /></template>
    </div>
  </CalendarDay>
</template>

<script>
  import CalendarDay from './CalendarDay'
  import TimeLines from './TimeLines'
  import TimeBlockAggregateAvailability from './TimeBlockAggregateAvailability'
  import TimeBlockSpecificAvailability from './TimeBlockSpecificAvailability'
  import TimeBlockPendingEvent from './TimeBlockPendingEvent'
  import TimeBlockNull from './TimeBlockNull'

  export default {
    components: {
      CalendarDay,
      TimeLines,
      TimeBlockAggregateAvailability,
      TimeBlockSpecificAvailability,
      TimeBlockPendingEvent,
      TimeBlockNull,
    },
    extends: CalendarDay,
    props: {
      day: Object,
      availabilities: Array,
      showExpandedWeek: Boolean,
      pendingEvent: Object,
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      isSelected() {
        return this.dateService.selectedDate.isSame(this.day, 'day')
      },
      showTimelines() {
        return this.isSelected && this.showExpandedWeek
      },
    },
    methods: {
      createPendingEvent(block, day) {
        block.day = day
        this.$emit('createPendingEvent', block)
      },
      updateBlockPosition() {
        this.$emit('updateBlockPosition', {
          domPosition: this.$refs.pendingEvent.$el.getBoundingClientRect(),
          offset: {
            x: 0,
            y: 0,
          },
        })
      },
      updatePendingEvent(block) {
        this.$emit('updatePendingEvent', block)
      },
      openBubble() {
        this.$store.dispatch('services/bubble/setOpen', true)
        this.updateBlockPosition()
      },
      hasOnlySpecificInstructors(block){
          return block.specificInstructors.length
          && !block.generalInstructors.length
      }
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar-day';
</style>
