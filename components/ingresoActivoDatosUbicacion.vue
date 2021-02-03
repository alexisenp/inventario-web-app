<template>
  <v-card>
    <v-card class="py-md-4 mx-lg-auto">
      <v-card-text>
        <form>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="5">
              <v-text-field
                v-model="buscar"
                label="Buscar"
                required
              />
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="primary"
                @click="buscarFuncionario()"
              >
                <v-icon dark>
                  mdi-account-search
                </v-icon>
              </v-btn>
              <v-dialog
                v-model="dialog"
                transition="dialog-top-transition"
                max-width="900"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>
                      mdi-format-list-checks
                    </v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-toolbar
                    color="primary"
                    dark
                  >
                    Asignar funcionario
                  </v-toolbar>
                  <v-card-text>
                    <cmp-table-funcionarios />
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      text
                      @click="cierraDialog()"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col>
              <v-text-field
                v-model="funcionario"
                label="Funcionario"
                required
                solo
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                v-model="ubicacion"
                outlined
                name="input-7-4"
                label="Ubicación"
              />
            </v-col>
          </v-row>
        </form>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import cmpTableFuncionarios from '@/components/tableFuncionariosSeleccion'
export default {
  components: {
    cmpTableFuncionarios
  },
  data: () => ({
    buscar: '',
    funcionario: '',
    ubicacion: '',
    dialog: false
  }),
  methods: {
    confirmacionIngreso () {
      alert('confirmacion de datos de ingreso')
    },
    buscarFuncionario () {
      alert('Busca funcinario')
    },
    cierraDialog () {
      this.dialog = false
    }
  }
}
</script>
