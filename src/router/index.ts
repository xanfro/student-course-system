import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
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
