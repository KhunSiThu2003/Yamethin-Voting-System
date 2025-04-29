import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Results from '@/views/Results.vue'
import SelectYear from '@/views/SelectYear.vue'
import SelectMajor from '@/views/SelectMajor.vue'
import StudentForm from '@/views/StudentForm.vue'
import ProfileForm from '@/views/ProfileForm.vue'
import LoginForm from '@/views/LoginForm.vue'
import Vote from '@/views/Vote.vue'
import Candidate from '@/views/Candidate.vue'

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
  },
  {
    path: '/studentform',
    name: 'studentform',
    component: StudentForm,
  },
  {
    path: '/profileform',
    name: 'profileform',
    component: ProfileForm,
  },
  ,
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/vote',
    name: 'vote',
    component: Vote,
  },
  {
    path: '/candidate/:id',
    name: 'candidate',
    component: Candidate,
    props: true,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
