<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>Activos de alta</v-expansion-panel-header>
      <v-expansion-panel-content>
        <cmp-table-activos-alta />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import cmpTableActivosAlta from '@/pages/altas/components/tableActivosAlta'
export default {
  components: {
    cmpTableActivosAlta
  }
}
</script>
