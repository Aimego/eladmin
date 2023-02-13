<template>
    <div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="实验负责人" prop="fullname">
                <el-input v-model="form.fullname" clearable></el-input>
            </el-form-item>
            <el-form-item label="实验名称" prop="exname">
                <el-input v-model="form.exname" clearable></el-input>
            </el-form-item>
            <el-form-item label="实验级别" prop="exlevel">
                <el-radio-group v-model="form.exlevel">
                    <el-radio :label="1">国家级</el-radio>
                    <el-radio :label="2">省级</el-radio>
                    <el-radio :label="3">校级</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="专业类别" prop="cid">
                <el-select v-model="form.major">
                    <el-option v-for="item in professtion" :key="item.id" @click.native="form.cid = item.id"  :label="item.najorname" :value="item.najorname"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="实验简介" prop="exinfo">
                <el-input type="textarea" v-model="form.exinfo" :rows="6"></el-input>
            </el-form-item>
            <el-form-item label="实验图片" prop="imagesurl">
                <uploadImage :imagesrc.sync="form.imagesurl" />
            </el-form-item>
            
            <el-form-item class="submit">
                <el-button type="primary" @click="submitForm('ruleForm',form)">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { editExperiment, addExperiment } from '@/api/experiment'
import uploadImage from '@/components/common/upload/uploadImage.vue';
export default {
    components: {
        uploadImage
    },
    computed: {
        submitExperiment_Api() {
            return this.form._id ? editExperiment : addExperiment
        }
    },
    data(){
        return{
            form:{},
            professtion:[],
            rules: {
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
                imagesurl: [
                    {required:true, message:'实验图片不能为空', trigger:'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(formName,form) {
            this.$refs[formName].validate(valid => {
                if(valid) {
                    this.submitExperiment_Api(form).then(res => {
                        console.log(form)
                        if(res.code == 200) {
                            this.$message.success('上传成功')
                        }
                    })
                }else return false
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
    }
}
</script>
<style lang="scss" scoped>
</style>
