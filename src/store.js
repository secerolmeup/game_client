import Vue from 'vue'
import Vuex from 'vuex'
import db from "./firebase/config"
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Rooms: [],
    JoinedRoom: {}
  },
  mutations: {
    createRoom(state, payload) {
      console.log(payload);
      state.JoinedRoom = payload
      router.push(`/room/${localStorage.roomId}`)
    },
    showRoom(state, payload) {
      state.Rooms = payload
    },
    joinRoom(state, payload) {
      console.log(payload, 'ini masuk');
      state.JoinedRoom = payload
      console.log(state.JoinedRoom);
      router.push(`/room/${localStorage.roomId}`)
    },
    currentRoom(state, payload) {
      state.JoinedRoom = payload
    },
    leftRoom(state) {
      localStorage.removeItem('roomId')
      state.JoinedRoom = {}
      router.push('/')
    }
  },
  actions: {
    createNewRoom: function ({
      commit,
      state
    }, data) {
      let x = localStorage.getItem('username')
      db.collection('lobby').add({
          name: data.room,
          players: [{
            name: x,
            position: 0,
          }],
          roomMaster: x,
          messages: []
        })
        .then(function (docRef) {
          localStorage.setItem('roomId', docRef.id)
          let found = state.Rooms.filter(el => el.id == docRef.id)
          console.log(found);
          commit('createRoom', found[0])
        })
        .catch(err => {
          console.log(err)
        })
    },
    getExistRoom: function ({
      commit,
      state
    }) {
      db.collection('lobby').onSnapshot(querySnapshot => {
        let rooms = []
        querySnapshot.forEach(doc => {
          let newData = {
            id: doc.id,
            name: doc.data().name,
            players: doc.data().players
          }
          rooms.unshift(newData)
        });
        commit('showRoom', rooms)
      });
    },
    joinRoom({
      commit,
      state
    }, {
      roomToJoin
    }) {
      // console.log(roomToJoin)
      let newPlayer = {
        name: localStorage.username,
        position: 0
      }
      roomToJoin.players.push(newPlayer)
      db.collection('lobby').doc(roomToJoin.id).update(roomToJoin)
        .then(() => {
          commit('joinRoom', roomToJoin)
        })
        .catch((err) => {
          console.log(err);
        })
    },
    leftRoom: function ({
      commit,
      state
    }) {
      let found = state.JoinedRoom.players.filter(el => {
        if (el.name != localStorage.username) {
          return el
        }
      })
      state.JoinedRoom.players = found
      db.collection('lobby').doc(state.JoinedRoom.id).update(state.JoinedRoom)
        .then(() => {
          commit('leftRoom')
        })
        .catch((err) => {
          console.log(err);
        })

    },
    currentRoom({
      commit,
      state
    }, data) {
      db.collection("lobby").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().id == data) {
            commit('currentRoom', doc.data())
          }
        })
      });
    },
    updatepoint({
      commit,
      state
    }, data) {
      let room = state.Rooms.filter(el => el.id == data.myroom)
      room[0].players.forEach(el => {
       if( el.name == localStorage.getItem('username')){
         el.position = data.point
       }
      })

      db.collection("lobby").doc(data.myroom).update(room[0].players)
      .then(data =>{
        console.log(data)
      }) 
      .catch(err=>{
        console.log(err)
      })

    }
  }
})
