import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  srcDir: 'src',
  buildDir: 'functions/.nuxt',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - inventario',
    title: 'inventario',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],
  moment: {
    defaultLocale: 'es',
    locales: ['es']
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyB7q9C58jlXvW-jEjzDnMTA3BXQ4HgxKH4',
          authDomain: 'inventarioapp-9bfa3.firebaseapp.com',
          databaseURL: '',
          projectId: 'inventarioapp-9bfa3',
          storageBucket: 'inventarioapp-9bfa3.appspot.com',
          messagingSenderId: '315925124515',
          appId: '1:315925124515:web:a870f90efec67792693616',
          measurementId: 'G-GVM63B63L3'
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChanged'
            },
            ssr: true // default es false
          },
          firestore: true,
          storage: true
        }
      }
    ]
  ],
  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: true
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.red,
          accent: colors.red.darken2
          /* secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3 */
        },
        light: {
          primary: colors.red
          /* accent: colors.blue,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3 */
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true
  }
}
