<template>
  <div>
    <v-card>
      <v-card-text>
        <form class="ma-5">
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="nombreactivo"
                :error-messages="nombreactivoErrors"
                label="Nombre del activo"
                required
                @input="$v.nombreactivo.$touch()"
                @blur="$v.nombreactivo.$touch()"
              />
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="nserie"
                :error-messages="nserieErrors"
                label="Serie"
                required
                @input="$v.nserie.$touch()"
                @blur="$v.nserie.$touch()"
              />
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="tipo"
                :error-messages="tipoErrors"
                label="Tipo"
                required
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
                :error-messages="descripcionErrors"
                label="Descripcion"
                required
                @input="$v.descripcion.$touch()"
                @blur="$v.descripcion.$touch()"
              />
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col class="d-flex" justify="space-around" cols="12" sm="6">
              <v-btn @click="clear">
                Limpiar
              </v-btn>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-btn
                class="mr-4"
                @click="agregarActivo"
              >
                Agregar
              </v-btn>
            </v-col>
          </v-row>
        </form>
        <p class="title">
          Activos
        </p>
        <v-simple-table
          v-if="activos.length > 0 "
          @click:row="clicked"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Nombre Activo
                </th>
                <th class="text-left">
                  N° Serie
                </th>
                <th class="text-left">
                  Valor
                </th>
                <th class="text-left">
                  Borrar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in activos"
                :key="item.key"
              >
                <td>{{ item.nombre }}</td>
                <td>{{ item.serie }}</td>
                <td>{{ item.valor }}</td>
                <td>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                  >
                    <v-icon dark>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div v-else>
          No ha ingresado datos
        </div>
      </v-card-text>
    </v-card>
    <v-card-actions class="justify-space-around mt-3">
      <v-btn
        color="primary"
        @click="retroceder()"
      >
        Volver
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
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    nombreactivo: { required, minLength: minLength(10) },
    nserie: { required },
    tipo: { required },
    valor: { required },
    descripcion: { required }
  },
  data: () => ({
    nombreactivo: '',
    nserie: '',
    tipo: '',
    valor: '',
    descripcion: '',
    menu2: false,
    date: new Date().toISOString().substr(0, 10),
    activos: [],
    dialog: false,
    selected: []
  }),
  computed: {
    nombreactivoErrors () {
      const errors = []
      if (!this.$v.nombreactivo.$dirty) { return errors }
      !this.$v.nombreactivo.minLength && errors.push('El Nombre del activo debe ser al menos de 10 caracteres')
      !this.$v.nombreactivo.required && errors.push('El nombre del activo es obligatorio.')
      return errors
    },
    nserieErrors () {
      const errors = []
      if (!this.$v.nserie.$dirty) { return errors }
      !this.$v.nserie.required && errors.push('El N° de Serie es obligatorio.')
      return errors
    },
    tipoErrors () {
      const errors = []
      if (!this.$v.tipo.$dirty) { return errors }
      !this.$v.tipo.required && errors.push('El tipo es obligatorio.')
      return errors
    },
    descripcionErrors () {
      const errors = []
      if (!this.$v.descripcion.$dirty) { return errors }
      !this.$v.descripcion.required && errors.push('La descripcion es obligatoria.')
      return errors
    },
    valorErrors () {
      const errors = []
      if (!this.$v.valor.$dirty) { return errors }
      !this.$v.valor.required && errors.push('El valor es obligatorio.')
      return errors
    }
  },
  watch: {
    fecha2 (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    clear () {
      this.$v.$reset()
      this.nombreactivo = ''
      this.nserie = ''
      this.tipo = ''
      this.valor = ''
      this.descripcion = ''
    },
    agregarActivo () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const activo = { key: this.activos.length + 1, nombre: this.nombreactivo, serie: this.nserie, tipo: this.tipo, valor: this.valor, descripcion: this.descripcion }
        this.activos.push(activo)
        this.clear()
      }
    },
    deleteItem () {
      for (let i = 0; i < this.selected.length; i++) {
        const index = this.activos.indexOf(this.selected[i])
        this.activos.splice(index, 1)
      }
      this.dialog = false
    },
    clicked (value) {
      // es-lint-dissable-next-line
      // console.log(value.nombre)
    },
    continuar () {
      if (this.activos.length > 0) {
        this.$emit('avanza-stepper')
      } else {
        alert('Debe ingresar al menos un activo para continuar.')
      }
    },
    retroceder () {
      this.$emit('retrocede-stepper')
    }
  }
}
</script>
