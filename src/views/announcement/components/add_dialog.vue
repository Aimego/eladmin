<template>
    <div class="preview">
        <el-dialog
        class="dialog"
        :visible="add_dialogVisible"
        width="40%"
        @close="$emit('update:add_dialogVisible', false)"
        >
        <template slot="title">
            <div class="title">添加公告</div>
        </template>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="公告编号：" prop="id">
                <el-input v-model="form.id"></el-input>
            </el-form-item>

            <el-form-item label="公告标题：" prop="noticename">
                <el-input v-model="form.noticename"></el-input>
            </el-form-item>

            <el-form-item label="公告内容：" prop="content">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>

            <el-form-item label="公告类型：" prop="type">
                <el-select v-model="form.type">
                    <el-option label="普通公告" value="1"></el-option>
                    <el-option label="重要公告" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="公告范围" prop="ran">
                <el-select v-model="form.ran">
                    <el-option v-for="(item, index) in ['全部', '课程内']" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="选择课程" prop="exId" v-show="form.ran == 1" class="must">
                <el-select v-model="form.exId" >
                    <el-option v-for="(item) in courseOptions" :key="item.courseId" :label="item.courseName" :value="item.courseId" @click.native="form.exName = item.courseName"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="起始日期" class="must" prop="daterange">
                <el-date-picker
                    v-model="form.daterange"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholde="开始日期"
                    end-placeholde="截至日期"
                    :clearable="false"
                >
                </el-date-picker>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog_footer">
            <el-button type="primary" :loading="add_loading"  @click="addAnnouncement('form',form)">发布公告</el-button>
         </span>
        </el-dialog>
    </div>
    
</template>

<script>
import { coursePageAll } from '@/api/course'
import { announcementAdd } from '@/api/announcement'
export default {
    props: {
        add_dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        var validaterange = (rule, value, callback) => {
                if(value.length != 2) {
                    callback(new Error('起始日期不能为空'))
                }else {
                    return callback()
                }
        }
        var validateCourseId = (rule, value, callback) => {
            if(this.form.ran == 1 && this.form.exId == null){
                callback(new Error('课程不能为空'))
            }else {
                return callback()
            }
        }
        return {
            form: {
                daterange: [],
            },
            courseOptions: [],
            add_loading: false,
            rules: {
                id: [
                    { required: true, message: '公告编号不能为空', trigger: 'blur' }
                ],
                noticename: [
                    { required: true, message: '公告标题不能为空', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '公告内容不能为空', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '公告类型不能为空', trigger: 'blur' }
                ],
                ran: [
                    { required: true, message: '公告范围不能为空', trigger: 'blur' }
                ],
                exId: [
                    { validator: validateCourseId, message: '课程不能为空', trigger: 'blur' }
                ],
                daterange: [
                    { validator: validaterange, message: '起始日期不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.getAllCourse(1,100)
    },
    methods: {
        addAnnouncement(formName,form) {
            let newForm = JSON.parse(JSON.stringify(form))
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.add_loading = true
                    newForm.startTime = newForm.daterange[0]
                    newForm.endTime = newForm.daterange[1]
                    delete newForm.daterange
                    announcementAdd(newForm).then(res=>{
                        if(res.code == 200) {
                            this.$message.success('上传成功')
                            this.$emit('update:add_dialogVisible',false)
                            this.$emit('updateTable')
                        }
                        this.add_loading = false
                    })
                }else {
                    return false
                }
            })
        },
        // 获取课程
        getAllCourse(page, size){
            coursePageAll(page, size).then(res => {
                console.log(res)
                this.courseOptions = res.data
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .dialog ::v-deep .el-dialog__header {
        border-bottom: 1px solid #eee;
    }
    ::v-deep .el-textarea__inner{
        min-height: 80px !important;
    }
    ::v-deep .el-form-item__content{
        display: flex;
        min-height: 40px;
        // line-height: 0px;
        align-items: center;
    }
    .must{
        ::v-deep .el-form-item__label{
            &::before{
                content: '*';
                color: rgb(225, 37, 37);
                margin-right: 4px;
            }
        }
    }
    .dialog_footer{
        display: flex;
        justify-content: flex-end;
    }
</style>