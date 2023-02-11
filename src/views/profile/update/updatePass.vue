<template>
    <div class="preview">
        <el-dialog
        class="dialog"
        :visible="dialogVisible"
        @close="dialogVisible = false"
        width="30%"
        >
        <template slot="title">
            <div class="title">修改密码</div>
        </template>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="旧密码" prop="oldPass">
                <el-input type="password" v-model="form.oldPass" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
                <el-input type="password" v-model="form.newPass" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPass">
                <el-input type="password" v-model="form.confirmPass" show-password></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel('form')">取消</el-button>
            <el-button @click="submit('form',form)" type="primary">确认</el-button>
         </span>
        </el-dialog>
    </div>
    
</template>

<script>
import { PassUpdate } from '@/api/profile'
import md5 from 'js-md5'
export default {
    data() {
        const validConfirmPass = (rule, value, callback) => {
            if(value) {
                if(value != this.form.newPass) {
                    callback(new Error('两次密码输入不一致'))
                }else {
                    callback()
                }
            }else {
                callback(new Error('密码不能为空'))
            }
        }
        return {
            dialogVisible: false,
            form: {
                oldPass:'',
                newPass:'',
                confirmPass:'',
            },
            rules: {
                oldPass: [
                    { required: true, message: '旧密码不能为空', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' }
                ],
                confirmPass: [
                    { required: true, validator: validConfirmPass, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submit(formName, {oldPass, confirmPass}) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    PassUpdate({oldPass:md5(oldPass), confirmPass:md5(confirmPass)}).then(res => {
                        if(res.code == 200) {
                            this.$message.success('修改成功')
                            this.cancel(formName)
                        }
                    })
                }
            })
        },
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .dialog ::v-deep .el-dialog__header {
        border-bottom: 1px solid #eee;
    }
    ::v-deep .el-form-item__content{
        display: flex;
        min-height: 40px;
        // line-height: 0px;
        align-items: center;
    }
</style>