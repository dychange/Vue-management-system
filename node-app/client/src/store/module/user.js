import types from '../mutation-types'
const {SET_IS_AUTHENTICATED, SET_USER} = types

const state = {
    isAuthenticated: false, //是否认证
    user: {}    //存储用户信息
}

const getters = {
    isAuthenticated : state => state.isAuthenticated,
    user: state => state.user
}

const mutations = {
    [SET_IS_AUTHENTICATED](state, params) {
        if(params) 
            state.isAuthenticated = params
        else 
            state.isAuthenticated = false
    },
    [SET_USER](state, params) {
        if(params)
            state.user = params
        else 
            state.user = {}
    }
}

const actions = {
    setIsAuthenticated: ({commit}, isAuthenticated) => {
        commit(SET_IS_AUTHENTICATED, isAuthenticated)
    },
    setUser: ({commit}, user) => {
        commit(SET_USER, user)
    },
    clearCurrent: ({commit}) => {
        commit(SET_IS_AUTHENTICATED, false)
        commit(SET_USER, null)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}