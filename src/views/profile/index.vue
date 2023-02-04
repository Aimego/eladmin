<template>
    <div class="profile">
        <el-row class="message" :gutter="24">
            <el-col :sm="24" :md="24" :lg="24" style="margin-bottom:44px;">
                <span class="title">
                    {{$t('profile.title')}}
                </span>
            </el-col>

            <el-col :sm="24" :md="3" :lg="3" style="margin-bottom:24px;">
                <div class="avatar">
                    <uploadAvatar :avatar="form.images"></uploadAvatar>
                </div>
            </el-col>

            <el-col :sm="24" :md="21" :lg="21" style="margin-bottom:24px">
                <div class="form">
                    <el-form ref="form" :rules="rules" :model="form"  label-width="120px">
                        <div class="el_form">
                          <div class="leftItem">
                            <el-form-item label="用户名">
                                <el-input v-model="form.username" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <el-input v-model="form.fullname" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="昵称">
                                <el-input v-model="form.nickname" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="身份">
                                <el-select v-model="form.identity">
                                    <el-option v-for="(item,index) in ['社会','学生','老师','教务','管理员']" :key="index" :label="item" :value="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-select v-model="form.gender">
                                    <el-option label="男" :value="1"></el-option>
                                    <el-option label="女" :value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="学校">
                                <el-input v-model="form.school" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="学历" prop="education">
                                <el-input v-model="form.education" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="专业技术职务">
                                <el-input v-model="form.mapost" clearable></el-input>
                            </el-form-item>
                        </div>
                        <div class="rightItem">
                            <el-form-item label="院系" prop="faculty">
                                <el-input v-model="form.faculty" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="邮编" prop="code">
                                <el-input v-model="form.code" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="行政职务" prop="adpost">
                                <el-input v-model="form.adpost" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="电子邮箱" prop="email">
                                <el-input v-model="form.email" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="省份">
                                <el-input v-model="form.province" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input v-model="form.phone" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="出生年月" prop="datebirth">
                                <el-date-picker 
                                 v-model="form.datebirth"
                                 value-format="yyyy-MM-dd"
                                 type="date"
                                 placeholder="选择日期"
                                 >

                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="学位" prop="degree">
                                <el-input v-model="form.degree"></el-input>
                            </el-form-item>
                          </div>
                        </div>
                        <el-form-item label="个人简介" prop="bio">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.bio"></el-input>
                        </el-form-item>
                        <el-form-item label="教学相关文章" prop="article">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.article"></el-input>
                        </el-form-item>
                        <el-form-item label="发表学术文章" prop="learning">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.learning"></el-input>
                        </el-form-item>
                        <el-form-item label="教学科研课题" prop="scientific">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.scientific"></el-input>
                        </el-form-item>
                        <el-form-item label="近五年研究课题" prop="research">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.research"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :loading="save_loading" @click="saveProfile('form',form)">保存个人信息</el-button>
                        </el-form-item>
                    </el-form>
                </div>
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
            form: {},
            save_loading: false,
            rules: {
             faculty:[
                {required:true,message:'院系不能为空',trigger:'blur'}
             ],
             code:[
                {required:true,message:'邮编不能为空',trigger:'blur'}
             ],
             adpost:[
                {required:true,message:'行政职务不能为空',trigger:'blur'}
             ],
             email:[
                {required:true,message:'电子邮箱不能为空',trigger:'blur'}
             ],
             education:[
                {required:true,message:'学历不能为空',trigger:'blur'}
             ],
             datebirth:[
                {required:true,message:'出生年月不能为空',trigger:'blur'}
             ],
             mapost:[
                {required:true,message:'专业职务不能为空',trigger:'blur'}
             ],
             degree:[
                {required:true,message:'学位不能为空',trigger:'blur'}
             ],
             bio:[
                {required:true,message:'个人简历不能为空',trigger:'blur'}
             ],
             article:[
                {required:true,message:'教学相关文章不能为空',trigger:'blur'}
             ],
             learning:[
                {required:true,message:'学术文章不能为空',trigger:'blur'}
             ],
             scientific:[
                {required:true,message:'科学教研课题不能为空',trigger:'blur'}
             ],
             research:[
                {required:true,message:'研究课题不能为空',trigger:'blur'}
             ]
        }
        }
    },
    created() {
        adminById().then(res => {
            this.form = res.data
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
        .title{
            font-size: 20px;
            font-weight: 500;
        }
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
        .form{
            // height: 100%;
            // .el_form{
            //     max-width: 500px;
            // }
            .el_form{
                display: flex;
                flex-wrap: wrap;
                .leftItem{
                    flex: 1 ;
                    // margin-right: 50px;
                    min-width: 300px;
                    max-width: 350px;
                }
                .rightItem{
                    flex: 1;
                    min-width: 300px;
                    max-width: 350px;
                }
            }
        }
    }
</style>