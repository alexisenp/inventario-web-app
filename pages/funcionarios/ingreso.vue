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
          to="/funcionarios/"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="8" class="headline">
          Nuevo funcionario
        </v-col>
      </v-row>
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
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import cmpFormIngresoDatos from '@/pages/funcionarios/components/formIngresoDatos'

export default {
  components: {
    cmpFormIngresoDatos
  },
  methods: {
    ...mapActions([
      'grabaFuncionario'
    ]),
    async grabaDatos (valorFuncionario) {
      if (await this.grabaFuncionario(
        { nombre: valorFuncionario.nombre, apellido: valorFuncionario.apellido, rut: valorFuncionario.rut, email: valorFuncionario.email, departamento: valorFuncionario.departamento, seccion: valorFuncionario.seccion })) {
        this.$router.push('/funcionarios')
      }
    },
    cancelar () {
      this.$router.push('/funcionarios')
    }
  }
}
</script>
