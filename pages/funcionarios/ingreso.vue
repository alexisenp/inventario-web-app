<template>
  <v-container>
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
            <form>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-text-field
                    v-model="nombre"
                    :error-messages="nombreErrors"
                    label="Nombre"
                    required
                    @input="$v.nombre.$touch()"
                    @blur="$v.nombre.$touch()"
                  />
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-text-field
                    v-model="apellido"
                    :error-messages="apellidoErrors"
                    label="Apellido"
                    required
                    @input="$v.apellido.$touch()"
                    @blur="$v.apellido.$touch()"
                  />
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-text-field
                    v-model="rut"
                    :error-messages="rutErrors"
                    label="Rut"
                    required
                    @input="$v.rut.$touch()"
                    @blur="$v.rut.$touch()"
                  />
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  />
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    v-model="dptoSeleccionado"
                    :items="departamento"
                    label="Departamento"
                    outlined
                    required
                    :error-messages="dptoSeleccionadoErrors"
                    @input="$v.dptoSeleccionado.$touch()"
                    @blur="$v.dptoSeleccionado.$touch()"
                  />
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    v-model="seccionSeleccionada"
                    :items="select2"
                    label="Seccion"
                    outlined
                    required
                    :error-messages="seccionSeleccionadaErrors"
                    @input="$v.seccionSeleccionada.$touch()"
                    @blur="$v.seccionSeleccionada.$touch()"
                  />
                </v-col>
              </v-row>
              <v-row align="center" justify="space-around">
                <v-btn
                  to="/funcionarios"
                >
                  Cancelar
                </v-btn>
                <v-btn @click="clear">
                  Limpiar
                </v-btn>
                <v-btn
                  class="mr-4"
                  @click="submit"
                >
                  Enviar
                </v-btn>
              </v-row>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  mixins: [validationMixin],

  validations: {
    nombre: { required, minLength: minLength(10) },
    apellido: { required, minLength: minLength(10) },
    rut: { required },
    email: { required, email },
    dptoSeleccionado: { required },
    seccionSeleccionada: { required }
  },
  data: () => ({
    nombre: '',
    apellido: '',
    rut: '',
    email: '',
    dptoSeleccionado: null,
    seccionSeleccionada: null,
    // departamento: [{ text: 'Administracion y finanzas', value: 1 }, { text: 'Juridico', value: 2 }, { text: 'Juridico', value: 3 }, { text: 'Tecnico', value: 4 }],
    departamento: ['Administracion y finanzas', 'Juridico', 'Tecnico'],
    secciones: []
  }),

  computed: {
    select2 () {
      let options = []
      switch (this.dptoSeleccionado) {
        case 'Administracion y finanzas':
          options = ['Contabilidad', 'Servicios Generales']
          break
        case 'Juridico':
          options = ['Juridico', 'Prevencion de riesgos']
          break
      }
      return options
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) { return errors }
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nombreErrors () {
      const errors = []
      if (!this.$v.nombre.$dirty) { return errors }
      !this.$v.nombre.minLength && errors.push('Nombre debe ser al menos de 10 caracteres')
      !this.$v.nombre.required && errors.push('El nombre es obligatorio.')
      return errors
    },
    apellidoErrors () {
      const errors = []
      if (!this.$v.apellido.$dirty) { return errors }
      !this.$v.apellido.minLength && errors.push('Apellido debe ser al menos de 10 caracteres')
      !this.$v.apellido.required && errors.push('El apellido es obligatorio.')
      return errors
    },
    rutErrors () {
      const errors = []
      if (!this.$v.rut.$dirty) { return errors }
      !this.$v.rut.required && errors.push('El Rut es obligatorio.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) { return errors }
      !this.$v.email.email && errors.push('Debe ser un e-mail valido')
      !this.$v.email.required && errors.push('E-mail es requerido')
      return errors
    },
    dptoSeleccionadoErrors () {
      const errors = []
      if (!this.$v.dptoSeleccionado.$dirty) { return errors }
      !this.$v.dptoSeleccionado.required && errors.push('Seleccione un departamento, es obligatorio.')
      return errors
    },
    seccionSeleccionadaErrors () {
      const errors = []
      if (!this.$v.seccionSeleccionada.$dirty) { return errors }
      !this.$v.seccionSeleccionada.required && errors.push('Seleccione una seccion, es obligatoria.')
      return errors
    }
  },
  methods: {
    ...mapActions([
      'grabaFuncionario'
    ]),
    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (await this.grabaFuncionario(
          { nombre: this.nombre, apellido: this.apellido, rut: this.rut, email: this.email, departamento: this.dptoSeleccionado, seccion: this.seccionSeleccionada })) {
          this.$router.push('/funcionarios')
        }
      } /* else {
        // eslint-disable-next-line
        console.log('slasdlksd')
      } */
    },
    clear () {
      this.$v.$reset()
      this.apellido = ''
      this.rut = ''
      this.nombre = ''
      this.email = ''
      this.dptoSeleccionado = null
      this.seccionSeleccionada = null
      this.checkbox = false
    }
  }
}
</script>
