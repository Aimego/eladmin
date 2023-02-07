<template>
    <div class="profile">
        <el-row class="message" :gutter="24">
            <!-- <el-col :sm="24" :md="24" :lg="24" style="margin-bottom:44px;border: 1px solid red;">
                <span class="title">
                    {{$t('profile.title')}}
                </span>
            </el-col> -->

            <el-col :sm="24" :md="8" :lg="6" style="margin-bottom:24px;">
                <el-card>
                    <div slot="header">
                        {{$t('profile.title')}}
                    </div>
                    <div>
                        <div class="avatar">
                            <uploadAvatar :avatar="form.avatar"></uploadAvatar>
                        </div>
                        <div class="list">
                            <span>
                                <svg-icon slot="prefix" icon-class="user" class="icon"></svg-icon>
                                登录账号
                            </span>
                            <span>{{ form.username }}</span>
                        </div>
                        <div class="list">
                            <span>
                                <svg-icon slot="prefix" icon-class="nickname" class="icon"></svg-icon>
                                用户昵称
                            </span>
                            <span>{{ form.name }}</span>
                        </div>
                        <div class="list">
                            <span>
                                <svg-icon slot="prefix" icon-class="phone" class="icon"></svg-icon>
                                手机号码
                            </span>
                            <span>{{  form.phone }}</span>
                        </div>
                        <div class="list">
                            <span>
                                <svg-icon slot="prefix" icon-class="email" class="icon"></svg-icon>
                                用户邮箱
                            </span>
                            <span>{{ form.email }}</span>
                        </div>
                        <div class="list">
                            <span>
                                <svg-icon slot="prefix" icon-class="code" class="icon"></svg-icon>
                                安全设置
                            </span>
                            <span>
                                <el-button type="text">修改密码</el-button>
                                <el-button type="text">修改邮箱</el-button>
                            </span>
                        </div>
                    </div>
                </el-card>  
            </el-col>

            <el-col :sm="24" :md="16" :lg="18" style="margin-bottom:24px">
                <el-card>
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="用户信息" name="userMessage">
                            <el-form ref="form" :rules="rules" :model="form"  label-width="80px">
                                <el-form-item label="昵称" prop="name">
                                    <el-input v-model="form.name" size="small" style="width:35%" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="手机号" prop="phone">
                                    <el-input v-model="form.phone" size="small" style="width:35%" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-radio-group v-model="form.sex">
                                        <el-radio label="男"></el-radio>
                                        <el-radio label="女"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" size="small">保存配置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { adminById, adminUpdate } from '@/api/profile'
import uploadAvatar from '@/components/common/upload/uploadAvatar.vue'
import { mapMutations } from 'vuex'
export default {
    components: {
        uploadAvatar
    },
    data() {
        return {
            activeName: 'userMessage',
            form: {},
            save_loading: false,
            rules: {
                name:[
                    { required: true, message: '昵称不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        adminById().then(res => {
            this.form = res.user
        })
    },
    methods: {
        ...mapMutations('user',['SET_USERDETAIL']),
        saveProfile(formName,form){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.save_loading = true
                    adminUpdate(form).then(res => {
                        if(res.code == 200) {
                            this.SET_USERDETAIL(form)
                            this.$message.success('上传成功')
                            this.save_loading = false
                        }
                    })
                }else {
                    this.$message.warning('必填项不能为空')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
    ::v-deep .el-textarea__inner{
        max-width: 700px;
    }
    .profile{
        color: var(--fontColor);
        flex: 1;
        padding: 24px 36px;
     .message{
        height: 100%;
        padding: 24px;
        background-color: var(--bgColor);
     }
        .avatar{
            font-size: 14px;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .list {
            // margin-top: 20px;
            padding: 15px 0 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            border-bottom: 1px solid #f0f3f4;
        }
    }
</style>