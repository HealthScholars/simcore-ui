<template lang="html">
  <div class="sim-slide sim-slide--with-form">

    <!-- <SimSlideHeader :title="slide.title" /> -->

    <!-- <SimSlideIntro :content="slide.intro" /> -->

    <div class="sim-slide--content">
      <section class="sim-slide--content--section">
        <div class="sim-form--molecule sim-form--molecule--event-title">
          <!-- <div class="sim-form--molecule--label"><label for="event-title">Event Title</label></div> -->
          <div class="sim-form--molecule--field">
            <textarea autofocus class="resize--y" id="event-title" v-model="eventFormData.title" placeholder="Event Title" rows="1" style="font-size: 1.2em"></textarea>
          </div>
        </div>

        <div class="sim-form sim-form--side-by-side">
          <input type="hidden" v-model="eventFormData.user_id" />

          <div class="sim-form--molecule sim-form--molecule--event-duration">
            <div class="sim-form--molecule--label">
              <SimIconText icon="#icon--event-duration" icon-type="svg"></SimIconText>
            </div>
            <div class="sim-form--molecule--field">
              <b>{{ slide.title }}</b><br />
              {{ slide.subtitle }}
            </div>
          </div>

          <div v-if="specificItemsCount" class="sim-form--molecule sim-form--molecule--event-specific-instructors">
            <div class="sim-form--molecule--label">
              <SimIconText icon="#icon--instructors-checked" icon-type="svg" text=""></SimIconText>
            </div>
            <div class="sim-form--molecule--field">
              <input type="hidden" v-model="eventFormData.instructor_ids" />
              <!-- <b>Specific Instructors: {{ specificItemsCount }}</b> -->
              <div v-for="item in specificItems">
                {{ item.lastname }}, {{ item.firstname}} ({{ item.id }})
              </div>
              <!-- <SimDatalist :items="specificItems" :animate="false">
                <li slot="item" slot-scope="props" :key="props.item.id" :class="`instructor-${props.item.id}`">
                  <SimIconText xicon="#icon--checkbox--checked" xicon-type="svg" :text="`${props.item.id}: ${props.item.lastname}, ${props.item.firstname}`"></SimIconText>
                </li>
              </SimDatalist> -->
            </div>
          </div>

          <div v-if="selectedItemsCount" class="sim-form--molecule sim-form--molecule--event-other-instructors">
            <div class="sim-form--molecule--label">
              <SimIconText icon="#icon--instructors-exist" icon-type="svg" text=""></SimIconText>
            </div>
            <div class="sim-form--molecule--field">
              <input type="hidden" v-model="eventFormData.instructor_ids" />
              <div v-for="item in selectedItems">
                {{ item.lastname }}, {{ item.firstname}} ({{ item.id }})
              </div>
              <!-- <b>Selected Instructors: {{ selectedItemsCount }}</b> -->
              <!-- <SimDatalist :items="selectedItems" :animate="false">
                <li slot="item" slot-scope="props" :key="props.item.id" :class="`instructor-${props.item.id}`">
                  <SimIconText xicon="#icon--checkbox--checked" xicon-type="svg" :text="`${props.item.id}: ${props.item.lastname}, ${props.item.firstname}`"></SimIconText>
                </li>
              </SimDatalist> -->
            </div>
          </div>

          <div class="sim-form--molecule sim-form--molecule--event-description">
            <div class="sim-form--molecule--label"><label>Description</label></div>
            <div class="sim-form--molecule--field">
              <div @click="swapper" class="content-swapper--cue">
                <SimIconText icon="#icon--control--add" icon-type="svg"></SimIconText>
              </div>
              <textarea class="resize--y" placeholder="..." v-model="eventFormData.description" rows="2"></textarea>
            </div>
          </div>

          <div class="sim-form--molecule sim-form--molecule--event-facility">
            <div class="sim-form--molecule--label"><label>Facility</label></div>
            <div class="sim-form--molecule--field">
              <select v-model="eventFormData.facility_id">
                <option value="">Select...</option>
                <option v-for="facility in facilities" :value="facility.id">
                  {{facility.name}}
                </option>
              </select>
            </div>
          </div>

          <div class="sim-form--molecule sim-form--molecule--event-department">
            <div class="sim-form--molecule--label"><label>Department</label></div>
            <div class="sim-form--molecule--field">
              <select v-model="eventFormData.department_id">
                <option value="">Select...</option>
                <option v-for="department in departments" :value="department.id">
                  {{department.name}}
                </option>
              </select>
            </div>
          </div>

          <div class="sim-form--molecule sim-form--molecule--event-scenario">
            <div class="sim-form--molecule--label"><label>Scenario</label></div>
            <div class="sim-form--molecule--field">
              <select v-model="eventFormData.scenario_id">
                <option value="">Select...</option>
              </select>
            </div>
          </div>

          <div class="sim-form--molecule sim-form--molecule--event-equipment">
            <div class="sim-form--molecule--label"><label>Equipment</label></div>
            <div class="sim-form--molecule--field">
              TODO: options depend on scenario, and get fetched, and pre-checked?
              <!-- <select v-model="eventFormData.equipent_ids">
              <option>...</option>
            </select> -->
          </div>
        </div>

          <div class="sim-form--molecule sim-form--molecule--event-room">
            <div class="sim-form--molecule--label"><label>Room</label></div>
            <div class="sim-form--molecule--field">
              TODO: fetch for available rooms, based on facility?
              <!-- <select v-model="eventFormData.room_id">
                <option>...</option>
              </select> -->
            </div>
          </div>

          <div class="sim-form--molecule sim-form--molecule--event-learners">
            <div class="sim-form--molecule--label"><label>Learners</label></div>
            <div class="sim-form--molecule--field">
              <input type="hidden" v-model="eventFormData.learner_ids" />
              <SimDatalist :items="activeLearners" :animate="true">
                <li slot="item" slot-scope="props" :key="props.item.seat" :class="`learner-${props.item.id}`">
                  <SimAutofinder placeholder="find learner..."
                                 :tabIndex="props.index"
                                 :item="props.item"
                                 :index="props.index"
                                 :is-alone="false"
                                 :options="inactiveLearners"
                                 @select="addItemToActiveLearnersList"
                                 @clear="clearItemFromActiveLearnersList"
                                 @remove="removeFromActiveLearnersList"
                                 @add-another="addSlotToActiveLearnersList"
                  >
                    <template slot="option" slot-scope="props">
                      {{ props.option.lastname }}, {{ props.option.firstname }}
                    </template>
                  </SimAutofinder>
                </li>
                <li slot="static-after" key="after">
                  <span @click="addSlotToActiveLearnersList">
                    <SimIconText icon="#icon--control--add" icon-type="svg"></SimIconText>
                  </span>
                </li>
              </SimDatalist>
            </div>
          </div>

          <div class="sim-form--molecule sim-form--molecule--event-others">
            <div class="sim-form--molecule--label"><label>Others</label></div>
            <div class="sim-form--molecule--field">
              <input type="hidden" v-model="eventFormData.other_ids" />
              <SimDatalist :items="activeOthers" :animate="true">
                <li slot="item" slot-scope="props" :key="props.item.seat" :class="`other-${props.item.id}`">
                  <SimAutofinder placeholder="find other..."
                                 :tabIndex="props.index"
                                 :item="props.item"
                                 :index="props.index"
                                 :is-alone="false"
                                 :options="inactiveOthers"
                                 @select="addItemToActiveOthersList"
                                 @clear="clearItemFromActiveOthersList"
                                 @remove="removeFromActiveOthersList"
                                 @add-another="addSlotToActiveOthersList"
                  >
                    <template slot="option" slot-scope="props">
                      {{ props.option.lastname }}, {{ props.option.firstname }}
                    </template>
                  </SimAutofinder>
                </li>
                <li slot="static-after" key="after">
                  <span @click="addSlotToActiveOthersList">
                    <SimIconText icon="#icon--control--add" icon-type="svg"></SimIconText>
                  </span>
                </li>
              </SimDatalist>
            </div>
          </div>

          <div class="sim-form--molecule sim-form--molecule--event-attachment">
            <div class="sim-form--molecule--label">PDF</div>
            <div class="sim-form--molecule--field">
              <div @click="swapper" class="content-swapper--cue">
                <SimIconText icon="#icon--control--add" icon-type="svg"></SimIconText>
              </div>
              <div class="sim-form--atomic-group">
                <input @change="onFileChange($event)" type="file" name="attachment" id="attachment" />
                <label for="attachment" class="sim-button sim-button--primary sim-ellipsis">
                  <span>Choose a file...</span>
                </label>
                <span v-if="eventFormData.attachment" class="sim-file-input--cancel sim-button sim-button--cancel" @click="removeFile">
                  <SimIconText icon="fa-times fa-fw"></SimIconText>
                </span>
              </div>
            </div>
          </div>

          <div class="sim-form--molecule sim-form--molecule--event-notes">
            <div class="sim-form--molecule--label"><label>Notes</label></div>
            <div class="sim-form--molecule--field">
              <div @click="swapper" class="content-swapper--cue">
                <SimIconText icon="#icon--control--add" icon-type="svg"></SimIconText>
              </div>
              <textarea class="resize--y" placeholder="..." v-model="eventFormData.notes" rows="5"></textarea>
            </div>
          </div>

        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  import SimSlideHeader from './SlideHeader'
  import SimSlideIntro from './SlideIntro'
  import SimDatalist from './Datalist'
  import SimSelection from './Selection'
  import SimIconText from './IconText'
  import SimAutocomplete from './Autocomplete'
  import SimAutofinder from './Autofinder'

  export default {
    name: 'sim-slide-with-an-event-form',
    components: {
      SimSlideHeader,
      SimSlideIntro,
      SimDatalist,
      SimSelection,
      SimIconText,
      SimAutocomplete,
      SimAutofinder,
    },
    data() {
      return {
        slide: this.$store.getters.currentSlide(),
        allTheThingsAreTrue: false,

        // instructors: [],

        learners: [],
        activeLearners: [],
        inactiveLearners: [],
        selectedLearners: [],
        currentLearnerSeat: 1,

        others: [],
        activeOthers: [],
        inactiveOthers: [],
        selectedOthers: [],
        currentOtherSeat: 1,

        eventFormData: {
          facility_id: '',
          department_id: '',
          scenario_id: '',
          otherr_ids: [],
          instructor_ids: [],
          attachment: null,
        },
        attachedFileName: '',

        departmentLearnerOptions: [],
      }
    },
    created() {
      // this.$store.commit('setInstructors', currentUser.instructors())
      // this.instructors = this.$store.state.user.instructors
      // this.learners = [] // @FIXME this.$store.state.user.learners ?? - Jase/Chad
    },
    mounted() {
      this.$store.watch(this.$store.getters.currentSlide, (currentSlide) => {
        this.$set(this, 'slide', currentSlide)
      })

      this.eventFormData.instructor_ids = this.activeInstructorIds

      this.bubbleElement = this.$el.closest('.sim-bubble')
      if (this.slide.meta && this.slide.meta.slideWidthFactor) {
        this.bubbleElement.style.setProperty('--width-factor', this.slide.meta.slideWidthFactor)
      }

      this.resetInactiveLearners()

      this.$emit('theSlideHasAnUpdate', {
        nextSlide: null,
        nextControl: { text: 'Submit Event' },
      })
    },
    destroyed() {
      this.bubbleElement.style.removeProperty('--width-factor')
    },
    computed: {
      specificItems() {
        return _.sortBy(this.slide.specificItems, ['lastname', 'firstname'])
      },
      specificItemsCount() {
        return this.slide.specificItems.length
      },
      selectedItems() {
        return _.sortBy(this.slide.selectedItems, ['lastname', 'firstname'])
      },
      selectedItemsCount() {
        return this.slide.selectedItems.length
      },
      activeInstructors() {
        return _.sortBy([...this.slide.selectedItems, ...this.slide.specificItems], ['lastname', 'firstname']) || []
      },
      activeInstructorIds() {
        return this.activeInstructors.map((instructor) => instructor.id)
      },
      activeInstructorsCount() {
        return this.activeInstructors.length
      },
      activeLearnersCount() {
        return this.activeLearners.length
      },
      activeOthersCount() {
        return this.activeOthers.length
      },
      currentSelectedDepartment() {
        return this.eventFormData.department_id
      },
    },
    watch: {
      currentSelectedDepartment(value) {
        this.eventFormData.learner_ids = []
        // get learners by department
        this.departmentLearnerOptions = this.learners
          .filter((learner) => learner.department_id === value)
      },
    },
    methods: {
      manageSlideNavigator() {
        let nextSlide = null

        if (this.allTheThingsAreTrue) {
          nextSlide = this.slide
        }

        this.$emit('theSlideHasAnUpdate', {
          nextSlide,
        })
      },

      // autofinder methods -------------------------------
      // Learners
      resetInactiveLearners() {
        this.inactiveLearners = _.sortBy([...this.learners], ['lastname', 'firstname'])
      },

      addSlotToActiveLearnersList() {
        this.activeLearners.push(
          {
            seat: this.currentLearnerSeat,
            firstname: '',
            lastname: '',
          })

        this.currentLearnerSeat += 1
      },

      addItemToActiveLearnersList(item, index) {
        this.activeLearners.splice(index, 1, item)
        this.removeFromInactiveLearnersList(item)
      },
      clearItemFromActiveLearnersList(item) {
        if (this.activeLearners.includes(item)) {
          this.activeLearners.splice(this.activeLearners.indexOf(item), 1, {
            seat: item.seat,
            firstname: '',
            lastname: '',
          })
          this.restoreItemToInactiveLearnersList(item)
        }
      },
      removeFromActiveLearnersList(item) {
        this.activeLearners = this.activeLearners.filter((element) => element.seat !== item.seat)
        if (item.id) {
          this.restoreItemToInactiveLearnersList(item)
        }
      },

      // Others
      addToOtherList(item) {
        const foundItem = this.activeOthers.find((learner) => learner.id === item.id)
        if (!foundItem) {
          this.activeOthers.push(item)
          this.inactiveOthers.splice(this.inactiveOthers.indexOf(item), 1)
          this.toggleItemInSelectedOthers(item.id, true)
          _.sortBy(this.activeOthers, ['lastname', 'firstname'])
          _.sortBy(this.inactiveOthers, ['lastname', 'firstname'])
        } else {
          // lodestar(this.$el, 'lodestar', `.learner-${item.id}`, 'value')
        }
      },
      removeFromActiveOtherList(item) {
        const foundItem = this.activeOthers.find((learner) => learner.id === item.id)
        this.toggleItemInSelectedOthers(item.id, false)
        this.activeOthers.splice(this.activeOthers.indexOf(item), 1)
        this.inactiveOthers.push(foundItem)
        _.sortBy(this.activeOthers, ['lastname', 'firstname'])
        _.sortBy(this.inactiveOthers, ['lastname', 'firstname'])
      },
      toggleItemInSelectedOthers(itemId, value) {
        const foundItem = this.activeOthers.find((item) => item.id === itemId)

        if (foundItem) {
          if (value === true) {
            foundItem.selected = true
            this.selectedOthers.push(foundItem)
          } else if (value === false) {
            this.selectedOthers.splice(this.selectedOthers.indexOf(foundItem), 1)
          }
        }
      },
      resetInactiveOthers() {
        this.inactiveOthers = _.sortBy([...this.learners], ['lastname', 'firstname'])
      },
      clearAllactiveOthers() {
        this.activeOthers.splice(0, this.activeOthers.length)
        this.selectedOthers.splice(0, this.selectedOthers.length)
        this.resetInactiveOthers()
      },
      addSlotToActiveOthersList() {
        this.activeOthers.push(
          {
            seat: this.currentOtherSeat,
            firstname: '',
            lastname: '',
          })

        this.currentOtherSeat += 1
      },

      addItemToActiveOthersList(item, index) {
        this.activeOthers.splice(index, 1, item)
        this.removeFromInactiveOthersList(item)
      },
      clearItemFromActiveOthersList(item) {
        if (this.activeOthers.includes(item)) {
          this.activeOthers.splice(this.activeOthers.indexOf(item), 1, {
            seat: item.seat,
            firstname: '',
            lastname: '',
          })
          this.restoreItemToInactiveOthersList(item)
        }
      },
      removeFromActiveOthersList(item) {
        this.activeOthers = this.activeOthers.filter((element) => element.seat !== item.seat)
        if (item.id) {
          this.restoreItemToInactiveOthersList(item)
        }
      },

      // FORM STUFFS
      onFileChange(event) {
        const input = event.target
        const label = input.nextElementSibling.querySelector('span')

        const files = input.files || event.dataTransfer.files

        if (files && files.length > 0) {
          this.eventFormData.attachment = files[0]
          label.innerHTML = this.eventFormData.attachment.name
        } else {
          this.eventFormData.attachment = null
          label.innerHTML = 'Choose a file...'
        }
      },
      removeFile(event) {
        this.eventFormData.attachment = null
        const trigger = event.target
        const label = trigger.previousElementSibling.querySelector('span')
        label.innerHTML = 'Choose a file...'
      },
      swapper(event) {
        event.target.classList.add('swapperoo')
      },
    },
  }
</script>

<style lang="scss">
  // uses: '../styles/slide-presenter';
  .content-swapper--cue {
    padding: 0 .5em;
    > * {
      pointer-events: none;
    }
    &.swapperoo,
    &:not(.swapperoo) + * {
      display: none;
    }
  }
</style>
