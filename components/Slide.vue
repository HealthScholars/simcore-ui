<template lang="html">
  <div class="sim-slide">

    <header v-if="content.title || content.subtitle" class="sim-slide--header">
      <h2 v-if="content.title" class="sim-slide--title">{{ content.title }}</h2>
      <h4 v-if="content.subtitle" class="sim-slide--subtitle">{{ content.subtitle }}</h4>
    </header>

    <div v-if="content.intro">
      {{ content.intro }}
    </div>

    <!-- {{ content }}
    {{ content.title }} -->

    <template v-if="users">
      <SimDatalist :items="foundUsers" :animate="true">
        <div slot="static-before" key="before">
          <input type="search" v-model="itemSearch" placeholder="find..." />
        </div>
        <li slot="item" slot-scope="props" :key="props.item.id">
          <sim-selection :item="props.item" :disabled="props.item.disabled" :selected-items="selectedItems">
            {{ props.item.lastname }}, {{ props.item.firstname }}
          </sim-selection>
        </li>
      </SimDatalist>
    </template>

    <div v-if="content.content">
      {{ content.content }}
    </div>
  </div>
</template>

<script>
  import SimDatalist from './Datalist'
  import SimSelection from './Selection'

  // @FIXME should be using common.unique(...) | jase
  const unique = (array) => {
    if (array && array.length) {
      const t = {}
      return array.filter((item) => {
        if (Object.prototype.hasOwnProperty.call(t, item)) {
          return false
        }
        return (t[item] = true)
      })
    }
    return []
  }

  // @FIXME should be using common.sortByKey(...) | jase
  const sortByKey = (list, key, direction) => {
    if (list && list.length) {
      const newList = list.sort((a, b) => {
        if (a[key] < b[key]) {
          return -1
        } else if (a[key] > b[key]) {
          return 1
        }
        return 0
      })
      if (direction === 'desc') {
        return newList.reverse()
      }
      return newList
    }
    return []
  }

  // @FIXME should be using common.getListFromIds(...) | jase
  const getListFromIds = (array, source, sortKey) => {
    if (array && array.length) {
      const list = source.filter((item) => unique(array).find((id) => item.id === id))
      if (sortKey) {
        return sortByKey(list, sortKey)
      }
      return list
    }
    return []
  }

  export default {
    name: 'sim-slide',
    components: {
      SimSelection,
      SimDatalist,
    },
    props: ['content'],
    data() {
      return {
        selectedItems: [],
        itemSearch: '',
      }
    },
    computed: {
      slideData() {
        return this.$store.state.slideDeck.slides[this.$store.state.slideDeck.slideHistory.size - 1]
      },
      users() {
        return this.slideData.content.block.user_ids ? getListFromIds(this.slideData.content.block.user_ids, this.$store.state.users.all, 'lastname') : null
      },
      foundUsers() {
        return sortByKey(this.users.filter(item => {
          return `${item.firstname} ${item.lastname}`.toLowerCase().includes(this.itemSearch.toLowerCase().trim())
        }), 'lastname', 'asc')
      },
    },
    methods: {
    },
  }
</script>

<style lang="scss">
  // uses: '../styles/slide-presenter';
</style>
