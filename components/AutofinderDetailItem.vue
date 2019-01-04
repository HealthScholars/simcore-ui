<template>
  <div class="autofinder-detail-item">
    <p>{{label}}</p>
    <div class="type">
      <p>{{category}}</p>
      <img :src="iconUrl" :alt="category" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    category: String,
    iconUrl: String,
  },
}
</script>

<style lang="scss">
.autofinder-detail-item {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem;
  width: 100%;
  .type {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 0;
    p {
      font-style: italic;
    }
    img {
      margin: 0 0 0 1rem;
      height: 16px;
      width: 16px;
    }
  }
}
</style>
