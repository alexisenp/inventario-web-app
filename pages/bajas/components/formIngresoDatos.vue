<template>
  <form>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="numero"
          label="Numero"
          @input="activaBoton()"
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
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
              label="Fecha baja"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="fecha"
            locale="es-es"
            @input="activaBoton()"
          />
        </v-menu>
      </v-col>
    </v-row>
    <v-row class="my-8 mx-n10">
      <v-col sm="12">
        <cmp-agrega-activos :is-alta="false" @set-activos="setActivos" />
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
        Vista Previa
      </v-btn>
    </v-row>
    <cmp-normal-dialog ref="myAlert" />
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import cmpAgregaActivos from '@/pages/bajas/components/agregaActivos'
import cmpNormalDialog from '@/components/normalDialog'

export default {
  components: {
    cmpAgregaActivos,
    cmpNormalDialog
  },
  mixins: [validationMixin],
  validations: {
    fecha: { required },
    firmantes: { required }
  },
  props: {
    alta: {
      type: Object,
      default () {
        return {
          numero: '',
          fecha: '',
          firmantes: '',
          activos: []
        }
      }
    },
    isEdit: {
      type: Boolean,
      defaul: false
    }
  },
  data: () => ({
    numero: '',
    fecha: new Date().toISOString().substr(0, 10),
    firmantes: 'JCD/JCC/mmr.', // DUMMY DATA, to be fixed later
    activos: [],
    btnDisabled: true, // indicate if GRABAR button is enabled, only is enabled if a value is setted in textformfield form
    menu2: false
  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.fecha)
    },
    fechaErrors () {
      const errors = []
      if (!this.$v.fecha.$dirty) { return errors }
      !this.$v.fecha.required && errors.push('La fecha es obligatoria.')
      return errors
    }
  },
  mounted () {
    this.numero = this.alta.numero
    if (this.alta.fecha !== '') { this.fecha = this.alta.fecha }
    this.firmantes = 'JCD/JCC/mmr.' // this.alta.firmantes
    this.activos = this.alta.activos
  },
  methods: {
    activaBoton () {
      this.menu2 = false
      this.btnDisabled = false
    },
    clear () {
      this.numero = ''
      this.fecha = ''
      this.firmantes = ''
      this.activos = ''
    },
    enviaDatos () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.activos.length > 0) {
          const alta = {
            numero: this.numero,
            fecha: this.fecha,
            firmantes: this.firmantes,
            activos: this.activos
          }
          this.$emit('vista-previa', alta)
        } else {
          this.$refs.myAlert.open('Debe ingresar activos', 'No ha ingresado ningún activo para dar de alta.')
        }
      }
    },
    cancelar () {
      this.$emit('cancelar')
    },
    formatDate (date) {
      if (!date) { return null }
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    setActivos (activos) {
      this.btnDisabled = false
      this.activos = activos
    }
  }
}
</script>
