<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="funcionarios"
      class="elevation-1 row-pointer"
      loading-text="Cargando... espere por favor"
      :search="search"
      @click:row="clicked"
    />
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  fetch () {
    this.$store.dispatch('cargaFuncionarios')
  },
  data () {
    return {
      search: '',
      headers: [
        { text: 'Rut', value: 'rut', sortable: false },
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre'
        },
        { text: 'Apellido', value: 'apellido', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters({
      funcionarios: 'getFuncionarios',
      loading: 'getLoading'
    })
  },
  methods: {
    clicked (value) {
      this.$store.dispatch('actionSetFuncionarioSeleccionado', value)
      this.$emit('cierra-dialogo')
    }
  }
}
</script>

<style>
.row-pointer>.v-data-table__wrapper>table>tbody>tr :hover {
cursor: pointer;
}
</style>
