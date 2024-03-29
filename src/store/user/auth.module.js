import ApiService from "@/services/api.service";
import jwt_decode from "jwt-decode"

// const user = JSON.parse(sessionStorage.getItem('user'));
// const initialState = user
//     ? {status: {loggedIn: true}, user}
//     : {status: {loggedIn: false}, user: null};
// state: initialState,

const user = JSON.parse(localStorage.getItem('user'));

export const AuthModule = {
    namespaced: true,
    state: {
        status: {
            loggedIn: !!user
        },
        user: user ? user : null
    },
    getters: {
        loggedIn: state => state.status.loggedIn,
        user: state => {
            if (state.user !== null) {
                let token = state.user.access
                return jwt_decode(token)
            } else {
                return null
            }
        }
    },
    actions: {
        login: function ({commit}, payload) {
            let endpoint = `auth/login/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('LOGIN_SUCCESS', r.data)
                    // sessionStorage.setItem('user', JSON.stringify(r.data));
                    localStorage.setItem('user', JSON.stringify(r.data));
                    resolve(r.data)
                }, error => {
                    commit('LOGIN_FAILURE')
                    reject(error)
                })
            })
        },
        logout({commit}) {
            ApiService.DESTROYSession();
            commit('LOGOUT');
        },
        register({commit}, payload) {
            let endpoint = `auth/register/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('REGISTER_SUCCESS')
                    resolve(r.data)
                }, error => {
                    commit('REGISTER_FAILURE')
                    reject(error)
                })
            })
        }
    },
    mutations: {
        LOGIN_SUCCESS(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        LOGIN_FAILURE(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        LOGOUT(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        REGISTER_SUCCESS(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        REGISTER_FAILURE(state) {
            state.status.loggedIn = false;
            state.user = null;
        }
    },
};