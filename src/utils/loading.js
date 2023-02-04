import Vue from 'vue'
export default function Loading(dom){
    return Vue.prototype.$loading({
      lock: true, // 加载中禁止滑动
      text: 'Loading',
      spinner: 'el-icon-loading',
      target: dom
    })
}