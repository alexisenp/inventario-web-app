<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      persistent
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="hideDialog()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="grabaFichaAlta()"
            >
              GENERAR
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card
          class="mx-16 mt-10 pa-10"
        >
          <v-row>
            <v-col>
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="200"
                max-width="200"
                src="/logoServiu.png"
              />
            </v-col>
          </v-row>
          <v-row class="mx-9">
            <v-spacer />
            <v-col justify="right" align="right" sm="3">
              REF: DISPONE DE ALTA Y ASIGNA ACTIVO QUE INDICA.
            </v-col>
          </v-row>
          <v-row class="mx-9">
            <v-spacer />
            <v-col justify="right" align="right" sm="3">
              Con esta fecha se dicta lo siguiente:
            </v-col>
          </v-row>
          <v-row class="mx-9">
            <v-spacer />
            <v-col justify="right" align="right" sm="6">
              <v-row align="center">
                <v-col>
                  RESOLUCION EXENTA N°
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="nroResolucion"
                    label="Nro resolución"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mx-9">
            <v-col justify="right" align="right">
              La Serena, {{ $moment().format('LL') }}
            </v-col>
          </v-row>
          <div class="mx-7 mt-5">
            VISTOS
          </div>
          <v-row v-for="visto in vistos" :key="visto.id" class="mx-9">
            <v-col justify="left" align="left" class="ml-8">
              {{ visto.texto }}
            </v-col>
          </v-row>
          <div class="mx-7 mt-5">
            CONSIDERANDO
          </div>
          <v-row v-for="considerando in considerandos" :key="considerando.id" class="mx-9">
            <v-col justify="left" align="left" class="ml-8">
              {{ considerando.texto }}
            </v-col>
          </v-row>
          <div class="mx-7 mt-5">
            RESOLUCION
          </div>
          <v-row class="mx-9">
            <v-col justify="left" align="left" class="ml-8">
              {{ resolucion1 }}
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col sm="6">
              <v-card v-for="activo in activos" :key="activo.key" class="px-10 my-6">
                <v-row>
                  <v-col sm="4">
                    N° Inventario
                  </v-col>
                  <v-col sm="1">
                    :
                  </v-col>
                  <v-col>
                    {{ activo.inventario }}
                  </v-col>
                </v-row>
                <v-row justify="center" align="center">
                  <v-col sm="4">
                    Activo
                  </v-col>
                  <v-col sm="1">
                    :
                  </v-col>
                  <v-col>
                    {{ activo.nombre }}
                  </v-col>
                </v-row>
                <v-row justify="center" align="center">
                  <v-col sm="4">
                    Serie
                  </v-col>
                  <v-col sm="1">
                    :
                  </v-col>
                  <v-col>
                    {{ activo.serie }}
                  </v-col>
                </v-row>
                <v-row justify="center" align="center">
                  <v-col sm="4">
                    Tipo
                  </v-col>
                  <v-col sm="1">
                    :
                  </v-col>
                  <v-col>
                    {{ activo.tipo }}
                  </v-col>
                </v-row>
                <v-row justify="center" align="center">
                  <v-col sm="4">
                    Valor
                  </v-col>
                  <v-col sm="1">
                    :
                  </v-col>
                  <v-col>
                    {{ activo.valor }}
                  </v-col>
                </v-row>
                <v-row justify="center" align="center">
                  <v-col sm="4">
                    Descripción
                  </v-col>
                  <v-col sm="1">
                    :
                  </v-col>
                  <v-col>
                    {{ activo.valor }}
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mx-9">
            <v-col justify="left" align="left" class="ml-8">
              {{ resolucion2 }}
            </v-col>
          </v-row>
          <div class="mx-7 mt-5">
            ANÓTESE, COMUNÍQUESE Y CÚMPLASE.
          </div>

          <div class="d-flex flex-row justify-center mt-16">
            <div class="borde-superior">
              OSCAR GUTIERREZ SEGUEL <br> DIRECTOR <br>SERVIU REGION DE COQUIMBO
            </div>
          </div>
          <div class="mx-7 mt-5">
            V°B°<br>
            Contraloría Interna.
          </div>
          <div class="mx-7 mt-5">
            V°B°<br>
            Depto. Jurídico.
          </div>
          <div class="mx-7 mt-5">
            {{ firmantes }}
          </div>
          <div class="mx-7 mt-5">
            Transcribir a:
            <ol>
              <li>Contraloría Interna.</li>
              <li>Sección Servicios Generales.</li>
              <li>Departamento Administración y Finanzas.</li>
              <li>Oficina de Partes.</li>
            </ol>
          </div>
        </v-card>
      </v-card>
    </v-dialog>
    <cmp-confirm-dialog ref="confirm" />
    <cmp-loading-overlay />
    <cmp-normal-dialog ref="myAlert" />
  </v-row>
