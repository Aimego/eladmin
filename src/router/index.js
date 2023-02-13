import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/lang/index'
Vue.use(Router)
/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/admin/index'),
      meta: { title: '工作台', icon: 'el-icon-s-platform' }
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect:'/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Profile',
        component: () => import('@/views/profile/index'),
        meta: { title: i18n.t('sidebar.profile')}
      }
    ]
  },
  {
    path: '/interface',
    component: Layout,
    redirect: '/interface/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Interface',
        component: () => import('@/views/interface/index'),
        meta: { title: '接口对接' }
      }
    ]
  }
]

export const noFindRouter = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.options.routes = newRouter.options.routes
  router.matcher = newRouter.matcher // reset router
}

export const loadView = (view) => { // 路由异步懒加载
  return (resolve) => {
    require([`@/views${view}`], resolve)
  }
}

export default router
