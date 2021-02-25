<template>
  <div>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          Asignar activo
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar
            color="primary"
            dark
          >
            Asignar activo a funcionario
          </v-toolbar>
          <v-card-text>
            <v-row class="mt-5">
              <v-col sm="6">
                <v-text-field
                  v-model="valorABuscar"
                  label="N° Inventario"
                  outlined
                  dense
                />
              </v-col>
              <v-btn
                class="mx-3"
                fab
                dark
                color="primary"
                @click="buscarActivo"
              >
                <v-icon dark>
                  mdi-account-search
                </v-icon>
              </v-btn>
              <v-btn
                class="mx-4"
                fab
                dark
                color="primary"
              >
                <v-icon>
                  mdi-format-list-bulleted
                </v-icon>
              </v-btn>
              <v-col />
            </v-row>
            <v-row>
              <v-col>
                <cmp-listado-activos v-if="activos.length > 0" :activos="activos" @delete-item="deleteItem" />
                <div v-else>
                  No ha ingresado datos
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              color="primary"
              :disabled="btnDisabled"
              @click="grabar"
            >
              Grabar
            </v-btn>
            <v-btn
              text
              @click="dialog.value = false"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <cmp-loading-overlay />
    <cmp-normal-dialog ref="myAlert" />
  </div>
</template>

<script>
import cmpLoadingOverlay from '@/components/loadingOverlay'
import cmpNormalDialog from '@/components/normalDialog'
import cmpListadoActivos from '@/components/listadoActivos'

export default {
  components: {
    cmpLoadingOverlay,
    cmpNormalDialog,
    cmpListadoActivos
  },
  data: () => ({
    activos: [],
    dialog: false,
    valorABuscar: '',
    btnDisabled: true
  }),
  methods: {
    clean () {
      this.activos = []
      this.dialog = false
      this.valorABuscar = ''
      this.btnDisabled = true
    },
    grabar () {
      this.dialog = false
      this.$store.dispatch('asignaActivo', this.activos).then(() => {
        this.$refs.myAlert.open('Datos guardados', 'Activo(s) asignado(s) correctamente.')
        this.$store.dispatch('addActivoToList', this.activos)
        this.activos = []
        this.clean()
      })
        .catch((error) => {
          alert('Ha ocurrido un error \n' + error)
        })
    },
    deleteItem (payload) {
      this.activos = this.activos.filter(function (valor) { return valor.inventario !== payload.inventario })
      if (this.activos.length === 0) {
        this.btnDisabled = true
      }
      this.dialog = false
    },
    buscarActivo () {
      if (this.valorABuscar === '') {
        this.$refs.myAlert.open('Campo vacío', 'Debe ingresar un valor a buscar.')
      } else if (this.activos.filter((valor) => { return valor.inventario === this.valorABuscar }).length === 0) {
        this.$store.dispatch('buscarActivo', this.valorABuscar)
          .then((activo) => {
            if (activo != null) {
              if (activo.fichaalta == null) {
                this.$refs.myAlert.open('Activo sin alta', 'El activo indicado no se ha dado de alta en el sistema.')
              } else if (activo.asignadoa != null) {
                this.$refs.myAlert.open('Activo ya asignado', 'El activo indicado ya esta asignado.')
              } else {
                this.valorABuscar = ''
                this.activos.push(activo)
                this.btnDisabled = false
              }
            } else {
              this.$refs.myAlert.open('Activo no encontrado', 'No existe un activo con el numero de inventario ingresado.')
            }
          })
          .catch((error) => {
            alert('Ha ocurrido un error al rescatar los datos \n' + error)
          })
      } else {
        this.$refs.myAlert.open('Activo ya existe', 'Activo ya ingresado.')
      }
    }
  }
}
</script>
