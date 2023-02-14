import Vue from 'vue'
import VueI18n from 'vue-i18n' // 语言切换
import zh from './zh'
import en from './en'
import store from '@/store'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: store.getters.language,
  messages: {
    'zh': zh,
    'en': en
  }
})
export default i18n
