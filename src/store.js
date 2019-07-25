import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: []
  },
  mutations: {
    SET_PLAYER (state, payload) {
      state.players = payload
    }
  },
  actions: {

  }
})
