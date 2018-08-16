<template>
  <div>
    <button class="mentor" @click="this.decrement">-</button>
    <input class="number" v-model.number="this.number" type="number" size="3" min="0">
    <button class="mentor" @click="this.increment">+</button>
  </div>
</template>

<script>
export default {
  name: 'simcore-incrementor',
  props: {
    step: {
      type: Number,
      default: 1,
    },
    minimum: {
      type: Number,
      default: 0,
    },
    number: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    increment() {
      this.number = this.number + 1
    },
    decrement() {
      if (this.number - this.step >= this.minimum) {
        this.number = this.number - 1
      }
    },
  },
}
</script>

<style lang="scss">
.mentor {
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 1.3em;
  color: #333;
  padding: .25em 0.5em;
  outline: none;

  &:active,
  &:focus {
    box-shadow: none;
  }

  &:active {
    color: #4A93B9;
  }
}

input[type="number"].number {
  display: inline-block;
  width: 3rem;
  text-align: center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
