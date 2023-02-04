import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import localeEn from 'element-ui/lib/locale/lang/en' // lang i18n
import localeZh from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from '@/store'
import i18n from '@/lang/index'
import '@/icons' // icon
import '@/permission' // permission control
import * as echarts from 'echarts';
import moment from 'moment'
import { format } from '@/utils/format'
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
Date.prototype.$format = format

const locale = store.getters.language === 'zh' ? localeZh : localeEn
store.commit('settings/CHANGE_STYLIZE')
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
