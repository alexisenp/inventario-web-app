<template>
  <form class="ma-5">
    <v-row align="center">
      <v-col class="d-flex" cols="12">
        <v-text-field
          v-model="nombre"
          :error-messages="nombreErrors"
          label="Activo"
          required
          @input="activaBoton($v.nombre)"
          @blur="$v.nombre.$touch()"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="serie"
          label="Serie"
          required
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="inventario"
          irror-messages="inventarioErrors"
          label="N° Inventario"
          required
          @input="activaBoton($v.inventario)"
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
          @input="activaBoton($v.tipo)"
          @blur="$v.tipo.$touch()"
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="valor"
          :error-messages="valorErrors"
          label="Valor"
          required
          @input="activaBoton($v.valor)"
          @blur="$v.valor.$touch()"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="12">
        <v-text-field
          v-model="descripcion"
          label="Descripción"
          @input="activaBoton($v.valor)"
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
    nombre: { required, minLength: minLength(10) },
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
    id: '',
    nombre: '',
    serie: '',
    inventario: '',
    tipo: '',
    valor: '',
    descripcion: ''
  }),
  computed: {
    nombreErrors () {
      const errors = []
      if (!this.$v.nombre.$dirty) { return errors }
      !this.$v.nombre.minLength && errors.push('El Nombre del activo debe ser al menos de 10 caracteres')
      !this.$v.nombre.required && errors.push('El nombre del activo es obligatorio.')
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
    this.id = this.activo.id
    this.nombre = this.activo.nombre
    this.serie = this.activo.serie
    this.inventario = this.activo.inventario
    this.tipo = this.activo.tipo
    this.valor = this.activo.valor
    this.descripcion = this.activo.descripcion
  },
  methods: {
    activaBoton (value) {
      value.$touch()
      this.btnDisabled = false
    },
    cancelEdit () {
      this.$emit('cancela-edicion')
    },
    clear () {
      this.$v.$reset()
      this.nombre = ''
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
        const activo = { id: this.id, nombre: this.nombre, serie: this.serie, inventario: this.inventario, tipo: this.tipo, valor: this.valor, descripcion: this.descripcion }
        this.$emit('retorna-datos-activo-ingresado', activo)
      }
    }
  }

}
</script>
