import request from '@/utils/request'
import objfilters from '@/utils/filters' // 过滤queyr对象，如果对象值为空则不传该key
// 获取角色列表
export function getRoles(page, size, query) {
  return request({
    method: 'POST',
    url: 'roleManagement',
    data: {
      page,
      size,
      filters: objfilters(query)
    }
  })
}

// 获取权限模块列表
export function rolesMenus() {
  return request({
    url: 'roleManagement/roles_authority'
  })
}

// 添加角色
export function addRole(form) {
  return request({
    method: 'POST',
    url: 'roleManagement/addRole',
    data: form
  })
}

// 编辑角色
export function editRole(form) {
  return request({
    method: 'POST',
    url: 'roleManagement/editRole',
    data: form
  })
}

// 删除角色
export function deleteRole(arr) {
  return request({
    method: 'POST',
    url: 'roleManagement/deleteRole',
    data: {
      roles: arr
    }
  })
}
