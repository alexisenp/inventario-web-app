<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-title class="headline">
            Funcionarios
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
              Nuevo
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-title class="headline">
            Activo
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
              Nuevo
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-title class="headline">
            Alta
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
              Nuevo
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-title class="headline">
            Baja
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
              to="/bajas/ingreso"
            >
              Nuevo
            </v-btn>
            <v-spacer />
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
