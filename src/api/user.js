import request from '@/utils/request'

// 生成验证码
export function getVerification() {
  return request({
    url: '/captcha'
  })
}

// 密码登录
export function postLogin(form) {
  return request({
    method: 'POST',
    url: '/login',
    data: form
  })
}

// 用户菜单获取
export function getMenu() {
  return request({
    url: '/user/menu_authority'
  })
}

// 续签token
export function refreshToken(renew) {
  return request({
    url: '/api/currency/login/refreshToken',
    params:{
      renew
    }
  })
}
