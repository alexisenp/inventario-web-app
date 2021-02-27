<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="8" class="headline">
        Fichas de baja
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="8">
        <v-btn
          class="mx-2"
          fab
          dark
          large
          color="primary"
          to="/bajas/ingreso"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="9" md="9">
        <v-card>
          <v-card-text>
            <cmp-table-bajas />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import cmpTableBajas from '@/pages/bajas/components/tableBajas'
export default {
  components: {
    cmpTableBajas
  }
}
</script>
