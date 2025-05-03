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
import Policies from '@/views/Policies.vue'
import Contact from '@/views/Contact.vue'
import Role from '@/views/Role.vue'
import TeacherForm from '@/views/TeacherForm.vue'


const routes = [
  {
    path: '/',
    name: 'role',
    component: Role
  },
  {
    path: '/home',
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
  ,
  {
    path: '/teacherform',
    name: 'teacherform',
    component: TeacherForm,
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
  },
  {
    path: '/policies',
    name: 'policies',
    component: Policies,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
