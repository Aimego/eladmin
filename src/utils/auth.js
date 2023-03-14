// import Cookies from 'js-cookie'

const TokenKey = 'jw_Token'
const Refresh_TokenKey = 'jw_Refresh_Token'
const UserDetail = 'jw_UserDetail'
const permissionBtns = 'jw_PermissionBtns'

export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}

export function getRefreshToken() {
  return window.sessionStorage.getItem(Refresh_TokenKey)
}

export function getUserDetail() {
  return JSON.parse(window.sessionStorage.getItem(UserDetail))
}

export function getPermissionBtns() {
  return JSON.parse(window.sessionStorage.getItem(permissionBtns))
}

export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
}

export function setRefreshToken(token) {
  return window.sessionStorage.setItem(Refresh_TokenKey, token)
}

export function setUserDetail(detail) {
  return window.sessionStorage.setItem(UserDetail, JSON.stringify(detail))
}

export function setPermissionBtns(permission) {
  return window.sessionStorage.setItem(permissionBtns, JSON.stringify(permission))
}

export function removeToken() {
  return window.sessionStorage.clear()
}
