<template>
  <div>
    <v-card>
      <v-card class="py-md-4 mx-lg-auto">
        <v-card-text>
          <form>
            <p class="title">
              Proveedor
            </p>
            <v-row align="center">
              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field
                  v-model="nombreempresa"
                  :error-messages="nombreempresaErrors"
                  label="Nombre Empresa"
                  required
                  @input="$v.nombreempresa.$touch()"
                  @blur="$v.nombreempresa.$touch()"
                />
              </v-col>
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
            </v-row>
            <p class="title">
              Datos de compra
            </p>
            <v-row align="center">
              <v-col class="d-flex" cols="12" sm="4">
                <v-text-field
                  v-model="ordencompra"
                  :error-messages="ordencompraErrors"
                  label="Orden de Compra"
                  required
                  @input="$v.ordencompra.$touch()"
                  @blur="$v.ordencompra.$touch()"
                />
              </v-col>
              <v-col class="d-flex" cols="12" sm="4">
                <v-text-field
                  v-model="factura"
                  :error-messages="facturaErrors"
                  label="Factura"
                  required
                  @input="$v.factura.$touch()"
                  @blur="$v.factura.$touch()"
                />
              </v-col>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Fecha factura"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                />
              </v-menu>
            </v-row>
          </form>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card-actions class="justify-space-around mt-3">
      <v-btn text>
        Cancelar
      </v-btn>
      <v-btn
        color="primary"
        @click="continuar()"
      >
        Continuar
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    nombreempresa: { required, minLength: minLength(10) },
    rut: { required, minLength: minLength(10) },
    ordencompra: { required },
    factura: { required },
    fechafactura: { required, email }
  },
  data: () => ({
    nombreempresa: '',
    rut: '',
    ordencompra: '',
    factura: '',
    fechafactura: '',
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false
  }),
  computed: {
    nombreempresaErrors () {
      const errors = []
      if (!this.$v.nombreempresa.$dirty) { return errors }
      !this.$v.nombreempresa.minLength && errors.push('Nombre de la emprea debe ser al menos de 10 caracteres')
      !this.$v.nombreempresa.required && errors.push('El nombre de la empresa es obligatorio.')
      return errors
    },
    rutErrors () {
      const errors = []
      if (!this.$v.rut.$dirty) { return errors }
      !this.$v.rut.minLength && errors.push('El rut debe ser al menos de 10 caracteres')
      !this.$v.rut.required && errors.push('El rut es obligatoria.')
      return errors
    },
    ordencompraErrors () {
      const errors = []
      if (!this.$v.ordencompra.$dirty) { return errors }
      !this.$v.ordencompra.required && errors.push('La Orden de Compra es requerida')
      return errors
    },
    facturaErrors () {
      const errors = []
      if (!this.$v.factura.$dirty) { return errors }
      !this.$v.factura.required && errors.push('La Factura es obligatoria.')
      return errors
    },
    fechafacturaErrors () {
      const errors = []
      if (!this.$v.fechafactura.$dirty) { return errors }
      !this.$v.fechafactura.required && errors.push('La Fecha de la Factura es obligatoria.')
      return errors
    }
  },
  methods: {
    continuar () {
      alert('Falta validar datos')
      this.$emit('avanza-a-activo')
    }
  }
}
</script>
