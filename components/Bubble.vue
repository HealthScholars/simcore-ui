<template>
  <transition name="sim-bubble" appear>
    <div :class="`sim-bubble sim-bubble--${position.orientation}`">
      <div class="sim-bubble--content">
        <component
          :is="content.component"
          :properties="content.props"
          @updateEventProperty="updateEventProperty"
          @updateEvent="updateEvent"
          @submitEvent="submitEvent"
          @deleteEvent="deleteEvent"
        />
      </div>
      <IconText
        icon="#icon--control--x"
        icon-type="svg"
        class="sim-bubble--dismiss"
        @click.native="dismiss"
      />
    </div>
  </transition>
</template>

<script>
  import IconText from './IconText'
  import EventScheduler from './EventScheduler'
  import EventListing from './EventListing'
  import { cloneDeep } from 'lodash/fp'

  export default {
    components: {
      IconText,
      EventScheduler,
      EventListing,
    },
    props: {
      content: Object,
      position: Object,
    },
    mounted() {
      this.setBubbleOpen(true)
    },
    destroyed() {
      this.setBubbleOpen(false)
    },
    methods: {
      setBubbleOpen(value) {
        this.$store.dispatch('services/bubble/setOpen', value)
      },
      dismiss() {
        this.$emit('dismiss')
      },
      submitEvent(event) {
        this.$emit('submitEvent', event)
      },
      deleteEvent(event) {
        this.$emit('deleteEvent', event)
      },
      updateEvent(event) {
        this.$emit('updateEvent', event)
      },
      updateEventProperty(event, property, value) {
        this.$emit('updateEventProperty', event, property, value)
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/bubble';
</style>
