<template>
  <div class="login" :style="'background-image:url('+ Background +');'">
    <!-- <img src="@/assets/loginBackground.png" alt="" class="wall"> -->
    <el-form ref="loginForm" class="login-Form" :model="loginForm" :rules="loginRules">
      <h3>虚拟仿真实验教学后端管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名">
          <svg-icon slot="prefix" icon-class="user" class="icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" show-password placeholder="密码">
          <svg-icon slot="prefix" icon-class="password" class="icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="username">
        <div class="Img-code">
          <el-input v-model="loginForm.code" placeholder="验证码" @keyup.native.enter="handleLogin">
            <svg-icon slot="prefix" icon-class="code" class="icon" />
          </el-input>
          <div class="code" @click="validateCodeApi" v-html="codeImg" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.remeber" style="margin-bottom: 25px;">记住我</el-checkbox>
      <el-form-item>
        <el-button style="width:100%;" type="primary" :loading="loginLoading" @click.native="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getVerification } from '@/api/user'
import Background from '@/assets/loginBackground.png'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        remeber: false,
        code: ''
      },
      codeImg: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
      },
      loginLoading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  computed: {
    Background() {
      return Background
    }
  },
  created() {
    this.validateCodeApi()
  },
  methods: {
    // 生成验证码
    validateCodeApi() {
      getVerification().then(res => {
        this.codeImg = res.img
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginLoading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            // this.$router.push({path:'/'})
            this.$router.push('/dashboard')
            this.loginLoading = false
          }).catch(() => {
            this.validateCodeApi()
            this.loginLoading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-size: cover;
        height: 100%;
    }
    .login-Form {
        border-radius: 10px;
        padding: 0 20px;
        background-color: #fff;
        width: 420px;
        h3 {
            color: #707070;
            text-align: center;
            margin-bottom: 30px;
        }
        .Img-code {
            display: flex;
            .code {
                width: 150px;
                cursor: pointer;
                margin-left: 10px;
                height: 38px;
            }
        }

    }
</style>

