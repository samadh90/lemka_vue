import ApiService from "@/services/api.service";

export const DevisModule = {
    namespaced: true,
    state: {
        deviss: [],
        loadingStatus: false,
    },
    getters: {
        deviss: state => state.deviss,
        devis: state => id => {
            return state.deviss.find(item => item.id === id)
        },
        devisNumberDevis: state => numero_devis => {
            return state.deviss.find(item => item.numero_devis === numero_devis)
        },
        devisAccepte: state => {
          return state.deviss.filter(item => item.est_accepte === true)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_DEVISS_SUCCESS(state, payload) {
            state.deviss = payload
        },
        SET_DEVISS_FAILURE(state) {
            state.deviss = []
        },
        LOADING_STATUS(state, payload) {
            state.loadingStatus = payload
        },
        ADD_DEVIS(state, payload) {
            state.deviss.push(payload)
        },
        UPDATE_DEVIS(state, payload) {
            const index = state.deviss.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.deviss.splice(index, 1, payload)
            }
        },
        STATUS_DEVIS(state, [devis_id, payload]) {
            const index = state.deviss.findIndex(item => item.id === devis_id)
            if (index !== -1) {
                state.deviss[index].est_accepte = payload
            }
        },
        DELETE_DEVIS(state, payload) {
            const index = state.deviss.map(item => item.id).indexOf(payload.id)
            if (index !== -1) {
                state.deviss.splice(index, 1)
            }
        },
        ADD_DETAIL(state, [devis_id, payload]) {
            const index = state.deviss.findIndex(item => item.id === devis_id)
            if (index !== -1) {
                state.deviss[index].details.push(payload)
            }
        },
        UPDATE_DETAIL(state, [devis_id, payload]) {
            const devisIndex = state.deviss.findIndex(item => item.id === devis_id)
            if (devisIndex !== -1) {
                const detailIndex = state.deviss[devisIndex].details.findIndex(item => item.id === payload.id)
                if (detailIndex !== -1) {
                    state.deviss[devisIndex].details.splice(detailIndex, 1, payload)
                }
            }
        },
        DELETE_DETAIL(state, [devis_id, payload]) {
            const devisIndex = state.deviss.findIndex(item => item.id === devis_id)
            if (devisIndex !== -1) {
                const detailIndex = state.deviss[devisIndex].details.map(item => item.id).indexOf(payload.id)
                if (detailIndex !== -1) {
                    state.deviss[devisIndex].details.splice(detailIndex, 1)
                }
            }
        }
    },
    actions: {
        loadDevis: function ({commit}) {
            let endpoint = `devis/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_DEVISS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_DEVISS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createDevis: function ({commit}, payload) {
            let endpoint = `devis/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_DEVIS', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateDevis: function ({commit}, payload) {
            let endpoint = `devis/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_DEVIS', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateDevisState: function({commit}, [devid_id, payload]) {
          let endpoint = `profil/devis/${devid_id}/`;
          return new Promise((resolve, reject) => {
              ApiService.PUTData(endpoint, payload).then(r => {
                  commit('STATUS_DEVIS', [devid_id, r.data])
                  resolve(r.data)
              }, error => {
                  reject(error)
              })
          })
        },
        createDetail: function ({commit}, [devis_id, payload]) {
            let endpoint = `devis/${devis_id}/details/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_DETAIL', [devis_id, r.data])
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateDetail: function ({commit}, [devis_id, payload]) {
            let endpoint = `devis/${devis_id}/details/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_DETAIL', [devis_id, r.data])
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteDetail: function ({commit}, [devis_id, payload]) {
            let endpoint = `devis/${devis_id}/details/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_DETAIL', [devis_id, payload])
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        },
        loadUserDevis: function ({commit}) {
            let endpoint = `profil/devis/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_DEVISS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_DEVISS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
    }
}