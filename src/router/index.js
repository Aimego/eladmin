import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/lang/index'
Vue.use(Router)
/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index2'),
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

export const adminRouter = [
  // 教务端路由
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: '/dashboard/admin/index',
      meta: { title: '工作台', icon: 'el-icon-s-platform' }
    }]
  },
  {
    path: '/experiment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Experiment',
        component: '/experiment/admin/index',
        meta: { title: '实验管理', icon: 'el-icon-s-help' },
      }
    ]
  },
  {
    path: '/announcement',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Announcement',
        component: '/announcement/index',
        meta: { title: '公告管理', icon: 'el-icon-s-promotion' }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Comment',
        component: '/comment/index',
        meta: { title: '评论管理', icon: 'el-icon-s-comment' }
      }
    ]
  }
]

export const teacherRouter = [
    // 老师端路由表
    {
      path: '/',
      component: Layout,
      redirect: '/teacher',
      children: [{
        path: 'teacher',
        name: 'Dashboard',
        component: '/dashboard/teacher/index',
        meta: { title: '工作台', icon: 'el-icon-s-platform' }
      }]
    },
    {
      path: '/teacher_experiment',
      component: Layout,
      name: 'Experiment',
      meta: { title: '实验管理', icon: 'el-icon-s-help'},
      redirect: '/teacher_experiment/index',
      children: [
        {
          path: 'index',
          name: 'Experiment',
          component: '/experiment/teacher/index',
          meta: { title: '实验管理', icon: 'el-icon-s-help', breadcrumb: false},
        },{
          hidden: true,
          path: 'score/:id',
          name: 'Score',
          component: '/experiment/teacher/childrenComponents/scorePreview/index',
          meta: { title: '成绩查看' }
        },{
          hidden: true,
          path: 'analysis/:id',
          name: 'Analysis',
          component: '/experiment/teacher/childrenComponents/analysisExperiment/index',
          meta: { title: '数据分析' }
        }
      ]
    },
    {
      path: '/beginsCourse',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'BeginsCourse',
          component: '/beginsCourse/index',
          meta: { title: '开课属性', icon: 'form' }
        }
      ]
    },
    {
      path: '/classManagement',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'classManagement',
          component: '/classManagement/index',
          meta: { title: '班级管理', icon: 'el-icon-user-solid' }
        }
      ]
    },
    {
      path: '/questionBank',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'QuestionBank',
          component: '/questionBank/index',
          meta: { title: '题库管理', icon: 'el-icon-s-opportunity' }
        }
      ]
    }
]

export const myAdminRouter = [
  {
    "id": 2,
    "name": "工作台1",
    "path": "/",
    "component": "Layout",
    "redirect": "/dashboard",
    "icon": null,
    "children": [
      {
        "id": 3,
        "name": "工作台1",
        "path": "dashboard",
        "component": "/dashboard/admin/index",
        "redirect": null,
        "icon": "el-icon-s-platform",
        "children": null,
        "meta": {
          "title": "工作台1",
          "icon": "el-icon-s-platform"
        }
      }
    ],
    "meta": null
  },
  {
    "id": 8,
    "name": "实验统计",
    "path": "/experiment",
    "component": "Layout",
    "redirect": null,
    "icon": null,
    "children": [
      {
        "id": 9,
        "name": "实验统计",
        "path": "index",
        "component": "/experiment/index",
        "redirect": null,
        "icon": "el-icon-s-help",
        "children": null,
        "meta": {
          "title": "实验统计",
          "icon": "el-icon-s-help"
        }
      }
    ],
    "meta": null
  },
  {
    "id": 18,
    "name": "公告管理",
    "path": "/announcement",
    "component": "Layout",
    "redirect": null,
    "icon": null,
    "children": [
      {
        "id": 19,
        "name": "公告管理",
        "path": "index",
        "component": "/announcement/index",
        "redirect": null,
        "icon": "el-icon-s-promotion",
        "children": null,
        "meta": {
          "title": "公告管理",
          "icon": "el-icon-s-promotion"
        }
      }
    ],
    "meta": null
  },
  {
    "id": 20,
    "name": "评价管理",
    "path": "/comment",
    "component": "Layout",
    "redirect": null,
    "icon": null,
    "children": [
      {
        "id": 21,
        "name": "评价管理",
        "path": "index",
        "component": "/comment/index",
        "redirect": null,
        "icon": "el-icon-s-comment",
        "children": null,
        "meta": {
          "title": "评价管理",
          "icon": "el-icon-s-comment"
        }
      }
    ],
    "meta": null
  },
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

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
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
