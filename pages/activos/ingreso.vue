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
              <cmp-datos-compra @avanza-stepper="avanzaStepperDatosCompra" />
            </v-stepper-content>

            <v-stepper-content step="2">
              <cmp-datos-activo @retrocede-stepper="retrocedeStepper" @avanza-stepper="avanzaStepperDatosActivo" />
            </v-stepper-content>

            <v-stepper-content step="3">
              <cmp-datos-ubicacion @retrocede-stepper="retrocedeStepper" @graba-datos="grabaDatos" />
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
    ],
    datosCompra: {},
    activos: []
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
      'grabaDatosCompra',
      'grabaActivo'
    ]),
    avanzaStepperDatosCompra (compra) {
      this.datosCompra = compra
      this.e1 += 1
    },
    avanzaStepperDatosActivo (activos) {
      this.activos = activos
      this.e1 += 1
    },
    retrocedeStepper () {
      // validar que se haya ingresado al menos un activo antes de continuar
      this.e1 -= 1
    },
    async grabaDatos (ubicacion) {
      await this.$store.dispatch('grabaDatosCompra', { datoscompra: this.datosCompra, activos: this.activos, ubicacion }).then(() => {
        alert('Datos guardados correctamente')
        this.$router.push('/activos')
      }).catch((error) => {
        alert('Ha ocurrido un error, los datos no se han guardado. \n' + error)
      })
    }
  },
  // eslint-disable-next-line
  components: {
    CmpDatosCompra,
    CmpDatosActivo,
    CmpDatosUbicacion
  }
}
</script>
