<template>
  <article class="sim-slide-presenter" :style="`--step: ${currentStep}`">
    <section v-if="slideDeck" class="sim-slide-presenter--slides">
      <component class="sim-slide-presenter--slide"
        v-for="(slide, index) in slides"
        :key="index"
        :slide="slide"
        :is="slide.componentType"
        @theSlideHasAnUpdate="receiveTheUpdateFromTheSlide"
      />
    </section>
    <footer v-if="showNavigationControls">
      <button class="sim-button--cancel back" @click="previousSlide" :disabled="thePreviousControlShouldBeDisabled">Back</button>
      <button class="sim-button--primary next" @click="nextSlide" :disabled="theNextControlShouldBeDisabled">{{nextControl.text}}</button>
    </footer>
  </article>
</template>

<script>
  import SimSlide from './Slide'
  import SimSlideWithAList from './SlideWithAList'
  import SimSlideWithAnEventForm from './SlideWithAnEventForm'
  import SimSlideWithATimePicker from './SlideWithATimePicker'
  import SimSlideWithEventDetails from './SlideWithEventDetails'
  import SimSlideWithFilterMessage from './SlideWithFilterMessage'
  import SimSlideWithHTML from './SlideWithHTML'

  export default {
    components: {
      SimSlide,
      SimSlideWithAList,
      SimSlideWithAnEventForm,
      SimSlideWithATimePicker,
      SimSlideWithEventDetails,
      SimSlideWithFilterMessage,
      SimSlideWithHTML,
    },
    props: {
      slides: Array,
    },
    data() {
      return {
        slideDeck: [],
        nextControl: { slide: null, text: 'Next' },
        theNextControlShouldBeDisabled: this.makeTheNextControlDisabledIf,
        thePreviousControlShouldBeDisabled: this.makeThePreviousControlDisabledIf,
      }
    },
    computed: {
      showNavigationControls() {
        return true
      },
      currentStep() {
        return 0
      },
    },
    methods: {
      makeTheNextControlDisabledIf() {
        let conditionsHaveBeenMet = false

        if (this.slideDeck.slideHistory.size === this.slideDeck.size) {
          conditionsHaveBeenMet = true
        } else if (this.nextControl.slide === null) {
          conditionsHaveBeenMet = true
        }

        this.theNextControlShouldBeDisabled = conditionsHaveBeenMet
      },
      makeThePreviousControlDisabledIf(conditionsAreMet) {
        let conditionsHaveBeenMet = false

        if (conditionsAreMet === null || conditionsAreMet === undefined) {
          if (this.slideDeck.slideHistory.size === 1) {
            conditionsHaveBeenMet = true
          }
        } else {
          conditionsHaveBeenMet = conditionsAreMet
        }

        this.thePreviousControlShouldBeDisabled = conditionsHaveBeenMet
      },
      previousSlide() {
      },
      nextSlide() {
      },
      receiveTheUpdateFromTheSlide(update) {
        if (update.nextSlide || update.nextSlide === null) {
          this.nextControl.slide = update.nextSlide
        }

        if (update.nextControl) {
          this.nextControl.text = update.nextControl.text
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/slide-presenter';
</style>
