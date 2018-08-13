<template>
  <section>
    <h3>{{ this.title }}</h3>
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
    h3 {
      margin: 0.75em 0 0.2em 0;
      font-size: 0.9em;
      color: #a5a5a5;
    }

    ul {
      margin: 0;

      li {
        margin: 0;
        padding: 0;
      }
    }
  }
</style>
