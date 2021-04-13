import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Home = () => import('../views/Home.vue')
const Game = () => import('../views/Game.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { transition: 'fade' }
  },
  {
    path: '/room/:id',
    name: 'Game',
    component: Game,
    meta: { transition: 'fade' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
