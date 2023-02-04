import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  language: window.sessionStorage.getItem('language') || 'zh',
  stylize: {}
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_LANGUAGE: (state, lang) => {
    state.language = lang
    window.sessionStorage.setItem('language',lang)
  },
  CHANGE_STYLIZE: (state) => {
    const dom = getComputedStyle(document.documentElement)
    state.stylize = {
      'bgColor': dom.getPropertyValue('--bgColor'),
      'fontColor': dom.getPropertyValue('--fontColor'),
      'loadingColor': dom.getPropertyValue('--loadingbgColor')
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

