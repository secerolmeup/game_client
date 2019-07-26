import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Landing from './views/Landing.vue'
// import Chat from '@/views/Chat.vue'
// import Register from '@/views/Register.vue'
import Game from '@/views/game'
import Chat from '@/views/Chat'


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
      path: '/chat/:id',
      name: 'chat',
      component: Chat
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home
    },
    {
      path: '/landing',
      name: 'landing',
      component: Landing
    },
    {
      path: '/room/:roomId',
      name: 'room',
      component: () => import(/* webpackChunkName: "about" */ './views/Room.vue')
    },
    {
      path: '/game/:roomId',
      name: 'game',
      component: Game
    }
  ]
})