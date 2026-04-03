import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('../views/StudentManager.vue')
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('../views/CourseManage.vue')
    }
  ]
})

export default router
