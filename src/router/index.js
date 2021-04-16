import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Desktop from '@/views/Desktop'
import Questionario from '@/components/plugins/tsi/questionario'
import Initial from '@/components/plugins/tsi/initial'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  { 
    path: '/desktop',
    name: 'Desktop',
    component: Desktop
  },
  {
    path: '/survey',
    name: 'Survey',
    component: Initial
  },
  {
    path: '/quest/:id',
    name: 'Questionario',
    component : Questionario
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
