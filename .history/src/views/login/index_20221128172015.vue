<template>
  <div class="login">
      <img src="@/assets/loginBackground.png" alt="" class="wall">
      <el-form class="content" ref="loginForm" :model="loginForm" :rules="loginRules">
          <div class="contentLeft">
              <img src="https://img.js.design/assets/img/61dfd81bb55bded3b92b6f71.png" alt="">
          </div>
          <div class="contentRight">
              <!-- <span class="icon"><img src="https://img.js.design/assets/img/61dfdb963587320931062839.png" alt=""></span> -->
              <span class="icon"><img src="@/assets/hcLogo.png" /></span>
              <span class="title">江西理工大学虚拟仿真实验共享平台</span>
              <el-form-item class="username" prop="username">
                  <i class="icon-user"></i>
                  <el-input id="userInput" ref="username" clearable placeholder="请输入用户名" v-model="loginForm.username" ></el-input>
              </el-form-item>
              <el-form-item class="password" prop="password">
                  <i class="icon-pass"></i>
                  <el-input id="userInput" ref="password" show-password clearable placeholder="请输入密码" v-model="loginForm.password" ></el-input>
              </el-form-item>
              <span class="verification">
                  <el-form-item class="inpcode" prop="code">
                      <el-input ref="code"  clearable placeholder="请输入右侧验证码"  @keyup.enter.native="handleLogin" v-model="loginForm.code"></el-input>
                  </el-form-item>
                  <span class="code" @click="validateCodeApi">
                    <img :src="codeImg" />
                  </span>
              </span>
              <span class="loginBtn" @click="handleLogin">
                <span v-if="!loading">登录</span>
                <i v-else class="el-icon-loading"></i>
              </span>
              <!-- <span class="register">没有账号？去注册</span> -->
          </div>
      </el-form>
  </div>
</template>

<script>
import { getVerification } from '@/api/user'
import { mapMutations, mapActions } from 'vuex'
import { removeToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        uuid:'',
        code:''
      },
      codeImg:'',
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code : [{ required :true, trigger: 'blur', message: '验证码不能为空' }]
      },
      loading: false,
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
      this.loginForm.uuid = Math.floor(Math.random() * 10000)
      getVerification(this.loginForm.uuid).then(res=>{
        this.codeImg = URL.createObjectURL(res)
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // from学生端教务直接登录
    StudentTokenSign(data){
      this.SET_TOKEN(data.token)
      this.SET_REFRESHTOKEN(data.refresh_token)
      this.getInfo().then(code=>{
        console.log(code)
        if(code == 200){
          this.$message.success('登录成功')
          this.$router.push('/dashboard')
        } else removeToken()
      })
    },
    // token解析
    tokenParse(url){
      console.log(url)
      let params = url.split('?')[1]
      if(params != ''){
        let TokenArr = params.split('&')
        let obj = {}
        TokenArr.forEach(val=>{
          let KeyValue = val.split('=')
          let Key = KeyValue[0] // 0为键
          let Value = KeyValue[1] // 1为值
          obj[Key] = Value
        })
          this.StudentTokenSign(obj)
        }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({path:'/'})
            // this.$router.push('/dashboard')
            this.loading = false
          }).catch(() => {
            this.validateCodeApi()
            this.loading = false
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
  .login{
      display: flex;
      justify-content: center;
      align-items: center;
      .wall{
          position: fixed;
          background-color: #3d5af6;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
      }
      .content{
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -600px;
          margin-top: -350px;
          width: 1200px;
          height: 700px;
          background-color: rgba(255, 255, 255, 1);
          box-shadow: 2px 2px 20px rgba(6, 41, 145, 0.64);
          border-radius: 10px;
          display: flex;
          .contentLeft{
              width: 632px;
              height: 100%;
              padding: 166px 39px 110px 71px;
              box-sizing: border-box;
          }
          .contentRight{
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              .icon{
                  height: 56px;
                  margin-top: 53px;
                  img{
                      height: 56px;
                  }
              }
              .title{
                font-family:"Microsoft YaHei";
                color: rgba(51, 51, 51, 1);
                font-size: 21px;
                margin-top: 38px;
                font-weight: bold;
              }
              .option{
                  margin-top: 40px;
              }
              .username{
                  margin-top: 40px;
                  width: 458px;
                  height: 60px;
                  position: relative;
                  ::v-deep .el-input__inner{
                      height: 60px;
                      border-radius: 0px;
                      border-bottom: 1px solid rgba(166, 166, 166, 1);
                      border-top: 1px solid transparent;
                      border-left: 1px solid transparent;
                      border-right: 1px solid transparent;
                      padding: 0 40px;
                  }
                  .icon-user{
                      position: absolute;
                      top: 50%;
                      transform: translateY(-50%);
                      left: 0;
                      width: 17px;
                      height: 19px;
                      background-image: url('~@/assets/user.png');
                      background-size: cover;
                      z-index: 5;
                  }
              }
              .password{
                  width: 458px;
                  height: 60px;
                  position: relative;
                  ::v-deep  .el-input__inner{
                      height: 60px;
                      border-radius: 0px;
                      border-bottom: 1px solid rgba(166, 166, 166, 1);
                      border-top: 1px solid transparent;
                      border-left: 1px solid transparent;
                      border-right: 1px solid transparent;
                      padding: 0 40px;
                  }
                  .icon-pass{
                      position: absolute;
                      top: 50%;
                      transform: translateY(-50%);
                      left: 0;
                      width: 16px;
                      height: 19px;
                      background-image: url('~@/assets/pass.png');
                      background-size: cover;
                      z-index: 5;
                  }
              }
              .verification{
                  width: 100%;
                  margin-top: 29px;
                  padding-right: 110px;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: space-between;
                  .inpcode{
                      height: 51px;
                      width: 269px;
                      ::v-deep .el-input__inner{
                          height: 51px;
                          width: 269px;
                          border-radius: 0px;
                          border-bottom: 1px solid rgba(166, 166, 166, 1);
                          border-top: 1px solid transparent;
                          border-left: 1px solid transparent;
                          border-right: 1px solid transparent;
                          padding: 0;
                      }
                  }
                  .code{
                      cursor: pointer;
                      width: 177px;
                      height: 51px;
                      border: 1px solid #ccc;
                      font-size: 38px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      background-repeat: no-repeat;
                      background-size: 100% 100%;
                      opacity: 0.5;
                      img{
                        width:100%;
                        height: 100%;
                      }
                  }
              }
              .loginBtn{
                  width: 460px;
                  height: 60px;
                  background-color: rgba(67, 110, 243, 1);
                  border-radius: 4px;
                  color: rgba(255, 255, 255, 1);
                  font-size: 16px;
                  text-align: center;
                  line-height: 60px;
                  margin-top: 33px;
                  cursor: pointer;
              }
              .register{
                  color: rgba(67, 110, 243, 1);
                  font-size: 16px;
                  margin-top: 20px;
              }
          }
      }
  }
</style>

