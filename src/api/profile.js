import request from '@/utils/request'

// 查看用户信息
export function adminById() {
  return request({
    url: '/user'
  })
}

// 上传用户头像
export function adminImages(avatar) {
  return request({
    method: 'POST',
    url: '/user/uploadAvatar',
    data: { avatar }
  })
}

// 修改用户信息
export function adminUpdate(form) {
  return request({
    method: 'POST',
    url: '/user/updateUser',
    data: form
  })
}

// 修改用户密码
export function PassUpdate(form) {
  return request({
    method: 'POST',
    url: '/user/updatePass',
    data: form
  })
}
