<template>
  <v-card>
    <div v-if="activos.length > 0">
      <v-card-title>
        <v-row class="my-n16">
          <v-col align="center">
            <v-btn
              fab
              dark
              small
              color="primary"
              class="my-n5"
              :disabled="btnDisabled"
              @click="updateData"
            >
              <v-icon dark>
                mdi-refresh
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
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
      Funcionario no tiene activos asignados
    </p>
    <cmp-normal-dialog ref="myAlert" />
    <cmp-loading-overlay />
  </v-card>
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
    this.$store.dispatch('cargaActivosFuncionario')
      .then(() => {
        // alert('Datos rescatados correctamente')
      })
      .catch(() => {
        this.$refs.myAlert.open('Error', 'Error al rescatar los datos')
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
      loading: 'getLoading'
    })
  },
  methods: {
    deleteItem (idItem) {
      this.$store.dispatch('actionSetLoading', true)
      this.$store.dispatch('quitaAsignacionActivoFuncionario', idItem)
        .then(() => {
          this.$refs.myAlert.open('Confirmación', 'Activo quitado.')
          this.$store.dispatch('deleteActivoFromList', idItem)
        })
        .catch((error) => {
          alert('Ha ocurrido un error al quitar el activo. \n' + error)
        })
      this.$store.dispatch('actionSetLoading', false)
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
