<template>
  <section class="session-listing">
    <header>
      <AutoFinder
        :options="lookups.scenarios"
        :selectedItem="session.scenario"
        :canRemove="false"
        :isFocused="false"
        placeholder="Type to search scenarios"
        @select="update('scenario', ...arguments)"
        @clear="update('scenario', {})"
      />
      <IconText
        v-if="canRemove"
        class="remove"
        @click.native="$emit('remove')"
        icon="fa-trash" icon-type="fa"
      />
    </header>
    <main>
      <ul>
        <li v-for="(section, index) in sections">
          <fieldset>
            <h5>{{section.label}}</h5>
            <AutoFinderList
              :selectedItems="session[section.key]"
              :availableItems="lookups[section.key]"
              @setSelectedList="update(section.key, ...arguments)"
            />
          </fieldset>
        </li>
      </ul>
    </main>
  </section>
</template>

<script>
import IconText from './IconText'
import AutoFinderList from './AutofinderList'
import AutoFinder from './Autofinder'

import { deepClone } from '../utilities/deep-clone'

export default {
  components: {
    IconText,
    AutoFinder,
    AutoFinderList,
  },
  props: {
    session: Object,
    canRemove: Boolean,
    lookups: Object,
  },
  computed: {
    sections() {
      return [{
        label: 'Rooms',
        key: 'rooms',
      }, {
        label: 'Instructors',
        key: 'instructors',
      }, {
        label: 'Learners',
        key: 'learners',
      }]
    },
  },
  methods: {
    update(property, value){
      const session = deepClone(this.session)
      session[property] = value
      this.$emit('update', session)
    },
  },
}
</script>

<style lang="scss">
.session-listing {
  width: 100%;
  background-color: #222;
  header {
    background-color: #666;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .remove > span {
      color: hsl(0, 100%, 100%);
      cursor: pointer;
    }
  }
  main {
    > ul {
      > li, fieldset {
        padding: 0;
      }
    }
    h5 {
      margin-bottom: 0;
    }
  }
}
</style>
