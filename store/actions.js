/* eslint-disable */
export default {

  async onAuthStateChanged({ commit, dispatch }, { authUser, claims }) {
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

  async nuxtServerInit({ dispatch, commit }, { res }) {
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

  async grabaFuncionario({ dispatch, commit }, funcionario) {
    const messageRef = this.$fire.firestore.collection('funcionario').doc()
    try {
      await messageRef.set({
        nombre: funcionario.nombre,
        apellido: funcionario.apellido,
        rut: funcionario.rut,
        email: funcionario.email,
        departamento: funcionario.departamento,
        seccion: funcionario.seccion
      })
      return true
    } catch (e) {
      alert('Ha ocurrido un error al grabar los datos. \n El siguiente es el error devuelto por el sistema, este sera util para que los programadores identifiquen el problema: \n ' + e)
      return false
    }
  },
  cargaFuncionarios({ commit }) {
    try {
      commit('commitSetLoading', true)
      this.$fire.firestore.collection('funcionario').get().then((querySnapshot) => {
        const funcionarios = []
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          const funcionario = { id: doc.id, nombre: doc.data().nombre, apellido: doc.data().apellido, rut: doc.data().rut, email: doc.data().email, departamento: doc.data().departamento, seccion: doc.data().seccion }
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
  cargaAltas({ commit }) {
    try {
      commit('commitSetLoading', true)
      this.$fire.firestore.collection('altas').get().then((querySnapshot) => {
        const altas = []
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          const alta = { id: doc.id, numero: doc.data().numero, fecha: doc.data().fecha, activos: doc.data().activos, firmantes: doc.data().firmantes }
          altas.push(alta)
        })
        commit('llenaListaAltas', altas)
        commit('commitSetLoading', false)
      })
    } catch (e) {
      alert('Error en sistema ' +
        e)
      // retur
    }
  },
  cargaActivos({ commit }) {
    try {
      commit('commitSetLoading', true)
      this.$fire.firestore.collection('activo').get().then((querySnapshot) => {
        const activos = []
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          const activo = { nombre: doc.data().nombre, serie: doc.data().serie, inventario: doc.data().inventario, tipo: doc.data().tipo, valor: doc.data().valor, desc: doc.data().desc }
          activos.push(activo)
        })
        commit('llenaListaActivos', activos)
        commit('commitSetLoading', false)
      })
    } catch (e) {
      alert('Error en sistema ' +
        e)
      // retur
    }
  },
  async grabaDatosCompra({ getters }, payload) {
    const datosCompraRef = this.$fire.firestore.collection('datoscompra').doc()
    let arrayIdActivos = []
    return await this.$fire.firestore.runTransaction((transaction) => {
      transaction.set(datosCompraRef, {
        nombreE: payload.datoscompra.nombreE, rutE: payload.datoscompra.rutE, oc: payload.datoscompra.oc, fact: payload.datoscompra.fact, ffact: payload.datoscompra.ffact, total: payload.datoscompra.total
      })
      payload.activos.forEach((activo) => {
        const activoRef = this.$fire.firestore.collection('activo').doc()
        // OBTENER ID, activoRef.id
        const datosAGrabar = {
          // nInv: this.$fire.firestore.FieldValue.increment(1),
          nombre: activo.nombre,
          serie: activo.serie,
          inventario: activo.inventario,
          tipo: activo.tipo,
          valor: activo.valor,
          desc: activo.desc,
          // ubicacion: payload.ubicacion,
          dc: datosCompraRef.id
        }
        //if (getters.getFuncionarioSeleccionado.id)
          // datosAGrabar.funcionario = { id: getters.getFuncionarioSeleccionado.id, nombre: getters.getFuncionarioSeleccionado.nombre, apellido: getters.getFuncionarioSeleccionado.apellido }
        transaction.set(activoRef, datosAGrabar)
        datosAGrabar.id = activoRef.id
        arrayIdActivos.push(datosAGrabar)
      })
      return Promise.resolve(arrayIdActivos);
    }).then(() => {
      return Promise.resolve(arrayIdActivos);
    }).catch((error) => {
      console.log(error)
      return Promise.reject(error);
    })
  },
  async grabaFichaAlta({ commit }, payload) {
    const fichAltaRef = this.$fire.firestore.collection('altas').doc()
    return await this.$fire.firestore.runTransaction((transaction) => {
      transaction.set(fichAltaRef, { numero: payload.numero, fecha: payload.fecha, activos: payload.activos, firmantes: payload.firmantes })
      payload.activos.forEach((activo) => { // traer arrays de activos
        const activoRef = this.$fire.firestore.collection('activo').doc(activo.id) // indicar id activo
        transaction.update(activoRef, { fichaalta: fichAltaRef.id })
        console.log(activo.id)
      })
      return Promise.resolve(true)
    }).then(() => {
      return Promise.resolve(true);
    }).catch((error) => {
      console.log(error)
      return Promise.reject(error);
    })
  },
  actionSetLoading({ commit }, loading) {
    try {
      commit('commitSetLoading', loading)
    } catch (e) {
      alert('Error en sistema ' +
        e)
    }
  },
  actionSetFuncionarioSeleccionado({ commit }, payload) {
    try {
      commit('commitSetFuncionarioSeleccionado', payload)
    } catch (e) {
      alert('Error en sistema ' +
        e)
    }
  },
  actionSetAltaSeleccionada({ commit }, payload) {
    try {
      commit('commitSetAltaSeleccionada', payload)
    } catch (e) {
      alert('Error en sistema ' +
        e)
    }
  }
}
