<template>
  <div class="text-center">
    <v-overlay
      absolute
      z-index="1000"
      :value="loading"
    >
      <v-progress-circular
        indeterminate
        size="64"
        class="mb-4"
      />
      <br>
      Espere un momento ....
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      loading: 'getLoading'
    })
  }
}
</script>
