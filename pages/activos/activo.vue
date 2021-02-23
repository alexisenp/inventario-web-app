<template>
  <div>
    <v-row>
      <v-col>
        <v-btn
          fab
          dark
          large
          color="primary"
          class="ml-8"
          to="/activos"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <transition name="flip">
          <v-card v-if="!edit" key="1" class="pa-5">
            <v-card-title class="headline d-flex justify-space-between">
              <div>Detalle Activo</div>
              <div>
                <v-btn
                  color="primary"
                  fab
                  dark
                  @click="edit = true"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col sm="3">
                  Activo
                </v-col>
                <v-col>{{ activo.nombre }}</v-col>
              </v-row>
              <v-row>
                <v-col sm="3">
                  Serie
                </v-col>
                <v-col>{{ activo.serie }}</v-col>
              </v-row>
              <v-row>
                <v-col sm="3">
                  N° Inventario
                </v-col>
                <v-col>{{ activo.inventario }}</v-col>
              </v-row>
              <v-row>
                <v-col sm="3">
                  Tipo
                </v-col>
                <v-col>{{ activo.tipo }}</v-col>
              </v-row>
              <v-row>
                <v-col sm="3">
                  Valor
                </v-col>
                <v-col>{{ activo.valor }}</v-col>
              </v-row>
              <v-row>
                <v-col sm="3">
                  Descripción
                </v-col>
                <v-col>{{ activo.descripcion }}</v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card v-else key="2" class="pa-5">
            <cmp-form-ingreso-activo ref="formIngreso" :activo="activo" :is-edit="true" @cancela-edicion="cancelaEdicion" @retorna-datos-activo-ingresado="grabaDatos" />
          </v-card>
        </transition>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col sm="8">
        <cmp-ubicacion :id-funcionario="activo.asignadoa" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col sm="8">
        <cmp-datos-compra :id-datos-compra="activo.dc" />
      </v-col>
    </v-row>
    <cmp-loading-overlay />
    <cmp-normal-dialog ref="myAlert" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cmpFormIngresoActivo from '@/pages/activos/components/formIngresoActivo'
import cmpLoadingOverlay from '@/components/loadingOverlay'
import cmpNormalDialog from '@/components/normalDialog'
import cmpUbicacion from '@/pages/activos/components/ubicacion'
import cmpDatosCompra from '@/pages/activos/components/datosCompra'

export default {
  components: {
    cmpFormIngresoActivo,
    cmpNormalDialog,
    cmpLoadingOverlay,
    cmpUbicacion,
    cmpDatosCompra
  },
  data: () => ({
    edit: false
  }),
  computed: {
    ...mapGetters({
      activo: 'getActivoSeleccionado'
    })
  },
  methods: {
    cancelar () {
      this.edit = false
    },
    grabaDatos (activo) {
      this.$store.dispatch('grabaEdicionActivo', activo)
        .then(() => {
          this.$refs.myAlert.open('Confirmacion', 'Datos guardados correctamente')
          this.$store.dispatch('actionSetActivoSeleccionado', activo)
          this.edit = false
        })
        .catch((error) => {
          this.$refs.myAlert.open('ERROR', 'Ha ocurrido un error al grabar los datos' + error)
        })
    },
    cancelaEdicion () {
      this.edit = false
    }
  }
}
</script>

<style>
  .flip-enter-active {
    transition: all 0.4s ease;
  }

  .flip-leave-active {
    display: none;
  }

  .flip-enter, .flip-leave {
    transform: rotateY(180deg);
    opacity: 0;

  }
</style>
