import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/lang/index'
Vue.use(Router)
/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: i18n.t('sidebar.dashboard'), icon: 'el-icon-s-platform' }
    }]
  },
  {
    path: '/experiment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Experiment',
        component: () => import('@/views/experiment/index'),
        meta: { title: i18n.t('sidebar.experiment'), icon: 'el-icon-s-help' },
      }
    ]
  },
  // {
  //   path: '/course',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Course',
  //       component: () => import('@/views/course/index'),
  //       meta: { title: i18n.t('sidebar.course'), icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/announcement',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Announcement',
        component: () => import('@/views/announcement/index'),
        meta: { title: i18n.t('sidebar.announcement'), icon: 'el-icon-s-promotion' }
      }
    ]
  },
  // {
  //   path: '/supervision',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Supervision',
  //       component: () => import('@/views/supervistion/index'),
  //       meta: { title: i18n.t('sidebar.supervision'), icon: 'el-icon-s-marketing' }
  //     }
  //   ]
  // },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Comment',
        component: () => import('@/views/comment/index'),
        meta: { title: i18n.t('sidebar.comment'), icon: 'el-icon-s-comment' }
      }
    ]
  },
  // {
  //   path: '/interaction',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Interaction',
  //       component: () => import('@/views/interaction/index'),
  //       meta: { title: i18n.t('sidebar.interaction'), icon: 'el-icon-s-opportunity'}
  //     }
  //   ]
  // },
  // {
  //   path: '/authority',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Authority',
  //       component: () => import('@/views/authority/index'),
  //       meta: { title: i18n.t('sidebar.authority'), icon: 'el-icon-s-custom' }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  那些吃了这条狗的人都相当于吃了他这辈子的shi
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
