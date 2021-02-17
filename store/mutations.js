import initialState from './state'

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_AUTH_USER (state, authUser) {
    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL, isAdmin } = authUser
    // eslint-disable-next-line
    state.authUser = {
      uid,
      displayName,
      email,
      emailVerified,
      photoURL: photoURL || null, // results in photoURL being null for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin
    }
  },
  llenaListaFuncionarios (state, payload) {
    state.listaFuncionarios = payload
  },
  llenaListaAltas (state, payload) {
    state.listaAltas = payload
  },
  llenaListaActivos (state, payload) {
    state.listaActivos = payload
  },
  commitSetLoading (state, payload) {
    state.loading = payload
  },
  commitSetFuncionarioSeleccionado (state, payload) {
    state.funcionarioSeleccionado = payload
  },
  commitSetActivoSeleccionado (state, payload) {
    state.activoSeleccionado = payload
  },
  commitSetAltaSeleccionada (state, payload) {
    state.altaSeleccionada = payload
  }
}
