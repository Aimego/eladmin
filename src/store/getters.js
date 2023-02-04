const getters = {
  sidebar: state => state.app.sidebar,
  sidebarLanguage: state => state.settings.sidebarLanguage,
  language: state => state.settings.language,
  stylize: state => state.settings.stylize,
  device: state => state.app.device,
  token: state => state.user.token,
  refresh_token: state => state.user.refresh_token,
  userInfo : state => state.user.userDetail,
  userRouter: state => state.user.userRouter
}
export default getters
