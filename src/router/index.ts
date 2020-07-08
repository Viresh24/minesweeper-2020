import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import GameGrid from '../components/GameGrid.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: GameGrid
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: GameGrid
  }
]

const router = new VueRouter({
  routes
})

export default router
