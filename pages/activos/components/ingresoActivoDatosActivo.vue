<template>
  <div>
    <v-card>
      <v-card-text>
        <cmp-form-ingreso-activo @retorna-datos-activo-ingresado="retornaActivo" />
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
                v-for="(item, index) in activos"
                :key="index"
              >
                <td>{{ item.inventario }}</td>
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
                    @click="deleteItem(item)"
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
        Grabar
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import cmpFormIngresoActivo from '@/pages/activos/components/formIngresoActivo'

export default {
  components: {
    cmpFormIngresoActivo
  },
  data: () => ({
    activos: [],
    dialog: false,
    selected: []
  }),
  methods: {
    deleteItem (payload) {
      this.activos = this.activos.filter(function (valor) { return valor.inventario !== payload.inventario })
      this.dialog = false
    },
    clicked (value) {
      // es-lint-dissable-next-line
      // console.log(value.nombre)
    },
    retornaActivo (activo) {
      // recibe los datos ingresados por el usuario en formIngresoActivo y lo guarda en el array activos
      this.activos.push(activo)
    },
    continuar () {
      if (this.activos.length > 0) {
        const nuevoArrayActivos = []
        this.activos.forEach((arrayItem) => {
          const activo = { nombre: arrayItem.nombre, serie: arrayItem.serie, inventario: arrayItem.inventario, tipo: arrayItem.tipo, valor: arrayItem.valor, descripcion: arrayItem.descripcion }
          nuevoArrayActivos.push(activo)
        })
        this.$emit('graba-datos', nuevoArrayActivos)
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
