import Vue from 'vue'
import Vuex from 'vuex'
import db from "./firebase/config"
import { stat } from 'fs';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Rooms : []
  },
  mutations: {
    createRoom(state,payload){
      console.log('sudah');
    },
    showRoom(state,payload){
      state.Rooms = payload
    }
  },
  actions: {
    createNewRoom : function({ commit , state }, data){
      let x = localStorage.getItem('username')
      db.collection('lobby').add({
        name : data.room,
        players: [{
          name : x,
          position : 0
        }],
      })
      .then(function(docRef){
        localStorage.setItem('roomId', docRef.id)
        commit('createRoom')
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getExistRoom : function({commit, state}){
      db.collection('lobby').onSnapshot(querySnapshot => {
        let rooms = []
        querySnapshot.forEach(doc => {
          let newData = {
            id : doc.id,
            name: doc.data().name,
            players: doc.data().players
          }
          rooms.unshift(newData)
        });
        commit('showRoom', rooms)
      });
    },
    joinRoom({commit,state},payload){
      let ayam = state.Rooms.filter(el => el.id == payload.id)
      ayam[0].players.push(localStorage.getItem('username'))

      db.collection('lobby').doc(payload.id).set(ayam[0])
      .then(()=>{
        console.log('berhasil');
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }
})
