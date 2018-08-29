<template>
  <section>
    <div class="title">{{ this.title }}</div>
    <ul v-if="Array.isArray(this.content)">
      <template v-if="this.content.length > 0">
        <li v-for="item in this.content">
          <template v-if="item.count">{{ item.count }}</template>
          <template v-if="item.label">{{ item.label }}</template>
          <template v-else>{{ item }}</template>
        </li>
      </template>

      <template v-else>
        (none)
      </template>
    </ul>

    <span v-else>
      {{ this.content }}
    </span>
  </section>
</template>

<script>
  export default {
    props: [
      'title',
      'content',
    ],
  }
</script>

<style lang="scss">
  section {
    display: flex;
    padding: 0.1em;
    border-radius: 0.2em;

    .title {
      margin: 0.75em 0 0.2em 0;
      font-size: 0.9em;
      color: #a5a5a5;
    }

    ul {
      margin: 0;
      padding: 0;

      li {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }

    .section-content {
      flex: 1;
    }

    .section-meta {
      flex: none;
    }

    .section:hover {
      background-color: #222;
    }

    .section-content:hover ~ .section-meta .close-section,
    .section-meta:hover .close-section {
      display: block;
    }

    button.close-section {
      display: none;
      background: transparent;
      border: 0;
      border-radius: 50%;
      padding: 0.2em 0.6em;
    }
  }
</style>
