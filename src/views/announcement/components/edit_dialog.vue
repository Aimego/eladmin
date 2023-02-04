<template>
    <div class="preview">
        <el-dialog
        class="dialog"
        :visible="dialogVisible"
        width="40%"
        @close="close"
        @opened="opened(announcementId)"
        >
        <template slot="title">
            <div class="title">{{ editStatusChange }}</div>
        </template>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="公告标题：" prop="noticename">
                <el-input v-show="editStatus" v-model="form.noticename"></el-input>
                <span v-show="!editStatus">{{ form.noticename }}</span>
            </el-form-item>
            
            <el-form-item label="公告发布人" prop="createName">
                <el-input v-show="editStatus" v-model="form.createName"></el-input>
                <span v-show="!editStatus">{{ form.createName }}</span>
            </el-form-item>

            <el-form-item label="公告内容：" prop="content">
                <el-input v-show="editStatus" type="textarea" v-model="form.content"></el-input>
                <span v-show="!editStatus">{{ form.content }}</span>
            </el-form-item>

            <el-form-item label="公告类型：" prop="type">
                <el-select v-show="editStatus" v-model="form.type">
                    <el-option label="普通公告" value="1"></el-option>
                    <el-option label="重要公告" value="2"></el-option>
                </el-select>
                <span v-show="!editStatus">{{ form.type | formatType }}</span>
            </el-form-item>

            <el-form-item label="公告范围" prop="ran">
                <el-select v-show="editStatus" v-model="form.ran">
                    <el-option v-for="(item, index) in ['全部', '课程内']" :key="index" :label="item" :value="index"></el-option>
                </el-select>
                <span v-show="!editStatus">{{ form.ran | ranType }}</span>
            </el-form-item>

            <el-form-item label="选择课程" prop="exId" v-show="form.ran == 1" class="must">
                <el-select v-show="editStatus" v-model="form.exId" >
                    <el-option v-for="(item) in courseOptions" :key="item.courseId" :label="item.courseName" :value="item.courseId" @click.native="form.exName = item.courseName"></el-option>
                </el-select>
                <span v-show="!editStatus">{{ form.exName }}</span>
            </el-form-item>

            <el-form-item label="起始日期" class="must">
                <el-date-picker
                    v-show="editStatus"
                    v-model="daterange"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholde="开始日期"
                    end-placeholde="截至日期"
                    :clearable="false"
                >
                </el-date-picker>
                <span v-show="!editStatus">{{ daterange[0] }} 至 {{ daterange[1] }}</span>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog_footer">
            <el-button type="danger" :loading="del_loading" @click="delAnnouncement(announcementId)">删除该公告</el-button>
            <el-button type="primary" :loading="edit_loading"  @click="editAnnouncement('form',form)">{{ editStatusBtn }}</el-button>
         </span>
        </el-dialog>
    </div>
    
</template>

<script>
import { coursePageAll } from '@/api/course'
import { announcementById, announcementUpdate, announcementDel } from '@/api/announcement'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        announcementId: {
            type: Number
        }
    },
    data() {
        var validaterange = (rule, value, callback) => {
                if(this.daterange == null || this.daterange.length != 2) {
                    console.log('err',this.daterange)
                    callback(new Error('起始日期不能为空'))
                }else {
                    return callback()
                }
        }
        var validateCourseId = (rule, value, callback) => {
            if(this.form.ran == 1 && this.form.exId == ''){
                callback(new Error('课程不能为空'))
            }else {
                return callback()
            }
        }
        return {
            form: {},
            courseOptions: [],
            editStatus: false,
            daterange: [],
            edit_loading: false,
            del_loading: false,
            rules: {
                noticename: [
                    { required: true, message: '公告标题不能为空', trigger: 'blur' }
                ],
                createName: [
                    { required: true, message: '公告发布人不能为空', trigger: 'blur' }
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
                ]
            }
        }
    },
    computed:{
        editStatusChange() {
            return this.editStatus ? '编辑公告' : '查看公告'
        },
        editStatusBtn() {
            return !this.editStatus ? '编辑公告' : '完成编辑'
        }
    },
    filters: {
        formatType(type) {
            switch(type) {
                case '1': return '普通公告';
                case '2': return '重要公告';
            }
        },
        ranType(ran) {
            let arr = ['全部', '课程内', '班级内']
            return arr[ran]
        }
    },
    created() {
        this.getAllCourse(1, 100)
    },
    methods: {
        opened(id) {
            announcementById(id).then(res => {
                console.log(res)
                this.form = res.data
                this.daterange = [res.data.startTime, res.data.endTime]
            })
        },
        close() {
            this.$emit('update:dialogVisible', false)
            this.editStatus = false
        },
        // 获取课程
        getAllCourse(page, size){
            coursePageAll(page, size).then(res => {
                console.log(res)
                this.courseOptions = res.data
            })
        },
        editAnnouncement(formName,form) {
            if(!this.editStatus){
                return this.editStatus = true
            }
            this.$refs[formName].validate((valid) => {
                if(valid){
                    form.startTime = this.daterange[0]
                    form.endTime = this.daterange[1]
                    this.edit_loading = true
                    console.log(form)
                    announcementUpdate(form).then(res => {
                        this.edit_loading = false
                        if(res.code == 200){
                            this.$message.success('修改成功')
                            this.$emit('update:dialogVisible',false)
                            this.$emit('updateTable')
                        }

                    })
                }else {
                    return false
                }
            })
        },
        delAnnouncement(id) {
            this.del_loading = true
            announcementDel(id).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.$message.success('删除成功')
                    this.$emit('update:dialogVisible',false)
                    this.$emit('updateTable')
                }
                this.del_loading = false
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
        justify-content: space-between;
    }
</style>