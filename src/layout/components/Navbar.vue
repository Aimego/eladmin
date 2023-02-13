<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="breadcrumb-container" />
    </div>

    <div class="right-menu">
      <el-dropdown class="language" @command="SelectLanguage">
        <div>
          <i class="el-icon-rank" />
          <span>{{ language | formatLanguage }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh" :disabled="language == 'zh'">中文</el-dropdown-item>
          <el-dropdown-item command="en" :disabled="language == 'en'">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <i class="el-icon-caret-bottom" />
          <img :src="userInfo.avatar" class="user-avatar">
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/profile">
            <el-dropdown-item>
              <i class="el-icon-s-custom"></i>个人信息
            </el-dropdown-item>
          </router-link>
          <router-link to="/interface">
            <el-dropdown-item>
                <i class="el-icon-s-opportunity"></i>接口对接
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <i class="el-icon-switch-button"></i>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { resetRouter } from '@/router'
import { mapGetters, mapMutations } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebarLanguage',
      'language',
      'sidebar',
      'userInfo',
      'token',
      'refresh_token'
    ]),
  },
  filters:{
    formatLanguage(mes){
      switch(mes){
        case 'zh' : return '中文';
        case 'en' : return 'English'
      }
    }
  },
  methods: {
    ...mapMutations('settings',['CHANGE_LANGUAGE']),
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    SelectLanguage(command) {
      this.CHANGE_LANGUAGE(command)
      this.$i18n.locale = command
      window.location.reload()
    },
    logout() {
      this.$store.dispatch('user/clearToken')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
  color: var(--fontColor) !important;
}

.navbar {
  height: 85px;
  overflow: hidden;
  position: relative;
  background-color: var(--bgColor);
  display: flex;
  align-items: center;
  justify-content: space-between;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);
  box-shadow: var(--bgColor);

  .hamburger-container {
    // line-height: 46px;
    // height: 100%;
    // float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    // float: left;
  }
  .left-menu{
    display: flex;
    align-items: center;
  }
  .right-menu {
    display: flex;
    align-items: center;
    // float: right;
    // height: 100%;
    // line-height: 50px;
    &:focus {
      outline: none;
    }

    .language{
      cursor: pointer;
      font-size: 14px;
      // display: flex;
      // align-items: center;
      margin-right: 20px;
      span{
        margin-left: 5px;
      }
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 20px;
      .avatar-wrapper {
        // margin-top: 5px;
        // position: relative;
        display: flex;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 30px;
          overflow: hidden;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          margin-right: 5px;
          // position: absolute;
          // left: -20px;
          // top: 50%;
          // transform: translateY(-50%);
          // font-size: 12px;
        }
      }
    }
  }
}
</style>
