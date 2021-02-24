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
  llenaListaBajas (state, payload) {
    state.listaBajas = payload
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
  addActivo (state, payload) {
    state.listaActivos.push(...payload)
    payload.forEach((element) => {
      state.funcionarioSeleccionado.activos.push(element.id)
    })
  },
  deleteActivo (state, payload) {
    state.listaActivos = state.listaActivos.filter(function (value) {
      return value.id !== payload
    })
    state.funcionarioSeleccionado.activos = state.funcionarioSeleccionado.activos.filter(function (value) {
      return value !== payload
    })
  },
  deleteActivoAlta (state, payload) {
    state.listaActivos = state.listaActivos.filter(function (value) {
      return value.id !== payload
    })
  },
  commitSetActivoSeleccionado (state, payload) {
    state.activoSeleccionado = payload
  },
  commitSetAltaSeleccionada (state, payload) {
    state.altaSeleccionada = payload
  },
  changeNumeroAltaSeleccionada (state, payload) {
    state.altaSeleccionada.numero = payload
  }
}
