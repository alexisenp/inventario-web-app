<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            Agregar nuevo funcionario
          </v-card-title>
          <v-card-text>
            <!-- <p>Esta es la página de inicio.</p> -->
            <hr class="my-3">
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              to="/funcionarios/ingreso"
            >
              Continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            Agregar nuevo activo
          </v-card-title>
          <v-card-text>
            <!-- <p>Esta es la página de inicio.</p>-->
            <hr class="my-3">
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              to="/activos/ingreso"
            >
              Continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            Generar nueva alta
          </v-card-title>
          <v-card-text>
            <!-- <p>Esta es la página de inicio.</p>-->
            <hr class="my-3">
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              to="/altas/ingreso"
            >
              Continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  })
}
</script>
