<template>
  <v-card v-if="idDatosCompra != ''" key="1" class="pa-5">
    <!-- <v-card-title class="headline d-flex justify-space-between">
      <div>Datos compra:</div>
    </v-card-title>
    add btn editar despues
    -->
    <v-card-text>
      <v-row>
        <v-col>Nombre empresa</v-col>
        <v-col>{{ datosCompra.nombreE }}</v-col>
      </v-row>
      <v-row>
        <v-col>Rut</v-col>
        <v-col>{{ datosCompra.rutE }}</v-col>
      </v-row>
      <v-row>
        <v-col>Factura</v-col>
        <v-col>{{ datosCompra.fact }}</v-col>
      </v-row>
      <v-row>
        <v-col>Fecha</v-col>
        <v-col>{{ datosCompra.ffact }}</v-col>
      </v-row>
      <v-row>
        <v-col>Orden de compra</v-col>
        <v-col>{{ datosCompra.oc }}</v-col>
      </v-row>
      <v-row>
        <v-col>Total</v-col>
        <v-col>{{ datosCompra.total }}</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    idDatosCompra: {
      type: String,
      default: ''
    }
  },
  fetch () {
    if (this.idDatosCompra !== '') {
      this.$store.dispatch('cargaDatosCompraActivo', this.idDatosCompra)
        .then((datoscompra) => {
          this.datosCompra = datoscompra
        // alert('Datos rescatados correctamente')
        })
        .catch((error) => {
          this.$refs.myAlert.open('Error', 'Error al rescatar los datos \n' + error)
        })
    }
  },
  data: () => {
    return {
      datosCompra: {}
    }
  }
}
</script>
