<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>Activos del funcionario</v-expansion-panel-header>
      <v-expansion-panel-content>
        <cmp-table-activos />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import cmpTableActivos from '@/pages/funcionarios/components/tableActivosFuncionarios'
export default {
  components: {
    cmpTableActivos
  }
}
</script>
