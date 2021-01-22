<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
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
            <v-col>Departamento</v-col>
            <v-col>{{ funcionario.departamento }}</v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      funcionario: 'getFuncionarioSeleccionado'
    })
  }
}
</script>
