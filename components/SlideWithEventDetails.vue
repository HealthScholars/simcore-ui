<template lang="html">
  <div class="sim-slide sim-slide--with-timepicker">

    <SimSlideHeader :title="title" :subtitle="subtitle" />

    <SimSlideIntro :content="intro" />

    <div class="sim-slide--content">
      event details go here
    </div>
  </div>
</template>

<script>
  import SimSlideHeader from './SlideHeader'
  import SimSlideIntro from './SlideIntro'

  export default {
    name: 'sim-slide-event-details',
    components: {
      SimSlideHeader,
      SimSlideIntro,
    },
    props: ['content'],
    data() {
      return {
        blocks: [],
        start_time: this.content.start_time,
        end_time: this.content.end_time,
        date: this.$store.state.activeDate.date,
        title: this.content.title,
        subtitle: this.content.subtitle,
        intro: this.content.intro,
        items: this.content.items,
      }
    },
    mounted() {
      this.$emit('theSlideHasAnUpdate', {
        nextSlide: null,
      })
    },
    watch: {
      blocks(newBlocks) {
        if (newBlocks !== null) {
          this.nextSlide.title = this.title
          this.nextSlide.start_time = this.start_time
          this.nextSlide.end_time = this.end_time

          const nextSlide = this.nextSlide

          this.$emit('theSlideHasAnUpdate', {
            nextSlide,
          })
        }
      },
    },
  }
</script>

<style lang="scss">
  // uses: '../styles/slide-presenter';
</style>
