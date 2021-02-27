<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="funcionarios"
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
    this.$store.dispatch('cargaFuncionarios')
  },
  data () {
    return {
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre'
        },
        { text: 'Apellido', value: 'apellido', sortable: false },
        { text: 'Departamento', value: 'departamento' },
        { text: 'Sección', value: 'seccion' }
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
      this.$router.push('/funcionarios/funcionario')
    }
  }
}
</script>

<style>
.row-pointer>.v-data-table__wrapper>table>tbody>tr :hover {
cursor: pointer;
}
</style>
