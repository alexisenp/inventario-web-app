<template>
  <v-simple-table class="my-border">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left" sm="2">
            Nº INVENTARIO
          </th>
          <th class="text-left">
            DESCRIPCION
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in activos"
          :key="item.inventario"
        >
          <td width="200">
            {{ item.inventario }}
          </td>
          <td>{{ item.nombre }}</td>
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
      default: () => []
    }
  }
}
</script>

<style scoped>
.my-border {
  border: 2px solid black;
}
.v-data-table td {
    border-bottom: none !important;
    border-top: 2px solid black !important;
    border-left: 2px solid black !important;
}
</style>
