import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // baseURL: 'http://localhost:8001',
})

// console.log(process.env)
// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization'] = getToken()
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
    if (data.code !== undefined && data.code !== 200) {
      Message({
        message: data.message,
        type: 'warning',
        duration: 5000
      })
    } else {
      return data
    }
  }
)

export default service
