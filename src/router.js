import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/views/Chat.vue'
import Register from '@/views/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/chat/:id',
      name: 'chat',
      component: Chat
    },
    {
      path: '/',
      name: 'register',
      component: Register
    }
  ]
})
