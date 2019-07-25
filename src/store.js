import Vue from 'vue'
import Vuex from 'vuex'
import db from "./firebase/config"
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Rooms : [],
    JoinedRoom : {}
  },
  mutations: {
    createRoom(state,payload){
      router.push(`/room/${localStorage.roomId}`)
    },
    showRoom(state,payload){
      state.Rooms = payload
    },
    joinRoom(state,payload){
      state.JoinedRoom = payload
      router.push(`/room/${localStorage.roomId}`)
    }
  },
  actions: {
    createNewRoom : function({ commit , state }, data){
      let x = localStorage.getItem('username')
      db.collection('lobby').add({
        name : data.room,
        players: [{
          name : x,
          position : 0,
          roomMaster : true
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
    joinRoom({commit,state},{roomToJoin}){
      // console.log(roomToJoin)
      let newPlayer = {
          name : localStorage.username,
          position : 0
      }
      roomToJoin.players.push(newPlayer)
      db.collection('lobby').doc(roomToJoin.id).set(roomToJoin)
      .then(()=>{
        commit('joinRoom',roomToJoin)
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }
})
