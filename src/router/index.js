import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Results from '@/views/Results.vue'
import SelectYear from '@/views/SelectYear.vue'
import SelectMajor from '@/views/SelectMajor.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/results',
    name: 'results',
    component: Results,
  },
  {
    path: '/selectyear',
    name: 'selectyear',
    component: SelectYear,
  },
  {
    path: '/selectmajor',
    name: 'selectmajor',
    component: SelectMajor,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
