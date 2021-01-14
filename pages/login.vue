<template>
  <v-card class="mx-auto pa-10" width="500">
    <div v-if="isLoggedIn">
      Bienvenido {{ authUser.email }}
    </div>
    <div v-else>
      <h1>Login</h1>
      <div v-if="cargando">
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
      <div v-else>
        <v-form v-model="formValid">
          <v-text-field v-model="formData.email" label="E-mail" prepend-icon="mdi-email-outline" />
          <v-text-field v-model="formData.password" label="Password" type="password" prepend-icon="mdi-form-textbox-password " />
        </v-form>
        <v-row>
          <v-spacer />
          <v-col class="mr-n16">
            <a href="#"> Olvidé mi contraseña</a>
          </v-col>
        </v-row>
        <center>
          <div>
            <v-btn
              :disabled="!formValid"
              color="primary"
              dark
              x-large
              @click="signInUser()"
            >
              Entrar
            </v-btn>
          </div>
        </center>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  // fetch() {
  // INFO -> this.$fireAuth user etc. are accessible
  // INFO -> this.$store.state.authUser is accessible even on server-side
  // },
  data: () => ({
    formData: {
      email: '',
      password: ''
    },
    cargando: false,
    formValid: false,
    formRules: {
      names: [
        v => !!v || 'Name is required',
        v =>
          (v && v.length <= 10) || 'Name must be less than 10 characters'
      ]
    }
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    }),
    ...mapState({
      authUser: 'authUser'
    })
  },
  methods: {
    async createUser () {
      try {
        this.cargando = true
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        this.$router.push('/')
        this.cargando = false
      } catch (e) {
        alert(e)
        this.cargando = false
      }
    },
    async signInUser () {
      try {
        this.cargando = true
        await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        this.$router.push('/')
      } catch (e) {
        alert(e)
        this.cargando = false
      }
    }
  }
}
</script>

<style>
</style>
