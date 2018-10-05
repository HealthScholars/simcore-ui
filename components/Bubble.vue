<template>
  <transition name="sim-bubble" appear>
    <div :class="`sim-bubble sim-bubble--${position.orientation}`">
      <div class="sim-bubble--content">
        <component
           :is="content.component"
           :properties="content.props"
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

  export default {
    components: {
      IconText,
      EventScheduler,
      EventListing,
    },
    props: {
      content: Object,
      position: Object,
      props: Object,
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
    },
  }
</script>

<style lang="scss">
  @import '../styles/bubble';
</style>
