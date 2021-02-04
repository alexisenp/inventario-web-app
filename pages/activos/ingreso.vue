<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="8" class="headline my-4">
          Nuevo activo
        </v-col>
      </v-row>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="11" md="11">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
              :complete="e1 > 1"
              step="1"
            >
              Datos de Compra
            </v-stepper-step>
            <v-divider />
            <v-stepper-step
              :complete="e1 > 2"
              step="2"
            >
              Activo
            </v-stepper-step>
            <v-divider />
            <v-stepper-step step="3">
              Ubicación
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <cmp-datos-compra @avanza-a-activo="pasaAE2" />
            </v-stepper-content>

            <v-stepper-content step="2">
              <cmp-datos-activo />
              <v-card-actions class="justify-space-around mt-3">
                <v-btn
                  color="primary"
                  @click="e1 = 1"
                >
                  Volver
                </v-btn>
                <v-btn text>
                  Cancelar
                </v-btn>
                <v-btn
                  color="primary"
                  @click="pasaAE3()"
                >
                  Continuar
                </v-btn>
              </v-card-actions>
            </v-stepper-content>

            <v-stepper-content step="3">
              <cmp-datos-ubicacion />
              <v-card-actions class="justify-space-around">
                <v-btn
                  color="primary"
                  @click="e1 = 2"
                >
                  Volver
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
              </v-card-actions>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import CmpDatosCompra from '@/components/ingresoActivosDatosCompra'
import CmpDatosActivo from '@/components/ingresoActivoDatosActivo'
import CmpDatosUbicacion from '@/components/ingresoActivoDatosUbicacion'

export default {
  mixins: [validationMixin],

  validations: {
    select: { required }
  },
  data: () => ({
    date: null,
    menu: false,
    e1: 1,
    items: [
      'Administración y Finanzas',
      'Jurídico',
      'Técnico',
      'Dirección'
    ]
  }),
  computed: {
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) { return errors }
      !this.$v.select.required && errors.push('Debe seleccionar un campo')
      return errors
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    ...mapActions([
      'grabaFuncionario'
    ]),
    pasaAE3 () {
      // validar que se haya ingresado al menos un activo antes de continuar
      this.e1 = 3
    },
    pasaAE2 () {
      // validar que se haya ingresado al menos un activo antes de continuar
      this.e1 = 2
    },
    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        alert(this.nombreempresa)
        await this.grabaFuncionario(
          { nombreempresa: this.nombreempresa, rut: this.rut, ordencompra: this.ordencompra, factura: this.factura, tipo: this.select })
        this.$router.push('/activos')
      } /* else {
        // eslint-disable-next-line
        console.log('slasdlksd')
      } */
    },
    clear () {
      this.$v.$reset()
      this.nombreempresa = ''
      this.rut = ''
      this.ordencompra = ''
      this.factura = ''
      this.nombreactivo = ''
      this.fechaactivacion = ''
      this.ninventario = ''
      this.nserie = ''
      this.tipo = ''
      this.valor = ''
      this.descripcion = ''
      this.select = null
      this.checkbox = false
    }
  },
  save (date) {
    this.$refs.menu.save(date)
  },
  guardar (dateactivacion) {
    this.$refs.menu.save(dateactivacion)
  },
  // eslint-disable-next-line
  components: {
    CmpDatosCompra,
    CmpDatosActivo,
    CmpDatosUbicacion
  }
}
</script>
