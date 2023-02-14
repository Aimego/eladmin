import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import store from './store'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (to.path !== '/login') { // path 不为 login 则每次跳转页面都校验token是否存在
    if (hasToken) {
      if (store.getters.userRouter.length === 0) {
        await store.dispatch('user/setRouter')
        next({ path: to.fullPath, replace: true })
      }
      next()
    } else {
      next({ path: '/login' })
    }
  } else { // path 为 login 则校验缓存token是否被清空了，如果没清空则不跳转
    if (hasToken) {
      next({ path: from.path })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
