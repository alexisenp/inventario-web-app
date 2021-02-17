<template>
  <form class="ma-5">
    <v-row align="center">
      <v-col class="d-flex" cols="12">
        <v-text-field
          v-model="nombreactivo"
          :error-messages="nombreactivoErrors"
          label="Activo"
          required
          @input="$v.nombreactivo.$touch()"
          @blur="$v.nombreactivo.$touch()"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="serie"
          :error-messages="serieErrors"
          label="Serie"
          required
          @input="$v.serie.$touch()"
          @blur="$v.serie.$touch()"
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="inventario"
          irror-messages="inventarioErrors"
          label="N° Inventario"
          required
          @input="$v.inventario.$touch()"
          @blur="$v.inventario.$touch()"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="tipo"
          :error-messages="tipoErrors"
          :items="tiposActivo"
          label="Tipo"
          @input="$v.tipo.$touch()"
          @blur="$v.tipo.$touch()"
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="valor"
          :error-messages="valorErrors"
          label="Valor"
          required
          @input="$v.valor.$touch()"
          @blur="$v.valor.$touch()"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="12">
        <v-text-field
          v-model="descripcion"
          label="Descripción"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-space-around" justify="space-around" cols="12" sm="12">
        <v-btn
          v-if="isEdit"
          @click="cancelEdit"
        >
          Cancelar
        </v-btn>
        <v-btn @click="clear">
          Limpiar
        </v-btn>
        <v-btn
          v-if="!isEdit"
          class="mr-4"
          @click="devolverDatosActivo"
        >
          Agregar
        </v-btn>
        <v-btn
          v-else
          color="primary"
          class="mr-4"
          @click="devolverDatosActivo"
        >
          Grabar
        </v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
// Formulario utilizado en ingreso y edicion de activos
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    nombreactivo: { required, minLength: minLength(10) },
    serie: { required },
    inventario: { required },
    tipo: { required },
    valor: { required }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    activo: {
      type: Object,
      default () {
        return {
          nombre: '',
          serie: '',
          inventario: '',
          tipo: '',
          valor: '',
          descripcion: ''
        }
      }
    }
  },
  data: () => ({
    tiposActivo: ['Edificaciones', 'Maquinarias y equipos', 'Vehículo', 'Muebles y enseres', 'Equipos computacionales'],
    activoEdit: {}
  }),
  computed: {
    nombreactivo: {
      get () {
        return this.activoEdit.nombre
      },
      set (value) {
        this.btnDisabled = false
        this.activoEdit.nombre = value
      }
    },
    serie: {
      get () {
        return this.activoEdit.serie
      },
      set (value) {
        this.btnDisabled = false
        this.activoEdit.serie = value
      }
    },
    inventario: {
      get () {
        return this.activoEdit.inventario
      },
      set (value) {
        this.btnDisabled = false
        this.activoEdit.inventario = value
      }
    },
    tipo: {
      get () {
        return this.activoEdit.tipo
      },
      set (value) {
        this.btnDisabled = false
        this.activoEdit.tipo = value
      }
    },
    valor: {
      get () {
        return this.activoEdit.valor
      },
      set (value) {
        this.btnDisabled = false
        this.activoEdit.valor = value
      }
    },
    descripcion: {
      get () {
        return this.activoEdit.descripcion
      },
      set (value) {
        this.btnDisabled = false
        this.activoEdit.descripcion = value
      }
    },
    nombreactivoErrors () {
      const errors = []
      if (!this.$v.nombreactivo.$dirty) { return errors }
      !this.$v.nombreactivo.minLength && errors.push('El Nombre del activo debe ser al menos de 10 caracteres')
      !this.$v.nombreactivo.required && errors.push('El nombre del activo es obligatorio.')
      return errors
    },
    serieErrors () {
      const errors = []
      if (!this.$v.serie.$dirty) { return errors }
      !this.$v.serie.required && errors.push('El N° de Serie es obligatorio.')
      return errors
    },
    inventarioErrors () {
      const errors = []
      if (!this.$v.inventario.$dirty) { return errors }
      !this.$v.inventario.required && errors.push('El N° de Inventario es obligatorio.')
      return errors
    },
    tipoErrors () {
      const errors = []
      if (!this.$v.tipo.$dirty) { return errors }
      !this.$v.tipo.required && errors.push('El tipo es obligatorio.')
      return errors
    },
    valorErrors () {
      const errors = []
      if (!this.$v.valor.$dirty) { return errors }
      !this.$v.valor.required && errors.push('El valor es obligatorio.')
      return errors
    }
  },
  mounted () {
    this.activoEdit = { ...this.activo }
  },
  methods: {
    cancelEdit () {
      this.$emit('cancela-edicion')
    },
    clear () {
      this.$v.$reset()
      this.nombreactivo = ''
      this.serie = ''
      this.inventario = ''
      this.tipo = ''
      this.valor = ''
      this.descripcion = ''
    },
    devolverDatosActivo () {
      // esta funcion devuelve los datos del activo ingresado por el usuario al componente padre
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const activo = { id: this.activoEdit.id, nombre: this.nombreactivo, serie: this.serie, inventario: this.inventario, tipo: this.tipo, valor: this.valor, descripcion: this.descripcion }
        this.$emit('retorna-datos-activo-ingresado', activo)
      }
    }
  }

}
</script>
