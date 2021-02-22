<template>
  <div>
    <v-card>
      <div v-if="activos.length > 0">
        <div v-if="loading">
          Cargando, espere por favor ...
        </div>
        <v-simple-table
          v-else
          @click:row="clicked"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  N° Inventario
                </th>
                <th class="text-left">
                  Nombre Activo
                </th>
                <th class="text-left">
                  Tipo
                </th>
                <th class="text-left">
                  Borrar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in activos"
                :key="index"
              >
                <td>{{ item.inventario }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.tipo }}</td>
                <td>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="deleteItem(item.id)"
                  >
                    <v-icon dark>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <p v-else>
        Alta no tiene activos asignados
      </p>
    </v-card>
    <cmp-normal-dialog ref="myAlert" />
    <cmp-loading-overlay />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cmpNormalDialog from '@/components/normalDialog'
import cmpLoadingOverlay from '@/components/loadingOverlay'

export default {
  components: {
    cmpNormalDialog,
    cmpLoadingOverlay
  },
  fetch () {
    this.$store.dispatch('cargaActivosAlta', this.alta.id)
      .then(() => {
        // alert('Datos rescatados correctamente')
      })
      .catch((error) => {
        this.$refs.myAlert.open('Error', 'Error al rescatar los datos \n' + error)
      })
  },
  data () {
    return {
      search: '',
      btnDisabled: false
    }
  },
  computed: {
    ...mapGetters({
      activos: 'getActivos',
      loading: 'getLoading',
      alta: 'getAltaSeleccionada'
    })
  },
  methods: {
    deleteItem (idItem) {
      this.$store.dispatch('quitaAsignacionActivoAlta', idItem)
        .then(() => {
          this.$refs.myAlert.open('Confirmación', 'Activo quitado.')
          this.$store.dispatch('deleteActivoFromListAlta', idItem)
        })
        .catch((error) => {
          alert('Ha ocurrido un error al quitar el activo. \n' + error)
        })
    },
    updateData () {
      this.$fetch()
      this.btnDisabled = true
      setTimeout(function () { this.btnDisabled = false }, 60000)
    },
    clicked (value) {
      this.$store.dispatch('actionSetFuncionarioSeleccionado', value)
      // eslint-disable-next-line
      console.log('DATOS FUNCIONARIO SELECCIONADO')
      // eslint-disable-next-line
      console.log(value)
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
