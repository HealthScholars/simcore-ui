<template>
  <div class="sim-slide sim-slide--with-a-header">
    <h1>{{data.id}}</h1>
    <div class="sim-slide--content">
      {{data.content}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
  },
}
</script>
