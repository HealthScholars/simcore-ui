<template lang="html">
  <div class="sim-slide sim-slide--with-timepicker">

    <SimSlideHeader :title="slide.title" :subtitle="slide.subtitle" />

    <SimSlideIntro :content="slide.intro" />

    <div class="sim-slide--content">
        <SimDatalist :items="slide.items" :animate="true">
          <li slot="static-before" key="static-before" class="text--yellow" v-if="!slideItemsCount">
            <SimIconText icon="fa-exclamation-triangle" text="Missing Expected Items"></SimIconText>
          </li>
          <li slot="item" slot-scope="props" :key="props.item.id" :class="`instructor-${props.item.id}`">
            <SimIconText icon="fa-check-circle text--green ghost" :text="`${props.item.firstname} ${props.item.lastname}`"></SimIconText>
          </li>
        </SimDatalist>

        <SimTimePicker orientation="y"
          :time-block-limit="1"
          :time-block-default-duration="initialEventDuration"
          :start-time="slide.start_time"
          :end-time="slide.end_time"
          :initialPendingEventBlocks="blocks"
          :date="date"
          @blocksWereUpdated="updateMeBlox"
          />
      </div>
    </div>
  </div>
</template>

<script>
  import SimDatalist from './Datalist'
  import SimIconText from './IconText'
  import SimSlideHeader from './SlideHeader'
  import SimSlideIntro from './SlideIntro'
  import SimTimePicker from './TimePicker'

  export default {
    name: 'sim-slide-with-a-timepicker',
    components: {
      SimDatalist,
      SimIconText,
      SimSlideHeader,
      SimSlideIntro,
      SimTimePicker,
    },
    data() {
      return {
        blocks: [],
        slide: this.$store.getters.currentSlide(),
        date: this.$store.state.activeDate.date,
        initialEventDuration: 1,
      }
    },
    computed: {
      slideItemsCount() {
        return (this.slide.items ? this.slide.items.length : 0)
      },
    },
    mounted() {
      this.$store.watch(this.$store.getters.currentSlide, (currentSlide) => {
        this.$set(this, 'slide', currentSlide)
      })

      this.initialEventDuration = this.slide.meta.initialEventDuration

      this.$emit('theSlideHasAnUpdate', {
        nextSlide: null,
        nextControl: { text: 'Next' },
      })
    },
    methods: {
      formatTimesForDisplay(/* start, duration */) {
        /*
        const day = dayjs().startOf('day')
        const startTime = day.add(start, 'hours').format('h:mma')
        const endTime = day.add(duration, 'hours').format('h:mma')
        return `${startTime.replace(':00', '')} — ${endTime.replace(':00', '')}`
        */
      },
      formatBlockHoursForDisplay(duration) {
        const output = duration.toString()
          .replace(/\.5/, '½')
          .replace(/^0/, '') || 0

        return `${output} ${(duration > 0 && duration <= 1 ? 'hour' : 'hours')}`
      },
      updateMeBlox(blocx) {
        // console.log('update me', blocx)
        this.blocks = blocx.blocks
        let nextSlide = null

        if (this.blocks.length > 0) {
          nextSlide = this.$store.state.slideDeck.slideTemplates.event_form
          nextSlide.title = this.slide.title
          nextSlide.subtitle = `${this.formatTimesForDisplay(this.blocks[0].start, this.blocks[0].duration)} (${this.formatBlockHoursForDisplay(this.blocks[0].duration)})`
          nextSlide.start_time = this.blocks[0].start
          nextSlide.end_time = this.blocks[0].start + this.blocks[0].duration
          nextSlide.instructors = this.slide.items
          nextSlide.meta = this.slide.meta
          nextSlide.meta.slideWidthFactor = 2
        }

        this.$emit('theSlideHasAnUpdate', {
          nextSlide,
          nextControl: { text: 'Next' },
        })
      },
    },
  }
</script>

<style lang="scss">
  // uses: '../styles/slide-presenter';
  .sim-slide--with-timepicker .sim-datalist {
    border-bottom: 2px dotted var(--grey);
    padding-bottom: 1em;
    margin-bottom: 1em;
  }
</style>
