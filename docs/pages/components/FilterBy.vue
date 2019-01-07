<template lang="html">
  <article>
    <h2>{{ msg }}</h2>
  <demobox>
    <template slot="intro">
      Normal / Default
    </template>
    <template slot="view">
      <SimFilterBy
        :list="this.dummyData"
        label="Filter List"
        type="departments"
      ></SimFilterBy>
      <SimFilterBy
        :list="this.bigDummyData"
        label="Filter Search"
        type="professional_titles"
      ></SimFilterBy>
    </template>
    <template slot="html">
      <pre v-highlightjs><code class="html">
&lt;!-- Filter List (< 15 items) -->

&lt;div class="sim-filter sim-accordion">
&lt;div class="sim-filter--header sim-accordion--label">Filter List&lt;/div>
&lt;div class="sim-datalist sim-filter--items sim-accordion--items">
  &lt;header>&lt;/header>
  &lt;ul>
    &lt;li class="no-wrap">
      &lt;span class="sim-selection">
        &lt;label class="">
          &lt;input type="checkbox">
          &lt;span>accusamus beatae ad facilis cum similique qui sunt&lt;/span>
        &lt;/label>
      &lt;/span>
    &lt;/li>
  &lt;/ul>
  &lt;footer>&lt;/footer>
&lt;/div>
&lt;/div></code></pre>
    </template>
    <template slot="html">
      <pre v-highlightjs><code class="html">
&lt;!-- Filter Search (>= 15 items)-->

&lt;div class="sim-filter sim-accordion">
&lt;div class="sim-filter--header sim-accordion--label">Filter Search&lt;/div>
&lt;section class="sim-filter--items sim-accordion--items">
  &lt;div class="sim-autocomplete">
    &lt;div class="sim-autocomplete--search">
      &lt;span class="sim-autocomplete--search--icon">
        &lt;span class="sim-icontext sim-icontext__plain">
          &lt;span aria-hidden="true" class="sim-icon fa fa-search">&lt;/span>
        &lt;/span>
      &lt;/span>
      &lt;input class="sim-autocomplete--search--input" placeholder="find..." type="search">
      &lt;span class="sim-autocomplete--search--item-count">5000&lt;/span>
    &lt;/div>
    &lt;div class="sim-autocomplete--items" style="display: none;">
      &lt;ul>
        &lt;li class="highlighted">
          &lt;article class="media">
            &lt;p>
              &lt;strong>accusamus beatae ad facilis cum similique qui sunt&lt;/strong>&lt;br>
            &lt;/p>
          &lt;/article>
        &lt;/li>
      &lt;/ul>
    &lt;/div>
  &lt;/div>
  &lt;div class="sim-datalist">
    &lt;header>&lt;/header>
    &lt;ul>&lt;/ul>
    &lt;footer>&lt;/footer>
  &lt;/div>
&lt;/section>
&lt;/div></code></pre>
    </template>
    <template slot="js">
      <pre><code class="javascript"></code></pre>
    </template>
  </demobox>
  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimFilterBy from '../../../components/FilterBy'

  export default {
    name: 'filter-by-doc',
    components: {
      Demobox,
      SimFilterBy,
    },
    data() {
      return {
        msg: 'FilterBy',
        dummyData: _.take(dummyData(), 14),
        bigDummyData: dummyData(),
      }
    },
    computed: {
    },
  }
</script>
