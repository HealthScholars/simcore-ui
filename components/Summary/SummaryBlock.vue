<template>
  <div class="summary-block">
    <div class="header">
      <span class="title">{{ this.title }}</span>
      <span class="action">
        <button class="close" @click="this.close">
          <i class="fa fa-minus-circle" aria-hidden="true" :data-id="this.title"></i>
        </button>
      </span>
    </div>

    <div class="body">
      <summary-list v-for="section in this.sections"
        :title="section.title"
        :content="section.content"
      ></summary-list>
    </div>
  </div>
</template>

<script>
import SummaryList from './SummaryList'

export default {
  components: { SummaryList },
  props: [
    'index',
    'title',
    'sections',
    'closeAction',
  ],
  methods: {
    close() {
      this.closeAction(this.index)
    },
  },
}
</script>

<style lang="scss">
  .summary-block {
    border-radius: 0.25em;
    margin: 0.8em 0;

    .header {
      border-radius: 0.25em 0.25em 0 0;
      background-color: #222;
      padding: 0.6em 1em;
      position: relative;

      .title {
        font-size: 1.3em;
        color: #fff;
        letter-spacing: 0.02em;
        font-weight: bold;
      }

      .action {
        right: -8pt;
        top: -8pt;
        position: absolute;
        outline: none;
        display: none;

        button.close {
          display: none;
          background-color: white;
          padding: 0.075rem 0.2rem;
          border-radius: 50%;
          color: indianred !important; // important because of Bootstrap
          opacity: 1; // because of Bootstrap
          font-size: 1.2em;
        }
      }
    }

    .body {
      border-radius: 0 0 0.25em 0.25em;
      background-color: #333;
      padding: 0.5em 1em 1em 1em;
      color: #fff;
    }
  }

  .summary-block:hover {
    box-shadow: 0 0 1px 2px #4A93B9;

    .header {
      .title {
        color: #4A93B9;
      }

      .action {
        display: block;

        button.close {
          display: block;
        }
      }
    }
  }
</style>
