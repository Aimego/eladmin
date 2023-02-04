<template>
    <div class="audit">
        <el-dialog
         class="dialog"
         :visible="dialogVisible"
         width="40%"
         @close="auditClose">
         <template slot="title">
            <div class="title">审核流程</div>
         </template>
        <div>
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="查看基本信息"></el-step>
                <el-step title="审核完毕"></el-step>
            </el-steps>
            <div class="message">
                <component :is="currentComp" :courseId="courseId" :status="status" ></component>
            </div>
        </div>

        <span slot="footer" class="dialog-footer">
            <div>
                <div v-show="active == 0" class="auditBtn">
                    <el-button type="danger" @click="auditStatus(1)" :loading="loadingBtn">审 核 不 通 过</el-button>
                    <el-button type="primary" @click="auditStatus(0)" :loading="loadingBtn">审 核 通 过</el-button>
                </div>
                <div v-show="active == 1" class="auditBtn">
                    <el-button type="warning" @click="active = 0">重 新 审 核</el-button>
                    <el-button type="primary" @click="auditClose">退 出</el-button>
                </div>
            </div>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import {adoptById, failById} from '@/api/course'
import message from './audit_form/message.vue'
import result from './audit_form/result.vue'
export default {
    components: {
        message, result
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        courseId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            active: 0,
            status: 0, // 0为通过，1为不通过
            loadingBtn: false
        }
    },
    computed: {
        currentComp() {
            return this.active === 0 ? 'message' : 'result'           
        }
    },
    methods:{
        auditStatus(status){
            this.loadingBtn = true
            this.status = status
            let api = status === 0 ? adoptById : failById
            api(this.courseId).then(res => {
                if(res.code === 200){
                    this.active += 1
                }
                this.loadingBtn = false
            })
        },
        auditClose() {
            this.$emit('update:dialogVisible',false)
            this.$emit('alreadyOperate')
        }
    }
}
</script>

<style lang="scss" scoped>
    .dialog ::v-deep .el-dialog__header {
        border-bottom: 1px solid #eee;
    }
    .message{
        margin-top: 20px;
    }
    .auditBtn{
        display: flex;
        justify-content: space-between;
    }
</style>