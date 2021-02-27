<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Ubicación Activo
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <cmp-asignado-a v-if="idFuncionario" :id-funcionario="idFuncionario" />
        <div v-else>
          El activo no ha sido asignado ...
        </div>
        <cmp-normal-dialog ref="myAlert" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import cmpNormalDialog from '@/components/normalDialog'
import cmpAsignadoA from '@/pages/activos/components/ubicacionCardAsignadoA'

export default {
  components: {
    cmpNormalDialog,
    cmpAsignadoA
  },
  props: {
    idFuncionario: {
      type: String,
      default: ''
    }
  }
}
</script>
