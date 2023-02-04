<template>
    <div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="实验ID" prop="id">
                <el-input v-model="form.id" clearable></el-input>
            </el-form-item>
            <el-form-item label="实验密钥" prop="secret" class="secret" v-show="form.exlevel === 1 || form.exlevel === 2">
                <el-input v-model="form.secret" clearable></el-input>
            </el-form-item>
            <el-form-item label="实验名称" prop="exname">
                <el-input v-model="form.exname" clearable></el-input>
            </el-form-item>
            <el-form-item label="实验级别" prop="exlevel">
                <el-radio-group v-model="form.exlevel" @change="changeExlevel">
                    <el-radio :label="1">国家级</el-radio>
                    <el-radio :label="2">省级</el-radio>
                    <el-radio :label="3">校级</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="实验负责人" prop="fullname">
                <el-input v-model="form.fullname" clearable></el-input>
            </el-form-item>
            <el-form-item label="专业类别" prop="cid">
                <el-select v-model="form.cid">
                    <el-option v-for="item in professtion" :key="item.id" :label="item.najorname" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学校名称" prop="school">
                <el-input  v-model="form.school" clearable></el-input>
            </el-form-item>
            <el-form-item label="实验简介" prop="exinfo">
                <el-input type="textarea" v-model="form.exinfo" :rows="6"></el-input>
            </el-form-item>
            <el-form-item label="认证年份" prop="year">
                <el-date-picker type="year" value-format="yyyy" placeholder="选择时间" v-model="form.year"></el-date-picker>
            </el-form-item>
            <el-form-item class="submit">
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        var checkSecret = (rule, value, callback) => {
            if((this.form.exlevel === 1 || this.form.exlevel === 2) && value.trim() == ''){
                callback(new Error('实验密钥不能为空'))
            }else return callback()
        }
        return{
            form:{
                id:'',
                secret:'',
                exname:'',
                exlevel:3,
                fullname:'',
                school:'',
                mid:'',
                cid:'',
                major:'',
                exinfo:'',
                year:''
            },
            professtion:[],
            rules: {
                id: [
                    {required:true, message: '实验ID不能为空', trigger: 'blur'}
                ],
                secret: [{validator:checkSecret, message: '实验密钥不能为空', trigger: 'blur'}],
                exname: [
                    { required:true, message: '请输入实验名称', trigger: 'blur' },
                ],
                exinfo: [
                    { required:true, message: '请输入实验简介', trigger: 'blur' }
                ],
                exlevel: [
                    { required:true, message: '实验级别不能为空', trigger: 'blur' }
                ],
                fullname: [
                    { required:true, message: '实验负责人名称不能为空', trigger: 'blur' }
                ],
                school: [
                    { required:true, message:'学校不能为空', trigger:'blur' }
                ],
                mid: [
                    {required:true, message:'学院名称不能为空', trigger:'blur' }
                ],
                cid: [
                    {required:true, message:'专业名称不能为空', trigger:'blur'}
                ],
                year: [
                    {required:true, message:'认证年份不能为空', trigger:'blur'}
                ]
            }
        }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
}
</script>
<style lang="scss" scoped>
</style>
