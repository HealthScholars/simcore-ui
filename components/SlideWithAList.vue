<template>
  <div class="sim-slide sim-slide--with-list">
    <SimSlideHeader :title="slide.title" />
    <SimSlideIntro :content="slide.intro" />

    <div class="sim-slide--content">
      <section class="sim-slide--content--section">
        <header class="text--orange--lighter">
          <SimIconText icon="#icon--event-duration" icon-type="svg" :text="slide.subtitle"></SimIconText>
        </header>
      </section>

      <section v-if="thereAreSpecificItems" class="sim-slide--content--section sim-slide--content--section--specific">
        <header class="text--green">
          <SimIconText icon="#icon--instructors-checked" icon-type="svg" text="Specific Instructors"></SimIconText>
        </header>
        <SimDatalist :items="specificItems" :animate="false">
          <li slot="item" slot-scope="props" :key="props.item.id" :class="`instructor-${props.item.id}`">
            <SimIconText icon="#icon--checkbox--checked" icon-type="svg" :text="`${props.item.id}: ${props.item.lastname}, ${props.item.firstname}`"></SimIconText>
          </li>
        </SimDatalist>
      </section>

      <section v-if="showOtherItems" class="sim-slide--content--section sim-slide--content--section--general">
        <header class="text--blue--lighter">
          <SimIconText icon="#icon--instructors-exist" icon-type="svg" :text="labelForAvailableInstructors"></SimIconText>
        </header>
        <SimDatalist :items="generalItems" :animate="true" style="--selection-color: var(--green)">
          <li slot="static-before" key="static-before" v-if="!thereAreItems">
            <SimIconText icon="#icon--checkbox--warning" icon-type="svg" text="No results found for this time span"></SimIconText>
          </li>
          <li slot="item" slot-scope="props" :key="props.item.id" :class="`instructor-${props.item.id}`">
            <sim-selection
              :item="props.item"
              :item-id="props.item.id"
              :disabled="props.item.disabled"
              @toggle="toggleItemInSelectedItems"
            >
              {{props.item.id}}: {{ props.item.lastname }}, {{ props.item.firstname }}
              <small class="ghost" v-if="props.item.department_id">({{ getItemName(departments, props.item.department_id) }})</small>
            </sim-selection>
          </li>
        </SimDatalist>
      </section>
    </div>
  </div>
</template>

<script>
  import SimDatalist from './Datalist'
  import SimIconText from './IconText'
  import SimSelection from './Selection'
  import SimSlideHeader from './SlideHeader'
  import SimSlideIntro from './SlideIntro'

  export default {
    components: {
      SimDatalist,
      SimIconText,
      SimSelection,
      SimSlideHeader,
      SimSlideIntro,
    },
    data() {
      return {
        selectedItems: [],
      }
    },
    props: {
      slide: Object,
    },
    computed: {
      segmentItems() {
        return []
      },
      specificItems() {
        return this.slide.content.specificItems
      },
      generalItems() {
        return this.slide.content.generalItems
      },
      specificItemCount() {
        return this.specificItems.length
      },
      thereAreSpecificItems() {
        return (this.specificItemCount > 0)
      },
      itemCount() {
        return this.slide.content.generalItems.length
      },
      thereAreItems() {
        return (this.itemCount > 0)
      },
      showOtherItems() {
        return true
      },
      labelForAvailableInstructors() {
        return `Available Instructors: ${this.itemCount}`
      },
    },
    methods: {
      specificItemIcon(itemId) {
        return this.slide.content.specificItems.includes(`${itemId}`) ? '#icon--checkbox--checked' : '#icon--checkbox--warning'
      },
      isItemSelected(itemId) {
        return this.selectedItems
          .find(item => item.id === itemId)
      },
      getDepartmentName(id) {
        const department = this.departments.find((item) => item.id === id)
        return department && department.name
          ? department.name
          : ''
      },
      toggleItemInSelectedItems(itemId, value) {
        let selectedItemsWasUpdated = false

        const itemFound = this.items.find((item) => item.id === itemId)

        if (itemFound) {
          if (value === true) {
            this.selectedItems.push(itemFound)
          } else if (value === false) {
            this.selectedItems.splice(this.selectedItems.indexOf(itemFound), 1)
          }
          selectedItemsWasUpdated = true
        }

        const nextSlide = {}

        if (this.selectedItems.length >= this.minimumItemsNeeded) {
          nextSlide.selectedItems = this.selectedItems
          nextSlide.specificItems = this.specificItems
          nextSlide.title = this.slide.title
          nextSlide.subtitle = this.slide.subtitle
          nextSlide.start_time = this.slide.content.start_time
          nextSlide.end_time = this.slide.content.end_time
          nextSlide.meta = this.slide.meta
          nextSlide.meta.slideWidthFactor = 2
        }

        const currentSlide = this.slide

        currentSlide.content.selectedItems = this.selectedItems

        if (selectedItemsWasUpdated) {
          this.$emit('theSlideHasAnUpdate', {
            currentSlide,
            nextSlide,
            nextControl: { text: 'Next' },
          })
        }
      },
    },
  }
</script>

<style lang="scss">
  // uses: '../styles/slide-presenter';
</style>
