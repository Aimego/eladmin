import Vue from 'vue'
import store from '@/store'

// 自定义全局指令
Vue.directive('PermissionBtns', {
  inserted: (el, vDir) => {
    if (!store.getters.permissionBtns.some(val => val.path === vDir.value)) {
      el.parentNode.removeChild(el)
    }
  }
})
