<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Nuevo funcionario
        </v-card-title>
        <v-card-text>
          <form>
            <v-text-field
              v-model="nombre"
              :error-messages="nombreErrors"
              label="Nombre"
              required
              @input="$v.nombre.$touch()"
              @blur="$v.nombre.$touch()"
            />
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            />
            <v-select
              v-model="select"
              :items="items"
              :error-messages="selectErrors"
              label="Departamento"
              required
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
            />

            <v-btn
              class="mr-4"
              @click="submit"
            >
              Enviar
            </v-btn>
            <v-btn @click="clear">
              Limpiar
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
  </v-row>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  mixins: [validationMixin],

  validations: {
    nombre: { required, minLength: minLength(10) },
    email: { required, email },
    select: { required }
  },

  data: () => ({
    nombre: '',
    email: '',
    select: null,
    items: [
      'Administración y Finanzas',
      'Jurídico',
      'Técnico',
      'Dirección'
    ],
    loading: false
  }),

  computed: {
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
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) { return errors }
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },

  methods: {
    ...mapActions([
      'grabaFuncionario'
    ]),
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = !this.loading
        setTimeout(() => {
          this.grabaFuncionario(
            { nombre: this.nombre, email: this.email, departamento: this.select })
          this.loading = !this.loading
          this.$router.push('/funcionarios')
        }, 2000)
      }
    },
    clear () {
      this.$v.$reset()
      this.nombre = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    }
  }
}
</script>
