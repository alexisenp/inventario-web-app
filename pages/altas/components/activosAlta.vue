<template>
  <v-expansion-panels
    v-model="panel"
    :disabled="disabled"
    multiple
  >
    <v-expansion-panel>
      <v-expansion-panel-header>Activos de ficha de alta por corregir</v-expansion-panel-header>
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
