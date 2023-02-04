import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { refreshToken } from '@/api/user'
import router from '@/router'
let refreshFlag = true // 续签节流阀(防止多次请求后出现多次续签)
let sign_timer = '' // 登录超时显示防抖
let token_timer = '' // token超时显示防抖
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'https://ilab-x.jxust.edu.cn/jxustapi',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})
const refreshApi = (token, config) => {
  refreshToken(token).then(res => {
      refreshFlag = true
      store.dispatch('user/resetToken',res.data)
      service(config)
      location.reload()
  })
}
// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['access_token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const data = response.data
    if(data.code === 51 && refreshFlag) {
      refreshFlag = false
      Message.warning('正在重新连接服务器 ~')
      refreshApi(store.getters.refresh_token, response.config)
    }else if(data.code != undefined && data.code != 200 && refreshFlag) {
      console.log(data.code)
      if(token_timer) clearTimeout(token_timer)
      token_timer = setTimeout(() => {
        Message({
          message: data.errorMessage || data.data,
          type: 'warning',
          duration: 5 * 1000
        })
      }, 500);
    }else if(data.code === 54 || data.code === 50) {
      if(sign_timer) clearTimeout(sign_timer)
      sign_timer = setTimeout(() => {
        Message.warning('登录超时，请您重新登录!')
        store.dispatch('user/clearToken')
        router.push('/login')
      }, 500);      
    }
    return data
  })

export default service
