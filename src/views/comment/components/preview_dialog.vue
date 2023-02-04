<template>
    <div class="preview">
        <el-dialog
        class="dialog"
        :visible="dialogVisible"
        width="40%"
        @close="$emit('update:dialogVisible', false)"
        @opened="opened(commentId)"
        >
        <template slot="title">
            <div class="title">查看评论</div>
        </template>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="评价人：">
                <span>{{ form.username }}</span>
            </el-form-item>

            <el-form-item label="实验名称：">
                <span>{{ form.exname }}</span>
            </el-form-item>

            <el-form-item label="评论内容：">
                <el-input type="textarea" disabled v-model="form.evaluate"></el-input>
            </el-form-item>

            <el-form-item label="实验内容评分：">
                <el-rate v-model="form.excontent" disabled :colors="colors" show-score text-color="#ff9900"></el-rate>
            </el-form-item>

            <el-form-item label="操作系统评分：">
                <el-rate v-model="form.opsystem" disabled :colors="colors" show-score text-color="#ff9900"></el-rate>
            </el-form-item>

            <el-form-item label="支持服务评分：">
                <el-rate v-model="form.spservices" disabled :colors="colors" show-score text-color="#ff9900"></el-rate>
            </el-form-item>

            <el-form-item label="评论时间：">
                <span>{{ form.gmtCreate }}</span>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="danger" :loading="del_loading" @click="delComment(commentId)">删除该评论</el-button>
         </span>
        </el-dialog>
    </div>
    
</template>

<script>
import { previewEvaluate, DeleteEvaluate } from '@/api/comment'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        commentId: {
            type: Number
        }
    },
    data() {
        return {
            form: {},
            del_loading: false,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900']
        }
    },
    methods: {
        opened(id) {
            previewEvaluate(id).then(res => {
                this.form = res.data
            })
        },
        delComment(id) {
            this.del_loading = true
            DeleteEvaluate(id).then(res => {
                if(res.code == 200) {
                    this.$message.success('删除成功')
                    this.$emit('update:dialogVisible', false)
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
    ::v-deep .el-form-item__content{
        display: flex;
        min-height: 40px;
        // line-height: 0px;
        align-items: center;
    }
</style>