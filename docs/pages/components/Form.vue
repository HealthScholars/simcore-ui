<template>
  <simcore-incrementor
    v-model="number"
  >
  </simcore-incrementor>
</template>

<script>
import SimcoreIncrementor from '../../../components/Form/Incrementor'

export default {
  components: { SimcoreIncrementor },
  data() {
    return {
      number: 2,
    }
  },
}
</script>
