<template>
  <v-card>
    <div class="title ma-5">
      Activos {{ tipoActivos }}
    </div>
    <v-card-text>
      <v-row class="mt-5">
        <v-col>
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
    <cmp-loading-overlay />
    <cmp-normal-dialog ref="myAlert" />
  </v-card>
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
  props: {
    isAlta: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    activos: [],
    valorABuscar: '',
    btnDisabled: true
  }),
  computed: {
    tipoActivos () {
      return this.isAlta ? 'Alta' : 'Baja'
    }
  },
  methods: {
    clean () {
      this.activos = []
      this.valorABuscar = ''
      this.btnDisabled = true
    },
    deleteItem (payload) {
      this.activos = this.activos.filter(function (valor) { return valor.inventario !== payload.inventario })
      if (this.activos.length === 0) {
        this.btnDisabled = true
      }
    },
    buscarActivo () {
      if (this.valorABuscar === '') {
        this.$refs.myAlert.open('Campo vacío', 'Debe ingresar un valor a buscar.')
      } else if (this.activos.filter((valor) => { return valor.inventario === this.valorABuscar }).length === 0) {
        this.$store.dispatch('buscarActivo', this.valorABuscar)
          .then((activo) => {
            if (activo != null) {
              if (this.isAlta) {
                this.esAlta(activo)
              } else {
                this.esBaja(activo)
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
    },
    esAlta (activo) {
      if (activo.fichaalta != null) {
        this.$refs.myAlert.open('Activo con alta', 'El activo indicado ya tiene alta en el sistema.')
      } else {
        this.valorABuscar = ''
        this.activos.push(activo)
        this.$emit('set-activos', this.activos)
        this.btnDisabled = false
      }
    },
    esBaja (activo) {
      if (activo.baja != null) {
        this.$refs.myAlert.open('Activo con baja', 'El activo indicado ya fue dado de baja en el sistema.')
      } else if (activo.asignadoa != null) {
        this.$refs.myAlert.open('Activo asignado', 'El activo indicado esta asignado a un funcionario, lo debe quitar del funcionario antes de darlo de baja.')
      } else if (activo.fichaalta == null) {
        this.$refs.myAlert.open('Activo sin alta', 'El activo indicado no se ha dado de alta en el sistema.')
      } else {
        this.valorABuscar = ''
        this.activos.push(activo)
        this.$emit('set-activos', this.activos)
        this.btnDisabled = false
      }
    }
  }
}
</script>
