<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Datos de compra
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <cmp-asignado-a v-if="idDatosCompra != ''" :id-datos-compra="idDatosCompra" />
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
import cmpAsignadoA from '@/pages/activos/components/datosCompraCard'

export default {
  components: {
    cmpNormalDialog,
    cmpAsignadoA
  },
  props: {
    idDatosCompra: {
      type: String,
      default: ''
    }
  }
}
</script>
