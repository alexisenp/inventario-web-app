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
        <transition name="flip">
          <v-card v-if="!edit" key="1" class="pa-5">
            <v-card-title class="headline d-flex justify-space-between">
              <div>Detalle Funcionario</div>
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
          <v-card v-else key="2" class="pa-5">
            <cmp-form-ingreso-datos :funcionario="funcionario" :is-edit="true" @cancelar="cancelar" @graba-datos="grabaDatos" />
          </v-card>
        </transition>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col sm="8">
        <cmp-activos />
      </v-col>
    </v-row>
    <cmp-loading-overlay />
    <cmp-normal-dialog ref="myAlert" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cmpActivos from '@/pages/funcionarios/components/activosFuncionario'
import cmpFormIngresoDatos from '@/pages/funcionarios/components/formIngresoDatos'
import cmpLoadingOverlay from '@/components/loadingOverlay'
import cmpNormalDialog from '@/components/normalDialog'

export default {
  components: {
    cmpActivos,
    cmpFormIngresoDatos,
    cmpNormalDialog,
    cmpLoadingOverlay
  },
  data: () => ({
    edit: false,
    funcionarioEdit: {}
  }),
  computed: {
    ...mapGetters({
      funcionario: 'getFuncionarioSeleccionado'
    })
  },
  methods: {
    cancelar () {
      this.edit = false
    },
    grabaDatos (valueFuncionario) {
      this.$store.dispatch('grabaEdicionFuncionario', valueFuncionario)
        .then(() => {
          this.$refs.myAlert.open('Confirmacion', 'Datos guardados correctamente')
          this.$store.dispatch('actionSetFuncionarioSeleccionado', valueFuncionario)
          this.edit = false
        })
        .catch(() => {
          alert()
          this.$refs.myAlert.open('ERROR', 'Ha ocurrido un error al grabar los datos')
        })
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
