<template>
  <div class="tag-list-item">
    <p>{{label}}</p>
    <button @click="remove"><span class="fa fa-times"></span></button>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
  },
  methods: {
    remove() {
      this.$emit('remove')
    }
  },
}
</script>

<style lang="scss">
.tag-list-item {
  background-color: hsl(230, 50%, 55%);
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  color: white;
  padding: 0.5rem 1rem;
  box-shadow: 1px 1px 5px #666;
  button {
    background: inherit;
    margin: 0 0 0 1rem;
    padding: 0;
  }
}
</style>
