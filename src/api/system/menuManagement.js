import request from '@/utils/request'
import objfilters from '@/utils/filters' // 过滤queyr对象，如果对象值为空则不传该key

// 用户菜单获取
export function getMenu_Managements(page, size, query) {
  return request({
    method: 'POST',
    url: '/menuManagement/menu_Management',
    data: {
      page,
      size,
      filters: objfilters(query)
    }
  })
}

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

// 更改按钮可见
export function visibleMenuBtn(_id, status) {
  return request({
    method: 'POST',
    url: '/menuManagement/visibleMenu_btn',
    data: {
      _id, status
    }
  })
}

// 菜单栏Format
class FormatMenuForm {
  constructor(form) {
    this._id = form._id
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

// 按钮Format
class FormatBtnForm {
  constructor(form) {
    this._id = form._id
    this.pid = form.pid,
    this.name = form.title,
    this.path = form.path,
    this.sort = form.sort,
    this.hidden = form.hidden
  }
}

export class TransFormatMenuAndItemForm {
  constructor(form) {
    this.type = form.component === 'Layout' ? 0 : 1
    this._id = form._id
    this.path = form.path
    this.alwaysShow = form.alwaysShow
    this.name = form.name
    this.topClass = form.component === 'Layout'
    this.component = form.component
    this.hidden = form.hidden
    this.title = form.meta.title
    this.icon = form.meta.icon
    this.sort = form.meta.sort
    this.redirect = form.redirect
    this.pid = form.pid
  }
}

export class TransFormatBtnForm {
  constructor(form) {
    this.type = 2
    this._id = form._id
    this.pid = form.pid
    this.sort = form.sort
    this.title = form.name
    this.path = form.path
    this.hidden = form.hidden
    this.topClass = false
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

// 添加按钮
export function addMenuBtn(form) {
  const btnItem = new FormatBtnForm(form)
  return request({
    method: 'POST',
    url: '/menuManagement/addRouter_btn',
    data: btnItem
  })
}

// 编辑按钮
export function editMenuBtn(form) {
  const btnItem = new FormatBtnForm(form)
  return request({
    method: 'POST',
    url: '/menuManagement/editRouter_btn',
    data: btnItem
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
