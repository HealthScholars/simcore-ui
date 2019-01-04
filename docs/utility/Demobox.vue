<template>
  <div class="demobox" :class="{open: open || toggled}">
    <div class="demobox__intro">
      <slot name="intro"></slot>
    </div>
    <div class="demobox__content">
      <div class="demobox__view demobox--output">
        <slot name="view"></slot>
      </div>
      <div class="demobox__html demobox--output demobox--drawer">
        <slot name="html"></slot>
      </div>
      <div class="demobox__scss demobox--output demobox--drawer">
        <slot name="scss"></slot>
      </div>
      <div class="demobox__js demobox--output demobox--drawer">
        <slot name="js"></slot>
      </div>
    </div>
    <footer class="demobox__handle" @click="toggleDetails" v-if="!open">
      <sim-icontext icon="fa-code" text="details" />
    </footer>
  </div>
</template>

<script>
import SimIcontext from '../../components/IconText'

export default {
  name: 'demobox',
  components: {
    SimIcontext,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      toggled: false,
    }
  },
  methods: {
    toggleDetails() {
      this.toggled = !this.toggled
    },
  },
}
</script>
