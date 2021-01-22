export default {

  async onAuthStateChanged ({ commit, dispatch }, { authUser, claims }) {
    if (!authUser) {
      await commit('RESET_STORE')
      return
    }
    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL } = authUser
    commit('SET_AUTH_USER', {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL, // results in photoURL being undefined for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin: claims.custom_claim
    })
  },

  async nuxtServerInit ({ dispatch, commit }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user

      /* await dispatch('onAuthStateChanged', {
        authUser,
        claims,
        token
      }) */
      // or
      const { uid, email, emailVerified, displayName, photoURL } = authUser
      await commit('SET_AUTH_USER', {
        uid,
        email,
        emailVerified,
        displayName,
        photoURL, // results in photoURL being undefined for server auth
        // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
        isAdmin: claims.custom_claim
      })
    }
  },

  async grabaFuncionario ({ dispatch, commit }, funcionario) {
    const messageRef = this.$fire.firestore.collection('funcionario').doc()
    try {
      await messageRef.set({
        nombre: funcionario.nombre,
        email: funcionario.email,
        departamento: funcionario.departamento
      })
    } catch (e) {
      alert(e)
      // return
    }
  },
  cargaFuncionarios ({ commit }) {
    try {
      commit('commitSetLoading', true)
      this.$fire.firestore.collection('funcionario').get().then((querySnapshot) => {
        const funcionarios = []
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          const funcionario = { nombre: doc.data().nombre, email: doc.data().email, departamento: doc.data().departamento }
          funcionarios.push(funcionario)
        })
        commit('llenaListaFuncionarios', funcionarios)
        commit('commitSetLoading', false)
      })
    } catch (e) {
      alert('Error en sistema ' +
        e)
      // retur
    }
  },
  actionSetLoading ({ commit }, loading) {
    try {
      commit('commitSetLoading', loading)
    } catch (e) {
      alert('Error en sistema ' +
        e)
    }
  },
  actionSetFuncionarioSeleccionado ({ commit }, payload) {
    try {
      commit('commitSetFuncionarioSeleccionado', payload)
    } catch (e) {
      alert('Error en sistema ' +
        e)
    }
  }
}
