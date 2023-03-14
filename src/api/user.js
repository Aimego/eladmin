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
    method: 'POST',
    url: '/user/menu_authority'
  })
}
