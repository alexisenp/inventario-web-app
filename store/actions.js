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
          if (doc.data().activos != undefined && doc.data().activos.length > 0)
            funcionario.activos = doc.data().activos 
          else 
            funcionario.activos= []

          funcionarios.push(funcionario)
        })
        commit('llenaListaFuncionarios', funcionarios)
        commit('commitSetLoading', false)
      })
    } catch (e) {
      alert('Error en sistema ' + e)
      // retur
    }
  },
  async cargaActivosFuncionario({ commit, getters }) {
    commit('commitSetLoading', true)
    return await this.$fire.firestore.collection('activo').where("asignadoa", "==", getters.getFuncionarioSeleccionado.id).get()
      .then((querySnapshot) => {
        let activos = []
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          const activo = { id: doc.id, nombre: doc.data().nombre, serie: doc.data().serie, inventario: doc.data().inventario, tipo: doc.data().tipo, valor: doc.data().valor, descripcion: doc.data().desc, fichaalta: doc.data().fichaalta, documentocompra: doc.data().dc }
          activos.push(activo)
        })
        commit('llenaListaActivos', activos)
        commit('commitSetLoading', false)
        return Promise.resolve(true)
      })
      .catch((error) => {
        commit('commitSetLoading', false)
        console.log('Ha ocurrido un error' + error)
        return Promise.reject(false)
      })
  },
  async cargaActivosAlta({ commit, getters }, payload) {
    commit('commitSetLoading', true)
    return await this.$fire.firestore.collection('activo').where("fichaalta", "==", payload).get()
      .then((querySnapshot) => {
        let activos = []
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          const activo = { id: doc.id, nombre: doc.data().nombre, serie: doc.data().serie, inventario: doc.data().inventario, tipo: doc.data().tipo, valor: doc.data().valor, descripcion: doc.data().desc, fichaalta: doc.data().fichaalta, documentocompra: doc.data().dc }
          activos.push(activo)
        })
        commit('llenaListaActivos', activos)
        commit('commitSetLoading', false)
        return Promise.resolve(true)
      })
      .catch((error) => {
        commit('commitSetLoading', false)
        console.log('Ha ocurrido un error' + error)
        return Promise.reject(error)
      })
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
          const activo = { 
            id: doc.id,
            nombre: doc.data().nombre,
            serie: doc.data().serie,
            inventario: doc.data().inventario,
            tipo: doc.data().tipo,
            valor: doc.data().valor,
            descripcion: doc.data().desc,
            fichaalta: doc.data().fichaalta,
            dc: doc.data().dc,
            asignadoa: doc.data().asignadoa,
          }
          activos.push(activo)
        })
        commit('llenaListaActivos', activos)
        commit('commitSetLoading', false)
      })
    } catch (e) {
      alert('Error en sistema ' + e)
    }
  },
  async cargaActivosFichaInventario({ commit }, payload) {
    try {
      commit('commitSetLoading', true)
      const collection = this.$fire.firestore.collection('activo')
      const reads = payload.map(id => collection.doc(id).get())
      const result = await Promise.all(reads)
      commit('commitSetLoading', false)

      const activos = []
      let activo
      result.map(v => {
        activo = { id: v.id, asignadoa: v.data().asignadoa, nombre: v.data().nombre, serie: v.data().serie, inventario: v.data().inventario, tipo: v.data().tipo, valor: v.data().valor, descripcion: v.data().desc, fichaalta: v.data().fichaalta, documentocompra: v.data().dc }
        activos.push(activo)
      })
      return activos
    } catch (e) {
      alert('Error en sistema ' + e)
    }
  },
  async buscarActivo({ commit }, payload) {
    commit('commitSetLoading', true)

    return await this.$fire.firestore.collection('activo').where("inventario", "==", payload)
      .get().then((querySnapshot) => {
        let activo = null
        if (!querySnapshot.empty) {
          activo = { id: querySnapshot.docs[0].id, asignadoa: querySnapshot.docs[0].data().asignadoa, nombre: querySnapshot.docs[0].data().nombre, serie: querySnapshot.docs[0].data().serie, inventario: querySnapshot.docs[0].data().inventario, tipo: querySnapshot.docs[0].data().tipo, valor: querySnapshot.docs[0].data().valor, descripcion: querySnapshot.docs[0].data().desc, fichaalta: querySnapshot.docs[0].data().fichaalta, documentocompra: querySnapshot.docs[0].data().dc }
        }
        commit('commitSetLoading', false)
        return Promise.resolve(activo)
      })
      .catch((e) => {
        console.log('Error en sistema' + e)
        return Promise.reject(e)
      })

  },
  async cargaDatosFuncionario({ commit }, payload) {
    commit('commitSetLoading', true)
    return await this.$fire.firestore.collection('funcionario').doc(payload)
      .get().then((doc) => {
        let funcionario = null
        if (!doc.empty) {
          funcionario = {
            id: doc.id,
            nombre: doc.data().nombre,
            apellido: doc.data().apellido,
            rut: doc.data().rut,
            email: doc.data().email,
            departamento: doc.data().departamento,
            seccion: doc.data().seccion,
            activos: doc.data().activos
          }
        }
        commit('commitSetLoading', false)
        return Promise.resolve(funcionario)
      })
      .catch((e) => {
        console.log('Error en sistema' + e)
        return Promise.reject(e)
      })

  },
  async cargaDatosCompraActivo({ commit }, payload) {
    commit('commitSetLoading', true)
    return await this.$fire.firestore.collection('datoscompra').doc(payload)
      .get().then((doc) => {
        let datosCompra = null
        if (!doc.empty) {
          datosCompra = {
            id: doc.id,
            nombreE: doc.data().nombreE,
            rutE: doc.data().rutE,
            fact: doc.data().fact,
            ffact: doc.data().ffact,
            oc: doc.data().oc,
            total: doc.data().total
          }
        }
        commit('commitSetLoading', false)
        return Promise.resolve(datosCompra)
      })
      .catch((e) => {
        console.log('Error en sistema' + e)
        return Promise.reject(e)
      })

  },
  async quitaAsignacionActivoFuncionario({ commit, getters, state }, payload) {
    commit('commitSetLoading', true)
    const datosActivoRef = this.$fire.firestore.collection('activo').doc(payload)
    return await this.$fire.firestore.runTransaction((transaction) => {
      transaction.update(datosActivoRef, { asignadoa: this.$fireModule.firestore.FieldValue.delete() })

      const funcionarioRef = this.$fire.firestore.collection('funcionario').doc(getters.getFuncionarioSeleccionado.id)
      transaction.update(funcionarioRef, { activos: this.$fireModule.firestore.FieldValue.arrayRemove(payload) })


      const historialActivoRef = this.$fire.firestore.collection('activo').doc(payload).collection('historial').doc()
      transaction.set(historialActivoRef, {
        // tendra los siguientes tipos: creado, asignado, baja, eliminado, editado
        tipo: 'desasignadofuncionario',
        fecha: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        a: { id: state.funcionarioSeleccionado.id, nombre: state.funcionarioSeleccionado.nombre, seccion: state.funcionarioSeleccionado.seccion },
        por: { id: state.authUser.uid, email: state.authUser.email, nombre: state.authUser.displayName }
      })

      commit('commitSetLoading', false)
      return Promise.resolve(true)
    }).then(() => {
      commit('commitSetLoading', false)
      return Promise.resolve(true);
    }).catch((error) => {
      commit('commitSetLoading', false)
      console.log(error)
      return Promise.reject(error);
    })


  },
  async quitaAsignacionActivoAlta({ commit, getters, state }, payload) {
    commit('commitSetLoading', true)
    const datosActivoRef = this.$fire.firestore.collection('activo').doc(payload)
    return await this.$fire.firestore.runTransaction((transaction) => {
      transaction.update(datosActivoRef, { fichaalta: this.$fireModule.firestore.FieldValue.delete() })

      const altaRef = this.$fire.firestore.collection('altas').doc(getters.getAltaSeleccionada.id)
      transaction.update(altaRef, { activos: this.$fireModule.firestore.FieldValue.arrayRemove(payload) })


      const historialActivoRef = datosActivoRef.collection('historial').doc()
      transaction.set(historialActivoRef, {
        // tendra los siguientes tipos: creado, asignado, baja, eliminado, editado
        tipo: 'desasignadoalta',
        fecha: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        por: { id: state.authUser.uid, email: state.authUser.email, nombre: state.authUser.displayName }
      })

      commit('commitSetLoading', false)
      return Promise.resolve(true)
    }).then(() => {
      commit('commitSetLoading', false)
      return Promise.resolve(true);
    }).catch((error) => {
      commit('commitSetLoading', false)
      console.log(error)
      return Promise.reject(error);
    })


  },
  async grabaDatosCompra({ commit, state }, payload) {
    commit('commitSetLoading', true)
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
          desc: activo.descripcion,
          // ubicacion: payload.ubicacion,
          dc: datosCompraRef.id
        }
        //if (getters.getFuncionarioSeleccionado.id)
        // datosAGrabar.funcionario = { id: getters.getFuncionarioSeleccionado.id, nombre: getters.getFuncionarioSeleccionado.nombre, apellido: getters.getFuncionarioSeleccionado.apellido }
        transaction.set(activoRef, datosAGrabar)
        datosAGrabar.id = activoRef.id
        const historialActivoRef = this.$fire.firestore.collection('activo').doc(activoRef.id).collection('historial').doc()
        transaction.set(historialActivoRef, {
          // tendra los siguientes tipos: creado, asignado, baja, eliminado, editado
          tipo: 'creado',
          creado: this.$fireModule.firestore.FieldValue.serverTimestamp(),
          por: { id: state.authUser.uid, email: state.authUser.email, nombre: state.authUser.displayName }
        })
        arrayIdActivos.push(datosAGrabar)
      })
      commit('commitSetLoading', false)
      return Promise.resolve(arrayIdActivos);
    }).then(() => {
      commit('commitSetLoading', false)
      return Promise.resolve(arrayIdActivos);
    }).catch((error) => {
      commit('commitSetLoading', false)
      console.log(error)
      return Promise.reject(error);
    })
  },
  async grabaFichaAlta({ commit, state }, payload) {
    commit('commitSetLoading', true)
    const fichAltaRef = this.$fire.firestore.collection('altas').doc()
    return await this.$fire.firestore.runTransaction((transaction) => {
      transaction.set(fichAltaRef, { numero: payload.numero, fecha: payload.fecha, activos: payload.activos, firmantes: payload.firmantes })
      payload.activos.forEach((activo) => { // traer arrays de activos
        const activoRef = this.$fire.firestore.collection('activo').doc(activo) // indicar id activo
        transaction.update(activoRef, { fichaalta: fichAltaRef.id })

        transaction.set(activoRef.collection('historial').doc(activo), {
          fecha: this.$fireModule.firestore.FieldValue.serverTimestamp(),
          tipo: 'alta',
          por: { id: state.authUser.uid, email: state.authUser.email, nombre: state.authUser.displayName }
        })
      })
      commit('commitSetLoading', false)
      return Promise.resolve(true)
    }).then(() => {
      commit('commitSetLoading', false)
      return Promise.resolve(true);
    }).catch((error) => {
      console.log(error)
      commit('commitSetLoading', false)
      return Promise.reject(error);
    })
  },
  async grabaEdicionFichaAlta({ commit }, payload) {
    commit('commitSetLoading', true)
    const fichAltaRef = this.$fire.firestore.collection('altas').doc(payload.id)

    await fichAltaRef.update({ numero: payload.numero }).then(() => {
      commit('commitSetLoading', false)
      return Promise.resolve(true)
    }).catch((error) => {
      alert('Ha ocurrido un error ' + error)
      return Promise.reject(false)
    })
  },
  async asignaActivo({ commit, getters, state }, payload) {
    commit('commitSetLoading', true)
    const funcionarioRef = this.$fire.firestore.collection('funcionario').doc(getters.getFuncionarioSeleccionado.id)
    let arrayIdActivos = []
    payload.forEach(element => {
      arrayIdActivos.push(element.id)
    });
    return await this.$fire.firestore.runTransaction((transaction) => {
      transaction.update(funcionarioRef, { activos: this.$fireModule.firestore.FieldValue.arrayUnion(...arrayIdActivos) })
      arrayIdActivos.forEach(idActivo => {
        const activoRef = this.$fire.firestore.collection('activo').doc(idActivo)
        transaction.update(activoRef, { asignadoa: getters.getFuncionarioSeleccionado.id })
        // tendra los siguientes tipos: creado, asignado, desasignado baja, eliminado, editado
        transaction.set(activoRef.collection('historial').doc(), {
          fecha: this.$fireModule.firestore.FieldValue.serverTimestamp(),
          tipo: 'asignado',
          a: { id: state.funcionarioSeleccionado.id, nombre: state.funcionarioSeleccionado.nombre, seccion: state.funcionarioSeleccionado.seccion },
          por: { id: state.authUser.uid, email: state.authUser.email, nombre: state.authUser.displayName }
        })
      });
      commit('commitSetLoading', false)
      return Promise.resolve(true)
    }).then(() => {
      commit('commitSetLoading', false)
      return Promise.resolve(true);
    }).catch((error) => {
      commit('commitSetLoading', false)
      console.log(error)
      return Promise.reject(error);
    })
  },
  async grabaEdicionActivo({ commit, state }, payload) {
    commit('commitSetLoading', true)
    const activoRef = this.$fire.firestore.collection('activo').doc(payload.id)
    return await this.$fire.firestore.runTransaction((transaction) => {
      transaction.update(activoRef, { nombre: payload.nombre, serie: payload.serie, inventario: payload.inventario, tipo: payload.tipo, valor: payload.valor, desc: payload.descripcion })
      
      transaction.set(activoRef.collection('historial').doc(), {
        fecha: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        tipo: 'actualizado',
        por: { id: state.authUser.uid, email: state.authUser.email, nombre: state.authUser.displayName }
      })
      commit('commitSetLoading', false)
      return Promise.resolve(true)
    }).then(() => {
      commit('commitSetLoading', false)
      return Promise.resolve(true);
    }).catch((error) => {
      commit('commitSetLoading', false)
      console.log(error)
      return Promise.reject(error);
    })
  },
  async grabaEdicionFuncionario({ commit }, payload) {
    commit('commitSetLoading', true)
    const funcionarioRef = this.$fire.firestore.collection('funcionario').doc(payload.id)

    await funcionarioRef.update({ nombre: payload.nombre, apellido: payload.apellido, rut: payload.rut, departamento: payload.departamento, seccion: payload.seccion }).then(() => {
      commit('commitSetLoading', false)
      return Promise.resolve(true)
    }).catch((error) => {
      alert('Ha ocurrido un error ' + error)
      return Promise.reject(false)
    })
  },
  actionSetLoading({ commit }, loading) {
    try {
      commit('commitSetLoading', loading)
    } catch (e) {
      alert('Error en sistema ' + e)
    }
  },
  actionSetFuncionarioSeleccionado({ commit }, payload) {
    try {
      commit('commitSetFuncionarioSeleccionado', payload)
    } catch (e) {
      alert('Error en sistema ' + e)
    }
  },
  actionSetActivoSeleccionado({ commit }, payload) {
    try {
      commit('commitSetActivoSeleccionado', payload)
    } catch (e) {
      alert('Error en sistema ' + e)
    }
  },
  addActivoToList({ commit }, payload) {
    try {
      commit('addActivo', payload)
    } catch (e) {
      alert('Error en sistema ' + e)
    }
  },
  deleteActivoFromList({ commit }, payload) {
    try {
      commit('deleteActivo', payload)
    } catch (e) {
      alert('Error en sistema ' + e)
    }
  },
  deleteActivoFromListAlta({ commit }, payload) {
    try {
      commit('deleteActivoAlta', payload)
    } catch (e) {
      alert('Error en sistema ' + e)
    }
  },
  actionSetAltaSeleccionada({ commit }, payload) {
    try {
      commit('commitSetAltaSeleccionada', payload)
    } catch (e) {
      alert('Error en sistema ' + e)
    }
  },
  changeNumeroAltaSeleccionada({ commit }, payload) {
    try {
      commit('changeNumeroAltaSeleccionada', payload)
    } catch (e) {
      alert('Error en sistema ' + e)
    }
  }
}
