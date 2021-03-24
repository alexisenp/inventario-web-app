<template>
  <form>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="nombre"
          :error-messages="nombreErrors"
          label="Nombres"
          required
          @input="activaBoton($v.nombre)"
          @blur="$v.nombre.$touch()"
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="apellido"
          :error-messages="apellidoErrors"
          label="Apellidos"
          required
          @input="activaBoton($v.apellido)"
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
          @input="activaBoton($v.rut)"
          @blur="$v.rut.$touch()"
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="activaBoton($v.email)"
          @blur="$v.email.$touch()"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="departamento"
          :items="departamentos"
          label="Departamento"
          outlined
          required
          :error-messages="dptoSeleccionadoErrors"
          @input="activaBoton($v.departamento)"
          @blur="$v.departamento.$touch()"
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="seccion"
          :items="secciones"
          label="Seccion"
          outlined
          required
          :error-messages="seccionSeleccionadaErrors"
          @input="activaBoton($v.seccion)"
          @blur="$v.seccion.$touch()"
        />
      </v-col>
    </v-row>
    <v-row align="center" justify="space-around">
      <v-btn
        @click="cancelar"
      >
        Cancelar
      </v-btn>
      <v-btn @click="clear">
        Limpiar
      </v-btn>
      <v-btn
        class="mr-4"
        color="primary"
        :disabled="btnDisabled"
        @click="enviaDatos"
      >
        Grabar
      </v-btn>
    </v-row>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    nombre: { required, minLength: minLength(10) },
    apellido: { required, minLength: minLength(10) },
    rut: { required },
    email: { required, email },
    departamento: { required },
    seccion: { required }
  },
  props: {
    funcionario: {
      type: Object,
      default () {
        return {
          nombre: '',
          apellido: '',
          rut: '',
          email: '',
          departamento: null,
          seccion: null
        }
      }
    },
    isEdit: {
      type: Boolean,
      defaul: false
    }
  },
  data: () => ({
    // DUMMY DATA, tobe fixed later
    departamentos: ['Administración y finanzas', 'Jurídico', 'Técnico', 'Dirección'],
    id: '',
    nombre: '',
    apellido: '',
    rut: '',
    email: '',
    departamento: null,
    seccion: null,
    btnDisabled: true // indicate if GRABAR button is enabled, only is enabled if a value is setted in textformfield form
  }),
  computed: {
    secciones () {
      let options = []
      switch (this.departamento) {
        // Dummy data, to be fixed later
        case 'Administración y finanzas':
          options = ['Contabilidad', 'Servicios Generales', 'Informática']
          break
        case 'Jurídico':
          options = ['Jurídico', 'Prevención de riesgos']
          break
        case 'Dirección':
          options = ['Informática', 'Otro test']
          break
      }
      return options
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
      if (!this.$v.departamento.$dirty) { return errors }
      !this.$v.departamento.required && errors.push('Seleccione un departamento, es obligatorio.')
      return errors
    },
    seccionSeleccionadaErrors () {
      const errors = []
      if (!this.$v.seccion.$dirty) { return errors }
      !this.$v.seccion.required && errors.push('Seleccione una seccion, es obligatoria.')
      return errors
    }
  },
  mounted () {
    this.id = this.funcionario.id
    this.nombre = this.funcionario.nombre
    this.apellido = this.funcionario.apellido
    this.rut = this.funcionario.rut
    this.email = this.funcionario.email
    this.departamento = this.funcionario.departamento
    this.seccion = this.funcionario.seccion
  },
  methods: {
    activaBoton (value) {
      value.$touch()
      this.btnDisabled = false
    },
    clear () {
      this.nombre = ''
      this.apellido = ''
      this.rut = ''
      this.email = ''
      this.departamento = ''
      this.seccion = ''
    },
    enviaDatos () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const funcionario = {
          id: this.id,
          nombre: this.nombre,
          apellido: this.apellido,
          rut: this.rut,
          email: this.email,
          departamento: this.departamento,
          seccion: this.seccion
        }
        this.$emit('graba-datos', funcionario)
      }
    },
    cancelar () {
      this.$emit('cancelar')
    }
  }
}
</script>
