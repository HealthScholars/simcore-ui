<template>
  <div class="sim-datalist">
    <header>
      <slot name="header" />
    </header>
    <transition-group v-if="animate"
      name="sim-datalist"
      tag="ul"
      mode="out-in"
    >
      <slot name="static-before" />
      <slot v-for="(item, index) in items"
        name="item"
        :item="item"
        :index="index"
      />
      <slot name="static-after" />
    </transition-group>
    <ul v-else>
      <slot name="static-before" />
      <slot v-for="(item, index) in items"
        name="item"
        :item="item"
        :index="index"
      />
      <slot name="static-after" />
    </ul>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array,
      animate: Boolean,
    },
  }
</script>

<style lang="scss">
.sim-datalist {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    transition: all var(--ms, var(--default-ms)) cubic-bezier(1, .02, 0, 1.05), background 0ms;
    transition-delay: calc(var(--delay, 0) * 5ms); // placeholder for inline --delay
  }
  header:empty,
  footer:empty {
    padding: 0 !important;
  }
  // transitions
  &-enter,
  &-leave-to {
    opacity: 0;
    font-size: 0;
    transform: translateY(2em);
  }
  &-enter-active,
  &-leave-active {
    position: relative;
  }
}

// opinions
.sim-datalist {
  li {
    padding: .5em;
    &:hover {
      background: var(--datalist-item-highlight, var(--shade));
    }
    + li {
      border-top: 1px solid var(--datalist-border-color, var(--edge));
    }
    &:first-of-type {
      border-radius: .2em .2em 0 0;
    }
    &:last-of-type {
      border-radius: 0 0 .2em .2em;
    }
    &:only-of-type {
      border-radius: .2em;
    }
  }
  + .sim-datalist {
    margin-top: 2em;
  }
}
</style>
