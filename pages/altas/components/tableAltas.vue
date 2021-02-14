<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="altas"
      class="elevation-1 row-pointer"
      :loading="loading"
      loading-text="Cargando... espere por favor"
      @click:row="clicked"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  fetch () {
    this.$store.dispatch('cargaAltas')
  },
  data () {
    return {
      headers: [
        { text: 'Numero', value: 'numero', sortable: false },
        { text: 'Fecha', value: 'fecha', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters({
      altas: 'getAltas',
      loading: 'getLoading'
    })
  },
  methods: {
    clicked (value) {
      this.$store.dispatch('actionSetAltaSeleccionada', value)
      this.$router.push('/altas/alta')
    }
  }
}
</script>

<style>
.row-pointer>.v-data-table__wrapper>table>tbody>tr :hover {
cursor: pointer;
}
</style>
