<template>
  <v-simple-table
    @click:row="clicked"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            N° Inventario
          </th>
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
</template>

<script>
export default {
  props: {
    activos: {
      type: Array,
      default () {
        return [{}]
      }
    }
  },
  methods: {
    clicked (value) {
      // eslint-disable-next-line
      console.log(value)
    },
    deleteItem (value) {
      this.$emit('delete-item', value)
    }
  }
}
</script>
