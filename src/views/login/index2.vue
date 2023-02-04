<template>
    <div class="login" :style="'background-image:url('+ Background +');'">
        <!-- <img src="@/assets/loginBackground.png" alt="" class="wall"> -->
        <el-form  ref="loginForm" class="login-Form" :model="loginForm" :rules="loginRules">
            <h3>虚拟仿真实验教学后端管理系统</h3>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="用户名">
                  <svg-icon slot="prefix" icon-class="user" class="icon"></svg-icon>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" show-password placeholder="密码">
                  <svg-icon slot="prefix" icon-class="password" class="icon"></svg-icon>
                </el-input>
            </el-form-item>
            <el-form-item prop="username">
                <div class="Img-code">
                    <el-input v-model="loginForm.code" placeholder="验证码">
                      <svg-icon slot="prefix" icon-class="code" class="icon"></svg-icon>
                    </el-input>
                    <div class="code" v-html="codeImg" @click="validateCodeApi"></div>
                </div>
            </el-form-item>
            <el-checkbox style="margin-bottom: 25px;" v-model="loginForm.remeber">记住我</el-checkbox>
            <el-form-item>
                <el-button  style="width:100%;" type="primary" :loading="loginLoading" @click.native="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
  </template>
  
  <script>
  import { getVerification } from '@/api/user'
  import { mapMutations, mapActions } from 'vuex'
  import Background from '@/assets/loginBackground.png'
  export default {
    name: 'Login',
    computed: {
        Background(){
            return Background
        }
    },
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          remeber: false,
          code:''
        },
        codeImg:'',
        loginRules: {
          username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
          password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
          code : [{ required :true, trigger: 'blur', message: '验证码不能为空' }]
        },
        loginLoading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    created() {
      this.validateCodeApi()
      // 解析url
      let url = window.location.hash
      console.log(url)
      if(url.indexOf('?') != -1) this.tokenParse(url)
    },
    methods: {
      ...mapMutations('user', ['SET_TOKEN', 'SET_REFRESHTOKEN']),
      ...mapActions('user', ['getInfo']),
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
              this.$router.push({path:'/'})
              // this.$router.push('/dashboard')
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
                cursor: pointer;
                margin-left: 10px;
                height: 38px;
            }
        }
        
    }
</style>
  
  