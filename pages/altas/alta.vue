<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-5">
          <v-card-title class="headline">
            Ficha Alta
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
  computed: {
    ...mapGetters({
      alta: 'getAltaSeleccionada'
    })
  }
}
</script>
