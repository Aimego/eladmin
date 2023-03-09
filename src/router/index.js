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
      component: () => import('@/views/dashboard'),
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
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Profile',
        component: () => import('@/views/profile/index'),
        meta: { title: i18n.t('sidebar.profile') }
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
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   alwaysShow: true,
  //   hidden: false,
  //   meta: { title: '层级结构', icon: 'el-icon-menu' },
  //   children: [
  //     {
  //       path: 'menu1',
  //       name: 'Menu1',
  //       component: () => import('@/views/nested/menu1/index.vue'),
  //       meta: { title: 'menu1', icon: 'el-icon-menu'},
  //       redirect: 'noRedirect',
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           name: 'Menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           meta: { title: 'menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           name: 'Menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           meta: { title: 'menu1-2' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       name: 'Menu2',
  //       component: () => import('@/views/nested/menu2'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // }
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
