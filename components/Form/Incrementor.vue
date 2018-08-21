<template>
  <div>
    <button class="mentor" @click="this.decrement">-</button>
    <input class="number" :value="this.number" @input="change" type="number" size="3" min="0">
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
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      number: 0,
    }
  },
  created() {
    this.number = this.value
  },
  watch: {
    number() {
      this.$emit('input', this.number)
    },
  },
  methods: {
    change(input) {
      this.number = Number(input.target.value)
    },
    increment() {
      this.number = this.number + this.step
    },
    decrement() {
      if (this.number - this.step >= this.minimum) {
        this.number = this.number - this.step
      }
    },
  },
}
</script>

<style lang="scss">
.mentor {
  border: none;
  box-shadow: none;
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
  width: 4rem;
  text-align: center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
