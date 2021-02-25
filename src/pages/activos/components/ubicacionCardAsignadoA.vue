<template>
  <v-card v-if="idFuncionario != ''" key="1" class="pa-5">
    <v-card-title class="headline d-flex justify-space-between">
      <div>Activo asignado a:</div>
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
    <v-card-actions>
      <v-btn
        color="primary"
        @click="muestraFuncionario(funcionario)"
      >
        Ver funcionario
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    idFuncionario: {
      type: String,
      default: ''
    }
  },
  fetch () {
    if (this.idFuncionario !== '') {
      this.$store.dispatch('cargaDatosFuncionario', this.idFuncionario)
        .then((funcionario) => {
          this.funcionario = funcionario
        // alert('Datos rescatados correctamente')
        })
        .catch((error) => {
          this.$refs.myAlert.open('Error', 'Error al rescatar los datos \n' + error)
        })
    }
  },
  data: () => {
    return {
      funcionario: {}
    }
  },
  methods: {
    muestraFuncionario (funcionario) {
      this.$store.dispatch('actionSetFuncionarioSeleccionado', funcionario)
      this.$router.push('/funcionarios/funcionario')
    }
  }
}
</script>