</template>

<script>
import CmpConfirmDialog from '@/components/confirmDialog'
import cmpNormalDialog from '@/components/normalDialog'
import cmpLoadingOverlay from '@/components/loadingOverlay'

export default {
  components: {
    CmpConfirmDialog,
    cmpNormalDialog,
    cmpLoadingOverlay
  },
  data () {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      nroResolucion: '',
      vistos: [{
        id: 1,
        texto: 'a) La Constitución Política de la República de Chile; La Ley Nº 18.575, Orgánica Constitucional de Bases Generales de la Administración del Estado.'
      },
      {
        id: 2,
        texto: 'b) El D.L. 1305/76 que reestructura y regionaliza el Ministerio de la Vivienda y Urbanismo; El D.S. 355/76 de Vivienda y Urbanismo, que aprueba el Reglamento Orgánico de los Servicios de Vivienda y Urbanización.'
      },
      {
        id: 3,
        texto: 'c) Ley N° 19.886 denominada Ley de Compras Públicas y el Reglamento D.S. 250/04 del Ministerio de Hacienda y sus modificaciones.'
      },
      {
        id: 4,
        texto: 'd) Las Resoluciones N° 6, 7 y 8, todas de 2019, de la Contraloría General de la República, sobre exención del trámite de Toma de Razón.'
      },
      {
        id: 5,
        texto: 'e) La Ley N° 19.880 que establece las Bases de los Procedimientos Administrativos que rigen los Actos de los Órganos de la Administración del Estado.'
      },
      {
        id: 6,
        texto: 'f) D.F.L. N° 29 de 2004, que aprueba texto refundido, coordinado y sistematizado de la Ley N° 18.834 de 1989, sobre Estatuto Administrativo; y demás normas pertinentes.'
      },
      {
        id: 7,
        texto: 'g) El Decreto N° 577, de 1978, del Ministerio de Tierras y Colonización, hoy Bienes Nacionales.'
      },
      {
        id: 8,
        texto: 'h) Las facultades que me confieren el Decreto Supremo Nº 355 y el Decreto TRA N° 272/12/2019 de fecha 18/03/2019, ambos del MINVU.'
      }
      ],
      considerandos: [{ id: 9, texto: 'a) La necesidad del Servicio de proceder al alta y asignación de la cámara fotográfica que se indica en la presente Resolución, dicto lo siguiente:' }],
      resolucion1: '1. DISPÓNESE el alta en el Servicio de Vivienda y Urbanización Región de Coquimbo, del activo que se indica y asígnese a la unidad que se señala según el siguiente detalle:',
      resolucion2: '2. La Sección Contabilidad y Presupuestos del SERVIU Región de Coquimbo, deberá dar de alta contablemente la especie identificada precedentemente y efectuar los registros respectivos.',
      activos: [],
      firmantes: 'JCD/JCC/mmr.'
    }
  },
  methods: {
    showDialog (activos) {
      this.dialog = true
      this.activos = activos
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    hideDialog () {
      this.resolve(true)
      this.dialog = false
    },
    generaPdf () {
      alert('Genera archivo imprimible')
      this.hideDialog()
      this.$router.push('/activos')
    },
    async grabaFichaAlta () {
      let flag = true
      if (this.nroResolucion === '') {
        if (!await this.$refs.confirm.open('Confirmación', 'Si continua sin ingresar nro de resolucion el documento se grabará como borrador \n ¿Desea continuar?.')) {
          flag = false
        }
      }
      if (flag) {
        const date = this.formatDate(new Date().toISOString().substr(0, 10))
        const arrayIdActivos = []
        for (let i = 0; i < this.activos.length; i++) {
          arrayIdActivos.push(this.activos[i].id)
        }
        const fichaAlta = { numero: 'Borrador', fecha: date, activos: arrayIdActivos, firmantes: this.firmantes }
        if (this.nroResolucion !== '') {
          alert(this.nroResolucion + ' NRO DE RESOLUCION SETEADO')
          fichaAlta.numero = this.nroResolucion
        }
        this.$store.dispatch('actionSetLoading', true)
        await this.$store.dispatch('grabaFichaAlta', fichaAlta).then(() => {
          this.$store.dispatch('actionSetLoading', false)
          this.generaPdf()
          this.$refs.myAlert.open('Confirmacion', 'Datos guardados correctamente')
        }).catch((error) => {
          alert('Ha ocurrido un error, los datos no se han guardado. \n' + error)
          this.$store.dispatch('actionSetLoading', false)
        })
      }
    },
    formatDate (date) {
      if (!date) { return null }
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }
  }
}
</script>

<style scoped>
.my-border {
  border: 2px solid black;
}
.borde-superior {
    border-top: 2px solid black !important;
     text-align: center;
}
</style>
