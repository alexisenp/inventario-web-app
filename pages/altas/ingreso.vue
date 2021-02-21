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
          to="/altas/"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="8" md="8" class="headline">
        Nueva alta
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="pa-5">
          <v-card-text>
            <cmp-form-ingreso-datos @cancelar="cancelar" @graba-datos="grabaDatos" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <cmp-ficha-alta ref="fichaAlta" />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import cmpFormIngresoDatos from '@/pages/altas/components/formIngresoDatos'
import cmpFichaAlta from '@/pages/activos/components/fichaAlta'

export default {
  components: {
    cmpFormIngresoDatos,
    cmpFichaAlta
  },
  methods: {
    ...mapActions([
      'grabaFichaAlta'
    ]),
    async grabaDatos (alta) {
      const idsActivos = []
      alta.activos.forEach((activo) => {
        idsActivos.push(activo.id)
      })
      if (await this.grabaFichaAlta(
        { numero: alta.numero, fecha: alta.fecha, firmantes: alta.firmantes, activos: idsActivos })) {
        await this.$refs.fichaAlta.showDialog(alta.activos)
        this.$router.push('/altas')
      }
    },
    cancelar () {
      this.$router.push('/altas')
    }
  }
}
</script>
