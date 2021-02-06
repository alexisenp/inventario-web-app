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
          v-for="item in desserts"
          :key="item.name"
        >
          <td width="200">
            {{ item.name }}
          </td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  data () {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159
        },
        {
          name: 'Ice cream sandwich',
          calories: 237
        },
        {
          name: 'Eclair',
          calories: 262
        },
        {
          name: 'Cupcake',
          calories: 305
        },
        {
          name: 'Gingerbread',
          calories: 356
        },
        {
          name: 'Jelly bean',
          calories: 375
        },
        {
          name: 'Lollipop',
          calories: 392
        },
        {
          name: 'Honeycomb',
          calories: 408
        },
        {
          name: 'Donut',
          calories: 452
        },
        {
          name: 'KitKat',
          calories: 518
        }
      ]
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
