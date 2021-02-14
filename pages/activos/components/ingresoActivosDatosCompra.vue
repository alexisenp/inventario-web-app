<template>
  <div>
    <v-card>
      <v-card class="py-md-4 mx-lg-auto">
        <v-card-text>
          <form>
            <p class="title">
              Proveedor
            </p>
            <v-row align="center" class="mx-4">
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
            <v-row align="center" class="mx-4">
              <v-col class="d-flex" cols="12" sm="3">
                <v-text-field
                  v-model="factura"
                  :error-messages="facturaErrors"
                  label="Factura"
                  required
                  @input="$v.factura.$touch()"
                  @blur="$v.factura.$touch()"
                />
              </v-col>
              <v-col class="d-flex" cols="12" sm="3">
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
                      v-model="computedDateFormatted"
                      label="Fecha factura"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="date"
                    locale="es-es"
                    @input="menu2 = false"
                  />
                </v-menu>
              </v-col>
              <v-col class="d-flex" cols="12" sm="3">
                <v-text-field
                  v-model="ordencompra"
                  :error-messages="ordencompraErrors"
                  label="Orden de Compra"
                  required
                  @input="$v.ordencompra.$touch()"
                  @blur="$v.ordencompra.$touch()"
                />
              </v-col>

              <v-col class="d-flex" cols="12" sm="3">
                <v-text-field
                  v-model="totalFactura"
                  :error-messages="totalFacturaErrors"
                  label="Total"
                  required
                  @input="$v.totalFactura.$touch()"
                  @blur="$v.totalFactura.$touch()"
                />
              </v-col>
            </v-row>
          </form>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card-actions class="justify-space-around mt-3">
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
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    nombreempresa: { required, minLength: minLength(10) },
    rut: { required, minLength: minLength(10) },
    ordencompra: { required },
    factura: { required },
    totalFactura: { required }
    // fechafactura: { required }
  },
  data: () => ({
    nombreempresa: 'NOMBRE EMPRESA DE PRUEBA',
    rut: '78541214-5',
    ordencompra: '23',
    factura: '2323',
    totalFactura: '1452100',
    // fechafactura: '',
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false
  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
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
      !this.$v.rut.required && errors.push('Ingrese el rut de la empresa.')
      return errors
    },
    ordencompraErrors () {
      const errors = []
      if (!this.$v.ordencompra.$dirty) { return errors }
      !this.$v.ordencompra.required && errors.push('Ingrese el nro de la Orden de compra')
      return errors
    },
    facturaErrors () {
      const errors = []
      if (!this.$v.factura.$dirty) { return errors }
      !this.$v.factura.required && errors.push('Ingrese el nro de la factura.')
      return errors
    },
    totalFacturaErrors () {
      const errors = []
      if (!this.$v.totalFactura.$dirty) { return errors }
      !this.$v.totalFactura.required && errors.push('Ingrese el total de la factura.')
      return errors
    }
    /*,
    fechafacturaErrors () {
      const errors = []
      if (!this.$v.fechafactura.$dirty) { return errors }
      !this.$v.fechafactura.required && errors.push('La Fecha de la Factura es obligatoria.')
      return errors
    } */
  },
  methods: {
    continuar () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const datefact = this.computedDateFormatted
        const datosCompra = { nombreE: this.nombreempresa, rutE: this.rut, oc: this.ordencompra, fact: this.factura, ffact: datefact, total: this.totalFactura }
        this.$emit('avanza-stepper', datosCompra)
      }
    },
    formatDate (date) {
      if (!date) { return null }
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }
  }
}
</script>
