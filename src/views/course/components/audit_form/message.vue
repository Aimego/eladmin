<template>
    <div class="Form">
        <el-form :model="form" label-width="100px" class="form">
            <el-form-item label="课程名称：">
                <span>{{form.courseName}}</span>
            </el-form-item>
            <el-form-item label="课程封面：">
                <img @click="previewCover = true" style="width: 100px; height: 100px" :src="form.images" />
            </el-form-item>
            <el-form-item label="创建人：">
                <span>{{form.username}}</span>
            </el-form-item>
            <!-- <el-form-item label="院系名：">
                <span>{{form.cname}}</span>
            </el-form-item>
            <el-form-item label="专业名：">
                <span>{{form.mname}}</span>
            </el-form-item>
            <el-form-item label="开课范围：">
                <span>{{form.ran | formatCourseRan}}</span>
            </el-form-item> -->
            <el-form-item label="开始时间：">
                <span>{{form.startTime}}</span>
            </el-form-item>
            <el-form-item label="结束时间：">
                <span>{{form.endTime}}</span>
            </el-form-item>
            <el-form-item label="审核状态：">
                <span :style="form.states | formatStatus().sty">{{ form.states | formatStatus().text }}</span>
            </el-form-item>
        </el-form>

        <el-dialog
            class="previewCover"
            :visible.sync="previewCover"
            width="50%"
            :modal="false"
        >
            <template slot="title">
                <div class="title">{{ form.courseName }}</div>
            </template>
            <img :src="form.images" />
        </el-dialog>
    </div>
</template>

<script>
import Loading from '@/utils/loading'
import { courseById } from '@/api/course'
export default {
    props: {
        courseId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            form:{},
            previewCover:false,
            loading:''
        }
    },
    filters: {
     formatCourseRan(ran) {
      switch(ran){
        case 0: return '校内';
        case 1: return '校外';
        case 2: return '本校';
        case 3: return '开放到省虚拟仿真平台';
        case 4: return '开放到国家平台'
      }
     },
     formatStatus(status) {
      let arr = [{text:'待审核', sty:{color:'#E6A23C'}},{text:'已通过', sty:{color:'#67C23A'}},{text:'未通过',sty:{color:'#F56C6C'}}]
      return arr[status]
     }
    },
    created() {
        this.$nextTick(() => {
            this.getCouseById(this.courseId)
        })
    },
    methods:{
        getCouseById(id) {
         courseById(id).then(res => {
            this.form = res.data
         })
        }
    }
}
</script>

<style lang="scss" scoped>
    .dialog ::v-deep .el-dialog__header {
        border-bottom: 1px solid #eee;
    }
    .previewCover{
        img{
            width: 100%;
        }
    }
</style>