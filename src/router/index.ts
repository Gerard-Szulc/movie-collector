import {createRouter, RouteRecordRaw, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () => import(/* webpackChunkName: "about" */ '../views/Favorite.vue')
  },
  {
    path: '/search',
    name: 'search-results',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/movie/:id',
    name: 'movie',
    props: true,
    component: () => import(/* webpackChunkName: "movie" */ '../views/Movie.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
