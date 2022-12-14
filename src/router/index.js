import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/',
        component: () => import('@/views/home/index')
      },
      {
        path: '/category/:id',
        component: () => import('@/views/category/index')
      },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/category/sub')
      },
      {
        path: '/product/:id',
        component: () => import('@/views/goods/index')
      }
    ]
  },
  // 登录路由
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/login/callback',
    component: () => import('@/views/login/callback')
  },
  // 路由重定向
  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    // 每次切换路由的时候滚动到顶部
    return { top: 0, left: 0 }
  }
})

export default router
