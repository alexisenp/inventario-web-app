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
      <v-col class="d-flex" cols="12" sm="4">
        <v-text-field
          v-model="serie"
          label="Serie"
          required
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="4">
        <v-text-field
          v-if="!isEdit"
          v-model="inventario"
          :error-messages="inventarioErrors"
          label="N° Inventario"
          required
          @blur="activaBoton($v.inventario)"
        />
        <div v-else>
          {{ inventario }}
        </div>
      </v-col>
      <v-col class="d-flex" cols="12" sm="4">
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
        <v-select
          v-model="subtipo"
          :error-messages="subtipoErrors"
          :items="subtiposActivo"
          label="Sub-Tipo"
          :disabled="subtiposActivo.length == 0"
          @input="activaBoton($v.subtipo)"
          @blur="$v.subtipo.$touch()"
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
    inventario: {
      required,
      isUnique (value) {
        // standalone validator ideally should not assume a field is required
        if (value === '') { return true }
        if (this.isEdit) { return true }

        return new Promise((resolve, reject) => {
          this.activos.find((o) => {
            if (o.inventario === value) {
              reject(Error('Nro inventario ya usado.'))
            }
          })
          this.$store.dispatch('buscarActivo', value)
            .then((activo) => {
              if (activo != null) {
                reject(new Error('Nro inventario ya usado'))
              } else {
                resolve(true)
              }
            })
            .catch((error) => {
              alert('Ha ocurrido un error \n' + error)
            })
        })
      }
    },
    tipo: { required },
    subtipo: { required },
    valor: { required }
  },
  props: {
    activos: {
      type: Array,
      default () {
        return []
      }
    },
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
    tiposActivo: ['2901 Terrenos', '2902 Edificios', '2903 Vehículos', '2904 Mobiliario y Otros', '2905001 Máquinas y Equipos de Oficina', '2905002 Maquinarias y Equipos para la Producción', '2905999 Otras', '2906001 Equipos Computacionales y Periféricos', '2906002 Equipos de Comunicaciones para Redes Informáticas', '2907 Programas Informáticos', '2907001 Programas Computacionales', '2907002 Sistemas de Información', '2999 Otros Activos no Financieros'],
    id: '',
    nombre: '',
    serie: '',
    inventario: '',
    tipo: '',
    subtipo: '',
    valor: '',
    descripcion: ''
  }),
  computed: {
    subtiposActivo () {
      let subtipos = []
      switch (this.tipo) {
        // Dummy data, to be fixed later
        case '2901 Terrenos':
          subtipos = ['14201 Terrenos', '15402 Terrenos de Inversión', '14405 Terrenos en Leasing']
          break
        case '2902 Edificios':
          subtipos = ['14101 Edificaciones', '14401 Edificaciones en Leasing', '14601 Inmuebles Patrimoniales Históricos y/o Culturales', '15401 Edificaciones de Inversión', '1810201 Edificaciones para Otras Entidades']
          break
        case '2903 Vehículos':
          subtipos = ['1410501 Vehículos Terrestres', '145030501 Vehículos Terrestres Importados en Tránsito', '1410502 Vehículos Aéreos', '145030502 Vehículos Aéreos Importados en Tránsito', '1410503 Vehículos Marítimos', '14403 Vehículos en Leasing', '145030503 Vehículos Marítimos Importados en Tránsito', '1810205 Vehículos para Otras Entidades']
          break
        case '2904 Mobiliario y Otros':
          subtipos = ['1450301 Mobiliario y Otros Importados en Tránsito', '1450401 Mobiliario y Otros Nacionales en Tránsito', '5321401 Gastos en Mobiliario y Otros', '14106 Muebles y Enseres', '1810206 Muebles y Enseres para Otras Entidades']
          break
        case '2905001 Máquinas y Equipos de Oficina':
          subtipos = ['1450302 Máquinas y Equipos de Oficina Importadas en Tránsito', '5321402 Gastos en Máquinas y Equipos de Oficina', '1450403 Máquinas y Equipos de Oficina Nacionales en Tránsito', '14104 Máquinas y Equipos de Oficina', '1810204 Maquinarias y Equipos de Oficina para Otras Entidades']
          break
        case '2905002 Maquinarias y Equipos para la Producción':
          subtipos = ['14102 Maquinarias y Equipos para Producción o Prestaciones de Servicios', '14402 Maquinarias y Equipos para la Producción o Prestación de Servicios en Leasing', '1810202 Maquinarias y Equipos para la producción para Otras Entidades', '1450303 Maquinarias y Equipos para la Producción o Prestación de Servicios Importadas en Tránsito', '5321403 Gastos en Maquinarias y Equipos para la Producción o Prestación de Servicios', '1450404 Maquinarias y Equipos para la Producción o prestación de Servicios Nacionales en Tránsito']
          break
        case '2905999 Otras':
          subtipos = ['1450304 Otras Máquinas y Equipos Importadas en Tránsito', '1450405 Otras Máquinas y Equipos Nacionales en Tránsito', '14107 Herramientas', '1810207 Herramientas para Otras Entidades', '14112 Otras Máquinas y Equipos', '1810212 Otras Máquinas y Equipos para Otras Entidades', '5321499 Otros Gastos de Bienes Muebles']
          break
        case '2906001 Equipos Computacionales y Periféricos':
          subtipos = ['1450402 Equipos Computacionales y Periféricos Nacionales en Tránsito', '14404 Equipos Computacionales y Periféricos en Leasing', '5321404 Gastos en Equipos Computacionales y Periféricos', '1450307 Equipos Computacionales y Periféricos Importados en Tránsito', '14108 Equipos Computacionales y Periféricos', '1810208 Equipos Computacionales y Periféricos para Otras Entidades']
          break
        case '2906002 Equipos de Comunicaciones para Redes Informáticas':
          subtipos = ['5321405 Gastos en Equipos de Comunicaciones para Redes Informáticas', '1450306 Equipos de Comunicaciones para Redes Informáticas Importados en Tránsito', '14109 Equipos de Comunicaciones para Redes Informáticas', '1810209 Equipos de Comunicaciones y Redes Informáticas para Otras Entidades']
          break
        case '2907001 Programas Computacionales':
          subtipos = ['15101 Programas y Licencias Computacionales', '5321207 Programas Computacionales', '1450308 Programas Informáticos Importados en Tránsito', '1810214 Programas y Licencias Computacionales para Otras Entidades']
          break
        case '2907002 Sistemas de Información':
          subtipos = ['15102 Sistemas de Información', '1450309 Sistemas de Información Importados en Tránsito', '1810215 Sistemas de Información para Otras Entidades']
          break
        case '2999 Otros Activos no Financieros':
          subtipos = ['15701 Plantas, Árboles y/o Bosques', '14602 Reservas Ecológicas', '15702 Animales Vivos', '14603 Piezas, Obras Históricas, Arqueológicas o de Colección', '15103 Páginas WEB', '15104 Patentes y derechos de Autor', '5321406 Otros Bienes Muebles', '56109 Gastos de Normalización de Empresas y Activos', '14110 Activos Vivos', '1810213 Otros Bienes de Uso para Otras Entidades', '14199 Otros Bienes de Uso Depreciables', '1450399 Otros Bienes de Uso Importados en Tránsito Importados', '1450499 Otros Bienes de Uso Nacionales en Tránsito', '14699 Otros Bienes del Patrimonio Histórico Artístico y/o Cultural', '15199 Otros Bienes Intangibles']
          break
      }
      return subtipos
    },
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
      !this.$v.inventario.isUnique && errors.push('El nro de inventario ya esta en uso por otro activo.')
      return errors
    },
    tipoErrors () {
      const errors = []
      if (!this.$v.tipo.$dirty) { return errors }
      !this.$v.tipo.required && errors.push('El tipo es obligatorio.')
      return errors
    },
    subtipoErrors () {
      const errors = []
      if (!this.$v.subtipo.$dirty) { return errors }
      !this.$v.subtipo.required && errors.push('El sub-tipo es obligatorio.')
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
    this.subtipo = this.activo.subtipo
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
      this.subtipo = ''
      this.valor = ''
      this.descripcion = ''
    },
    devolverDatosActivo () {
      // esta funcion devuelve los datos del activo ingresado por el usuario al componente padre
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const activo = { id: this.id, nombre: this.nombre, serie: this.serie, inventario: this.inventario, tipo: this.tipo, subtipo: this.subtipo, valor: this.valor, descripcion: this.descripcion }
        this.$emit('retorna-datos-activo-ingresado', activo)
        this.clear()
      }
    }
  }

}
</script>
