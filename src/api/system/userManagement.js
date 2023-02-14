import request from '@/utils/request'
import objfilters from '@/utils/filters' // 过滤queyr对象，如果对象值为空则不传该key

// 获取用户列表
export function getUsers(page, size, query) {
  return request({
    method: 'POST',
    url: 'userManagement',
    data: {
      page,
      size,
      filters: objfilters(query)
    }
  })
}

// 添加用户
export function addUser(form) {
  return request({
    method: 'POST',
    url: 'userManagement/addUser',
    data: form
  })
}

// 编辑用户
export function editUser(form) {
  return request({
    method: 'POST',
    url: 'userManagement/editUser',
    data: form
  })
}

// 删除用户
export function deleteUser(arr) {
  return request({
    method: 'POST',
    url: 'userManagement/deleteUser',
    data: {
      users: arr
    }
  })
}
