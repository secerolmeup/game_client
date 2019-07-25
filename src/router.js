import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
<<<<<<< HEAD
import Landing from './views/Landing.vue'
// import Chat from '@/views/Chat.vue'
// import Register from '@/views/Register.vue'
import Game from '@/views/game'

=======
import Game from '@/views/game'
>>>>>>> game sedikit lagi jadi, aturan2nya baru dibikin
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/chat/:id',
    //   name: 'chat',
    //   component: Chat
    // },
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/room/:roomId',
      name: 'room',
      component: () => import(/* webpackChunkName: "about" */ './views/Room.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    }
  ]
})