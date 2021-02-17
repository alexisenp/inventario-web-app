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
      <v-col cols="12" sm="8" md="8" class="headline my-4">
        Nuevo activo
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="11" md="11">
        <v-stepper v-model="e1">
          <v-stepper-header class="px-16">
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
            <!-- <v-divider />
            <v-stepper-step step="3">
              Ubicación
            </v-stepper-step> -->
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <cmp-datos-compra @avanza-stepper="avanzaStepperDatosCompra" />
            </v-stepper-content>

            <v-stepper-content step="2">
              <cmp-datos-activo @retrocede-stepper="retrocedeStepper" @graba-datos="grabaDatos" />
            </v-stepper-content>

            <!-- <v-stepper-content step="3">
              <cmp-datos-ubicacion @retrocede-stepper="retrocedeStepper" @graba-datos="grabaDatos" />
            </v-stepper-content> -->
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    <cmp-confirm-dialog ref="confirm" />
    <cmp-ficha-alta ref="fichaAlta" />
    <cmp-loading-overlay />
    <cmp-normal-dialog ref="myAlert" />
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import CmpDatosCompra from '@/pages/activos/components/ingresoActivosDatosCompra'
import CmpDatosActivo from '@/pages/activos/components/ingresoActivoDatosActivo'
// import CmpDatosUbicacion from '@/pages/activos/components/ingresoActivoDatosUbicacion'
import CmpConfirmDialog from '@/components/confirmDialog'
import cmpFichaAlta from '@/pages/activos/components/fichaAlta'
import cmpLoadingOverlay from '@/components/loadingOverlay'
import cmpNormalDialog from '@/components/normalDialog'

export default {
  components: {
    CmpDatosCompra,
    CmpDatosActivo,
    // CmpDatosUbicacion,
    CmpConfirmDialog,
    cmpFichaAlta,
    cmpLoadingOverlay,
    cmpNormalDialog
  },
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
    retrocedeStepper () {
      // validar que se haya ingresado al menos un activo antes de continuar
      this.e1 -= 1
    },
    async grabaDatos (activos) {
      this.$store.dispatch('actionSetLoading', true)
      await this.$store.dispatch('grabaDatosCompra', { datoscompra: this.datosCompra, activos }).then(async (arrayIdActivos) => {
        // this.$refs.myAlert.open('Confirmacion', 'Datos guardados correctamente')
        if (await this.$refs.confirm.open('Confirmación', '¿ Desea generar el formulario de alta ?')) {
          await this.$refs.fichaAlta.showDialog(arrayIdActivos)
        }
        this.$store.dispatch('actionSetLoading', false)
        this.$router.push('/activos')
      }).catch((error) => {
        alert('Ha ocurrido un error, los datos no se han guardado. \n' + error)
        this.$store.dispatch('actionSetLoading', false)
      })
    }
  }
}
</script>
