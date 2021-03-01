<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          fab
          dark
          large
          color="primary"
          class="ml-8"
          to="/bajas/"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="8" md="8" class="headline">
        Nueva baja
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="pa-5">
          <v-card-text>
            <cmp-form-ingreso-datos @cancelar="cancelar" @vista-previa="grabaDatos" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <cmp-ficha-alta ref="fichaAlta" />
  </v-container>
</template>

<script>

import cmpFormIngresoDatos from '@/pages/bajas/components/formIngresoDatos'
import cmpFichaAlta from '@/pages/activos/components/fichaAlta'

export default {
  components: {
    cmpFormIngresoDatos,
    cmpFichaAlta
  },
  methods: {
    async grabaDatos (baja) {
      await this.$refs.fichaAlta.showDialog(baja.activos)
      this.$router.push('/bajas')
    },
    cancelar () {
      this.$router.push('/bajas')
    }
  }
}
</script>
