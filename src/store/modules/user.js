import { postLogin, getMenu } from '@/api/user'
import { adminById } from '@/api/profile' // 获取用户信息
import router from '@/router'
import md5 from 'js-md5'
import { getToken, setToken, 
         getUserDetail, setUserDetail,
         removeToken
       } from '@/utils/auth'
import { resetRouter, loadView, noFindRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userDetail: getUserDetail(),
    userRouter: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_USERDETAIL: (state, detail) => {
    state.userDetail = detail
    setUserDetail(detail)
  },
  SET_ROUTES: (state, routes) => {
    state.userRouter = routes
  }
}
const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, code } = userInfo
    return new Promise((resolve, reject) => {
      postLogin({ username: username.trim(), password: md5(password), code: code.trim() }).then(res => {
        commit('SET_TOKEN',res.token)
        commit('SET_USERDETAIL',res.user)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit }) {
      return new Promise((resolve, reject)=> {
        adminById().then(response => {
          const { user } = response
          commit('SET_USERDETAIL',user)
          resolve(response.code)
        }).catch(err => {
          reject(err)
        })
      })
  },
  mapRouter({dispatch},routers) { // 路由组件路径修改
      for(let i = 0; i < routers.length; i++) {
        // if(routers[i].component == 'Layout') {
        //   routers[i].component = Layout
        // }
        for(let j = 0; j < (routers[i].children && routers[i].children.length); j++) {
          let component = routers[i].children[j].component
          console.log(component)
          if(typeof component != 'string') return false // 防止退出登录后 routers[i].children[j].component 已经是一个路径参数了
          routers[i].children[j].component = loadView(component)
          if(routers[i].children[j].children) { 
            dispatch('rankRouter',[routers[i].children[j]]) // 如果有多层结构及递归处理
          }
        }
      }
  },
  setRouter({ commit, dispatch }, myRouter) {
    return new Promise((resolve, reject) => {
        // getMenu().then(res => {
        //   let data = res.data.filter(val => val.path)
        //   console.log(data)
        //   dispatch('mapRouter', data)
        //   console.log(data)
        //   router.options.routes = [...data,...noFindRouter,...router.options.routes]
        //   router.addRoutes(data)
        //   commit('SET_ROUTES', data)
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })

          dispatch('mapRouter', myRouter)
          console.log(myRouter)
          router.options.routes = [...myRouter,...noFindRouter,...router.options.routes]
          router.addRoutes(myRouter)
          commit('SET_ROUTES', myRouter)
          resolve()
    })
  },
  // 清除token
  clearToken({ commit }) {
    removeToken()
    resetRouter()
    commit('RESET_STATE') // 重置state
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

