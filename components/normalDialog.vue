<template>
  <v-dialog
    v-model="dialog"
    persistent
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar color="primary" dense flat>
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text
        v-show="!!message"
        class="mt-2"
      >
        {{ message }}
      </v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer />
        <v-btn
          color="primary"
          outlined
          @click.native="dialog = false"
        >
          Aceptar
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'NormalDialog',
  data () {
    return {
      dialog: false,
      message: null,
      title: null,
      options: {
        width: 400,
        zIndex: 200,
        noconfirm: false
      }
    }
  },

  methods: {
    open (title, message) {
      this.dialog = true
      this.title = title
      this.message = message
    }
  }
}
</script>
