import request from '@/utils/request'

// 更改目录菜单可见
export function visibleMenuCatalog(_id, status) {
  return request({
    method: 'POST',
    url: '/menuManagement/visibleMenu_catalog',
    data: {
      _id, status
    }
  })
}

// 更改菜单栏可见
export function visibleMenuItem(_id, status) {
  return request({
    method: 'POST',
    url: '/menuManagement/visibleMenu_item',
    data: {
      _id, status
    }
  })
}

class FormatMenuForm {
  constructor(form) {
    this.path = form.path
    this.alwaysShow = form.alwaysShow
    this.name = form.name
    this.component = form.topClass ? 'Layout' : form.component
    this.hidden = form.hidden
    this.meta = {
      title: form.title,
      sort: form.sort,
      icon: form.icon
    }
    this.redirect = form.alwaysShow ? 'noRedirect' : form.redirect
    this.pid = form.pid
  }
}

// 添加主菜单
export function addMenuCatalog(form) {
  const menuItem = new FormatMenuForm(form)
  return request({
    method: 'POST',
    url: '/menuManagement/addRouter_catalog',
    data: menuItem
  })
}

// 编辑主菜单
export function editMenuCatalog(form) {
  const menuItem = new FormatMenuForm(form)
  return request({
    method: 'POST',
    url: '/menuManagement/editRouter_catalog',
    data: menuItem
  })
}

// 添加子菜单
export function addMenuItem(form) {
  const menuItem = new FormatMenuForm(form)
  return request({
    method: 'POST',
    url: '/menuManagement/addRouter_item',
    data: menuItem
  })
}

// 编辑子菜单
export function editMenuItem(form) {
  const menuItem = new FormatMenuForm(form)
  return request({
    method: 'POST',
    url: '/menuManagement/editRouter_item',
    data: menuItem
  })
}

// 删除菜单
export function deleteMenu(arr) {
  return request({
    method: 'POST',
    url: '/menuManagement/deleteRouter',
    data: {
      menusId: arr
    }
  })
}
