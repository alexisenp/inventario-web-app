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
          to="/funcionarios/"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-5">
          <v-card-title class="headline">
            Detalle Funcionario
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>Nombre</v-col>
              <v-col>{{ funcionario.nombre }}</v-col>
            </v-row>
            <v-row>
              <v-col>E-mail</v-col>
              <v-col>{{ funcionario.email }}</v-col>
            </v-row>
            <v-row>
              <v-col>Rut</v-col>
              <v-col>{{ funcionario.rut }}</v-col>
            </v-row>
            <v-row>
              <v-col>Departamento</v-col>
              <v-col>{{ funcionario.departamento }}</v-col>
            </v-row>
            <v-row>
              <v-col>Sección</v-col>
              <v-col>{{ funcionario.seccion }}</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col sm="8">
        <cmp-activos />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cmpActivos from '@/pages/funcionarios/components/activosFuncionario'
export default {
  components: {
    cmpActivos
  },
  computed: {
    ...mapGetters({
      funcionario: 'getFuncionarioSeleccionado'
    })
  }
}
</script>
