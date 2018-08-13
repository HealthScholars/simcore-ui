<template>
  <div>
    <button class="mentor" @click="this.decrement">-</button>
    <input class="number" v-model.number="number" type="number" size="3" min="0">
    <button class="mentor" @click="this.increment">+</button>
  </div>
</template>

<script>
export default {
  name: 'simcore-incrementor',
  props: {
    model: String,
    initialValue: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      number: 0,
    }
  },
  created() {
    this.number = this.initialValue
  },
  methods: {
    increment() {
      this.number = this.number + 1
    },
    decrement() {
      if (this.number - this.step >= 0) {
        this.number = this.number - 1
      }
    },
  },
}
</script>

<style lang="scss">
.mentor {
  border: 0;
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
