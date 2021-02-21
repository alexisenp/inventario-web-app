<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="dialog = false"
          >
            Imprimir
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card
        class="mx-16 mt-10 pa-10"
      >
        <v-row>
          <v-col>
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="200"
              max-width="200"
              src="/logoServiu.png"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col justify="center" align="center">
            FICHA DE INVENTARIO
          </v-col>
        </v-row>
        <v-row class="mt-n7">
          <v-col justify="center" align="center">
            MINISTERIO DE VIVIENDA Y URBANISMO SERVIU IV REGION DE COQUIMBO
          </v-col>
        </v-row>

        <v-row class="mt-n7">
          <v-col justify="right" align="right">
            La Serena, {{ $moment().format('LL') }}
          </v-col>
        </v-row>

        <v-row class="mt-7 my-border">
          <v-col>
            <v-row>
              <v-col sm="2">
                UBICACION
              </v-col>
              <v-col sm="10">
                {{ funcionario.seccion }}
              </v-col>
            </v-row>
            <v-row class="mt-n6">
              <v-col sm="2">
                RESPONSABLE
              </v-col>
              <v-col sm="10">
                {{ funcionario.nombre }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <cmp-ficha-inventario-table :activos="activos" class="mt-7" />
        <v-row class="mb-16">
          <v-col>Está estrictamente prohibido realizar movimientos de las especies sin la debida autorización del encargado de inventario y del jefe del Departamento Administración y Finanzas.</v-col>
        </v-row>

        <div class="d-flex flex-row justify-space-around mt-16">
          <div class="borde-superior">
            JEFE DPTO. ADM. Y FINANZAS <br> JORGE CHANAMPA DESSI
          </div>
          <div class="borde-superior">
            ENCARGADO INVENTARIO <br> LUIS ZAPATA.
          </div>
          <div class="borde-superior">
            RECEPCION FUNCIONARIO.
          </div>
        </div>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import cmpFichaInventarioTable from '@/pages/activos/components/fichaInventarioTable'

export default {
  components: {
    cmpFichaInventarioTable
  },
  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      funcionario: {},
      activos: []
    }
  },
  computed: {
    fecha () {
      const fecha = Date()
      return fecha.getDate + '/' + fecha.getMonth + '/' + fecha.getFullYear
    }
  },
  methods: {
    open (funcionario) {
      this.dialog = true
      this.funcionario = funcionario
      this.cargaDatosActivos(funcionario.activos)
    },
    cargaDatosActivos (ArrayidActivos) {
      this.$store.dispatch('cargaActivosFichaInventario', ArrayidActivos)
        .then((arrayActivos) => {
          this.activos = arrayActivos
        })
        .catch((error) => {
          alert('Ha ocurrido un error \n' + error)
        })
    }
  }
}
</script>

<style scoped>
.my-border {
  border: 2px solid black;
}
.borde-superior {
    border-top: 2px solid black !important;
}
</style>
