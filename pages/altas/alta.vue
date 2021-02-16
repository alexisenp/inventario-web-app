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
                  <v-text-field v-model="alta.numero" />
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
            <v-card-action>
              <v-row align="center" justify="space-around" class="mt-4">
                <v-btn
                  @click="edit= false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  class="mr-4"
                  @click="saveData"
                >
                  Grabar
                </v-btn>
              </v-row>
            </v-card-action>
          </v-card>
        </transition>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col sm="8">
        <cmp-alta />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cmpAlta from '@/pages/altas/components/activosAlta'
export default {
  components: {
    cmpAlta
  },
  data () {
    return {
      edit: false
    }
  },
  computed: {
    ...mapGetters({
      alta: 'getAltaSeleccionada'
    })
  },
  methods: {
    saveData () {
      this.$store.dispatch('grabaEdicionFichaAlta', { id: this.alta.id, numero: this.alta.numero })
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
