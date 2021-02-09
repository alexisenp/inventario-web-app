<template>
  <div>
    <v-data-table
      locale="es"
      :headers="headers"
      :items="activos"
      class="elevation-1 row-pointer"
      :loading="loading"
      loading-text="Cargando... espere por favor"
      no-data-text="No hay datos disponibles"
      @click:row="clicked"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  fetch () {
    this.$store.dispatch('cargaActivos')
  },
  data () {
    return {
      headers: [
        {
          text: 'Activo',
          align: 'start',
          sortable: false,
          value: 'nombre'
        },
        { text: 'Tipo', value: 'tipo', sortable: false },
        { text: 'Descripcion', value: 'desc' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      activos: 'getActivos',
      loading: 'getLoading'
    })
  },
  methods: {
    clicked (value) {
      alert('Activo seleccionado')
      // this.$store.dispatch('actionSetFuncionarioSeleccionado', value)
      // this.$router.push('/funcionarios/funcionario')
    }
  }
}
</script>

<style>
.row-pointer>.v-data-table__wrapper>table>tbody>tr :hover {
cursor: pointer;
}
</style>
