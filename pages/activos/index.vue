<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" class="headline">
        Lista de activos
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <v-btn
          class="mx-2"
          fab
          dark
          large
          color="primary"
          to="/activos/ingreso"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="11">
        <v-card>
          <v-card-text>
            <cmp-table-activos />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import cmpTableActivos from '@/pages/activos/components/tableActivos'
export default {
  components: {
    cmpTableActivos
  }
}
</script>
