<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="isLoggedIn"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="true"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="true"
      color="primary"
      fixed
      app
    >
      <v-app-bar-nav-icon v-if="isLoggedIn" @click.stop="drawer = !drawer" />
      <v-btn
        v-if="isLoggedIn"
        v-show="drawer"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="cambiaDark"
      >
        <v-icon>mdi-weather-sunny </v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        v-if="isLoggedIn"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu
        v-if="isLoggedIn"
        offset-y
        open-on-hover
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar class="white" size="32">
              <v-icon
                color="primary"
              >
                mdi-account-tie
              </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="pa-0">
          <v-container>
            <v-row>
              <v-col>
                <center>
                  <v-avatar class="primary" size="100">
                    <v-icon
                      dark
                    >
                      mdi-account-tie
                    </v-icon>
                  </v-avatar>
                </center>
              </v-col>
            </v-row>
            <v-row>
              <v-col>{{ authUser.displayname }} <br> {{ authUser.email }}</v-col>
            </v-row>
          </v-container>
          <v-divider />
          <v-list dense>
            <v-list-item-group
              color="primary"
            >
              <v-list-item
                key="profile"
                to="/perfil"
              >
                <v-list-item-icon>
                  <v-icon>
                    mdi-account-tie
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Mi perfil
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
              <v-list-item
                key="lock_open"
                @click="logout"
              >
                <v-list-item-icon>
                  <v-icon>
                    mdi-logout-variant
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Cerrar sesion
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  middleware: 'checklogin',
  data () {
    return {
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Inicio',
          to: '/'
        },
        {
          icon: 'mdi-account-group',
          title: 'Funcionarios',
          to: '/funcionarios'
        },
        {
          icon: 'mdi-inbox-multiple-outline ',
          title: 'Activos',
          to: '/activos'
        },
        {
          icon: 'mdi-inbox-multiple-outline ',
          title: 'Opciones',
          to: '/opciones'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Intranet SERVIU Región de Coquimbo'
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    }),
    ...mapState({
      authUser: 'authUser'
    })
  },
  methods: {
    cambiaDark () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    async logout () {
      try {
        await this.$fire.auth.signOut()
        this.$store.commit('RESET_STORE')
        this.$router.push('/login')
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>
