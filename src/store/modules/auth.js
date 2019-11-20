import jwtDecode from 'jwt-decode'

const state = {
  token: null,

}

const mutations = {
  setToken: function(state, token){
    state.token = token
  }
}

const actions = {
  login: function(options, token){
    options.commit('setToken', token)
  },
  logout: function(options){
    options.commit('setToken', null)
  }
}

const getters = {
  isAuthenticated: function(state){
    return state.token ? true : false
  },
  requestHeader: function(){
    return {
      headers: {
        Authorization: "JWT " + state.token
      }
    }
  },
  userId: function(state){
    return state.token ? jwtDecode(state.token).user_id : null
  }
}

export default {
  state,
  mutations,
  actions,
  getters,

}