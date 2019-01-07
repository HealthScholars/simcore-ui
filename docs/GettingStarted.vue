<template lang="html">
  <main
    id="main-content"
    class="app-main library library-gui"
    role="main"
    >
    <h1 class="library--page-title">SimCore UI Components</h1>
    <hr />
    <article>
      <p>Component Library for SimCore apps</p>

      <h2>To Use In Your Project</h2>
      <p># in your package.json</p>
      <div class="code-wrap">
      <pre v-highlightjs><code class="html" v-pre>
  "dependencies": {
    "simcore-ui": "git+ssh@github.com:SimCoreTechnology/simcore-ui.git#master"
  }</code></pre>
      </div>
      <h2>Documentation / Work on Library Directly</h2>
      <div class="highlight highlight-source-shell"><pre><span class="pl-c"><span class="pl-c">#</span> install dependencies</span>
      npm install

      <span class="pl-c"><span class="pl-c">#</span> serve with hot reload at localhost:8080</span>
      npm run dev

      <span class="pl-c"><span class="pl-c">#</span> build for production with minification</span>
      npm run build

      <span class="pl-c"><span class="pl-c">#</span> build for production and view the bundle analyzer report</span>
      npm run build --report

      <span class="pl-c"><span class="pl-c">#</span> run unit tests</span>
      npm run unit

      <span class="pl-c"><span class="pl-c">#</span> run e2e tests</span>
      npm run e2e

      <span class="pl-c"><span class="pl-c">#</span> run all tests</span>
      npm <span class="pl-c1">test</span></pre></div>
      <p>For detailed explanation on how things work, checkout the <a href="http://vuejs-templates.github.io/webpack/">guide</a> and <a href="http://vuejs.github.io/vue-loader">docs for vue-loader</a>.</p>

      <p>
        <label><input type="radio" v-model="sortKey" value="index" /> by index</label>
        <label><input type="radio" v-model="sortKey" value="item" /> by alpha</label>
        <input type="search" v-model="search" placeholder="filter..." />
      </p>
      <transition-group tag="ul" name="list" mode="in-out">
        <li v-for="(item, index) in filteredList" :key="index" :style="'--delay:' + index">
          {{index}}. {{item.item}} ({{item.index}})
        </li>
      </transition-group>
      <!-- <div
        v-for="n of randomInt(5, 10)"
        v-once
        class="data-wrap"
        >
        <header>
          testing {{ n }}
        </header>
        <p v-for="n of randomInt(1, 100)">
          {{ n }}
        </p> -->
      </div>
    </article>
    <div class="app-footer">
      <p>&copy; 2014-2018 Health Scholars</p>
    </div>
  </main>
</template>

<script>
import common from './mixins'
import Demobox from './utility/Demobox'

export default {
  name: 'getting-started',
  mixins: [common],
  data() {
    return {
      list: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(' '),
      sortKey: 'index',
      search: '',
    }
  },
  computed: {
    myList() {
      const list = this.list.map((item, index) => ({ index, item }))
      return common.sortByKey(list, this.sortKey)
    },
    filteredList() {
      return this.myList.filter(item => item.item.toLowerCase().includes(this.search.toLowerCase()))
    },
  },
  methods: {
    randomInt: (min, max) => common.getRandomInt(min, max),
  },
}
</script>

<style scoped>
article {
  margin-bottom: 1em;
}
li {
  display: inline-block;
  margin-right: 1ch;
}
p {
  margin: .5em 0;
}
</style>
