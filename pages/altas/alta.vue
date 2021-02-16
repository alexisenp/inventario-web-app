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
          to="/altas/"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <transition name="flip">
          <v-card v-if="!edit" key="1" class="pa-5" transition="slide-x-transition">
            <v-card-title class="headline d-flex justify-space-between">
              <div>Ficha Alta</div>
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
                <v-col>Numero</v-col>
                <v-col>{{ alta.numero }}</v-col>
              </v-row>
              <v-row>
                <v-col>Fecha</v-col>
                <v-col>{{ alta.fecha }}</v-col>
              </v-row>
              <v-row>
                <v-col>Firmantes</v-col>
                <v-col>{{ alta.firmantes }}</v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card v-else key="2" class="pa-5">
            <v-card-title class="headline d-flex justify-space-between">
              <div>Editar Ficha Alta</div>
            </v-card-title>
            <v-card-text>
              <v-row class="d-flex align-center">
                <v-col>Numero</v-col>
                <v-col sm="8">
                  <v-text-field v-model="numeroActual" />
                </v-col>
              </v-row>
              <v-row class="d-flex align-center">
                <v-col>Fecha</v-col>
                <v-col sm="8">
                  {{ alta.fecha }}
                </v-col>
              </v-row>
              <v-row class="d-flex align-center">
                <v-col>Firmantes</v-col>
                <v-col sm="8">
                  {{ alta.firmantes }}
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row align="center" justify="space-around" class="mt-4">
                <v-btn
                  @click="edit= false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  class="mr-4"
                  color="primary"
                  @click="saveData"
                >
                  Grabar
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </transition>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col sm="8">
        <cmp-alta />
      </v-col>
    </v-row>
    <cmp-loading-overlay />
    <cmp-normal-dialog ref="myAlert" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cmpAlta from '@/pages/altas/components/activosAlta'
import cmpLoadingOverlay from '@/components/loadingOverlay'
import cmpNormalDialog from '@/components/normalDialog'

export default {
  components: {
    cmpAlta,
    cmpLoadingOverlay,
    cmpNormalDialog
  },
  data () {
    return {
      edit: false,
      numeroFixLater: ''
    }
  },
  computed: {
    ...mapGetters({
      alta: 'getAltaSeleccionada'
    }),
    numeroActual: {
      get () {
        return (this.alta.numero === 'Borrador') ? '' : this.alta.numero
      },
      set (value) {
        this.numeroFixLater = value
      }
    }
  },
  methods: {
    async saveData () {
      const valorNumero = (this.numeroFixLater === '') ? 'Borrador' : this.numeroFixLater
      await this.$store.dispatch('grabaEdicionFichaAlta', { id: this.alta.id, numero: valorNumero })
        .then((value) => {
          this.$refs.myAlert.open('Confirmación', 'Datos guardados correctamente.')
          this.alta.numero = valorNumero
          this.edit = false
        })
        .catch(() => {
          this.$refs.myAlert.open('ERROR', 'Error al guardar los datos.')
        })
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
