import request from '@/utils/request'
import objfilters from '@/utils/filters' // 过滤queyr对象，如果对象值为空则不传该key
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
export function getMenu(page, size, query) {
  return request({
    method: 'POST',
    url: '/user/menu_authority',
    data: {
      page,
      size,
      filters: objfilters(query)
    }
  })
}
