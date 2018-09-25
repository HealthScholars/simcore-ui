<template>
  <div class="sim-autofinder sim-autofinder--visible-options">
    <label class="sim-autofinder--search">
      <IconText icon="#icon--checkbox--checked" icon-type="svg" />
      <input type="text" class="sim-autofinder--search--input" :value="instructor.label" />
      <IconText
        class="sim-autofinder--remove-item"
        icon="#icon--control--x" icon-type="svg"
        @click.native="removeSpecificInstructor(instructor.id)"
      />
    </label>
  </div>
</template>

<script>
  import IconText from './IconText'

  export default {
    components: {
      IconText,
    },
    props: {
      instructor: Object,
    },
    methods: {
      removeSpecificInstructor(id) {
        this.$emit('removeSpecificInstructor', id)
      },
    },
  }
</script>
