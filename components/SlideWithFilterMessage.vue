<template lang="html">
  <div class="sim-slide sim-slide--with-filter-message">

    <SimSlideHeader :title="slide.title" subtitle="" />
    <SimSlideIntro :content="slide.intro" />

    <div class="sim-slide--content">
      <p>
        There is no availability data here which matches the current filters.
      </p>
      <p>
        Try adjusting the filters.
      </p>
    </div>

  </div>
</template>

<script>
  import SimIconText from './IconText'
  import SimSlideHeader from './SlideHeader'
  import SimSlideIntro from './SlideIntro'

  export default {
    name: 'sim-slide-with-filter-message',
    components: {
      SimIconText,
      SimSlideHeader,
      SimSlideIntro,
    },
    data() {
      return {
        slide: this.$store.getters.currentSlide(),
      }
    },
    mounted() {
      this.$store.watch(this.$store.getters.currentSlide, (currentSlide) => {
        this.$set(this, 'slide', currentSlide)
      })

      // this.bubbleElement = this.$el.closest('.sim-bubble')
      // this.bubbleElement.style.setProperty('--width-factor', this.slide.meta.slideWidthFactor)
    },
    destroyed() {
      // this.bubbleElement.style.removeProperty('--width-factor')
    },
    computed: {
    },
    methods: {
    },
  }
</script>

<style lang="scss">
  // uses: '../styles/slide-presenter';
</style>
