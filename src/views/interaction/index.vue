<template>
  <div class="dashboard">
      <el-row :gutter="24" class="body">
        <el-col :sm="24" :md="24" :lg="7" class="echarts" style="margin-bottom:24px">
          <div class="table">
              <div class="head">
                  <div class="title">
                      发帖量统计
                  </div>
                </div>
              <el-table
              ref="table"
              class="el_table"
              :data="table_Data"
              :header-cell-style="table_header"
              :cell-style="table_cell"
              highlight-current-row
              v-loading="table_loading"
             >
              <el-table-column
                type="index"
                label="序号"
                >
              </el-table-column>

              <el-table-column
                label="实验"
                prop="exname"
                :show-overflow-tooltip="true"
                >
              </el-table-column>

              <el-table-column
                label="浏览次数"
                prop="browsenum"
                >
              </el-table-column>

              <el-table-column
                label="讨论次数"
                prop="replynum"
                >
              </el-table-column>
             </el-table>
              <div class="pagination">
                <Pagination class="pagin"  :total="table_total" :size="table_pageSize" :page="table_page" @currentPage="changePage"></Pagination>
              </div>
            </div>

            <!-- <div class="pie">
                <PieEcharts ref="pie" class="pieEcharts"></PieEcharts>
            </div> -->
        </el-col>

        <el-col :sm="24" :md="24" :lg="17" style="margin-bottom:24px">
         <div class="leftMenu">
            <div class="head">
                <div :class="['item',{'item_act':table_status === index}]"
                     v-for="(item, index) in ['最近发帖']"
                     :key="index"
                     @click="tableIndexChange(index)"
                     >
                  <i class="el-icon-tickets"></i>
                  <span style="margin-left:5px">{{item}}</span>
                </div>
            </div>
            <div class="table">
              <div class="item" v-for="(item) in tableData" :key="item.id">
                <a class="title">{{ item.discussName }}</a>
                <div class="content" v-html="item.content"></div>
                <div class="promulgator">
                  <img class="img" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                  <a class="username">{{ item.username }}</a>
                  <span>
                    发布在<a class="ran">{{ item.area | AreaTranslate }}</a>
                  </span>
                  <span class="date">{{ item.gmtCreate }}</span>
                </div>
                <div class="ranking">
                  <div class="ranking_item">
                    <i class="el-icon-view"></i>
                    <span class="number">{{ item.browsenum }}</span>
                  </div>
                  <span class="split"></span>
                  <div class="ranking_item">
                    <i class="el-icon-chat-dot-round"></i>
                    <span class="number">{{ item.replynum }}</span>
                  </div>
                </div>

                  <el-dropdown class="more">
                    <i class="el-icon-more"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="delInteract(item.id)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
              </div>

              <div class="load">
                <el-button type="primary" plain @click="Pageload" :loading="page_loading">{{ this.loadText }}</el-button>
              </div>
            </div>
         </div>
        </el-col>

      </el-row>
  </div>
</template>

<script>
import Loading from '@/utils/loading'
import PieEcharts from '@/components/common/echarts/PieEcharts.vue'
import { interactStudent, interactRecently, interactDelete} from '@/api/interaction'
import Pagination from '@/components/common/Pagination'
export default {
  name: 'Dashboard',
  components:{ PieEcharts, Pagination },
  computed:{
    table_header() {
      return {
        textAlign: 'center'
      }
    },
    table_cell() {
      return {
        textAlign: 'center'
      }
    },
    // ApiInteract() {
    //   switch(this.table_status) {
    //     case 0: return interactPageAll;
    //     case 1: return interactTeacher;
    //     case 2: return interactStudent;
    //   }
    // },
    totalPages() { // 计算总页数
      return Math.ceil(this.total / this.pageSize)
    },
    loadText() {
      return this.totalPages == this.page ? '没有更多了' : '加载更多'
    }
  },
  filters: {
    AreaTranslate(area) {
      let arr = ['老师','班级','综合']
      return arr[area]
    }
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      table_page: 1,
      table_pageSize: 11,
      table_total: 0,
      table_Data: [], // 发帖量统计数据
      tableData: [], // 最近发帖数据
      table_status: 0,
      table_loading: false, // 切换table类型 loading
      page_loading: false, // 分页loading
      postings: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.getPostingsStatis(this.table_page, this.table_pageSize)
      this.getAllInteract(this.page, this.pageSize)
    //   this.getAllPostings().then(res => {
    //   this.postings.push({'value': res[0].total, 'name': '老师发帖量'})
    //   this.postings.push({'value': res[1].total, 'name': '学生发帖量'})
    //   this.InitPieEcharts(this.postings)
    // })
    })
  },
  methods: {
    // 获取老师、学生发帖量
    // getAllPostings() {
    //   return Promise.all([interactTeacher(this.page, this.pageSize), interactStudent(this.page, this.pageSize)])
    // },
    // 切换讨论类型排行
    // tableIndexChange(index){
    //   this.table_status = index
    //   this.page = 1
    //   this.tableData = []
    //   this.getAllInteract(this.page, this.pageSize)
    // },
    // 发帖量统计
    getPostingsStatis(page, size) {
      this.table_loading = true
      interactStudent(page, size).then(res => {
        console.log(res)
        this.table_loading = false
        this.table_total = res.total
        this.table_Data = res.data
      })
    },
    // 获取最近讨论排行量
    getAllInteract(page, size) {
      this.loading = Loading(document.querySelector('.leftMenu'))
      interactRecently(page, size).then(res => {
        this.tableData.push(...res.data)
        this.total = res.total
        this.page_loading = false
        setTimeout(() => {
          this.loading.close()
        }, 200);
      })
    },
    // 删除讨论
    delInteract(id) {
      interactDelete(id).then(res => {
        console.log(res)
        if(res.code === 200){
          this.$message.success('删除成功')
          this.getAllInteract(this.page ,this.pageSize)
        }else {
          this.$message.warning(res.data)
        }
      })
    },
    // 发帖量统计分页
    changePage(e) {
      this.page = e
      this.getPostingsStatis(this.page, this.pageSize)
    },
    // 讨论分页
    Pageload() {
      if(this.page < this.totalPages){
        this.page_loading = true
        this.page += 1
        this.getAllInteract(this.page, this.pageSize)
      }
    },
    InitPieEcharts(seriesData){
      let option = {
            legend: {
              top: 'bottom'
            },
            tooltip: {
              trigger: 'item'
            },
            series: [{
              name: '发帖数统计',
              type: 'pie',
              radius: '50%',
              data: seriesData
            }]
          }
      this.$refs.pie.InitPie(option)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-table ::v-deep .cell{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
 .dashboard{
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    color: var(--fontColor);
    .body{
        flex: 1;
        display: flex;
        flex-flow: row wrap;
        .leftMenu{
            border-radius: 5px;
            box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
            height: 100%;
            box-sizing: border-box;
            background-color: var(--bgColor);
            display: flex;
            flex-direction: column;
            position: relative;
            .head{
              height: 60px;
              display: flex;
              align-items: center;
              border-bottom: 1px solid #eee;
              .item{
                display: flex;
                align-items: center;
                cursor: pointer;
                margin:0 24px;
                color: #a9a9a9;
                font-size: 15px;
                height: 100%;
              }
              .item_act{
                position: relative;
                color: rgba(33, 187, 126, 1);
                &::before{
                  position: absolute;
                  content: '';
                  height: 2px;
                  width: 80%;
                  background-color: rgba(33, 187, 126, 1);
                  bottom: -1px;
                  left: 50%;
                  transform: translateX(-50%);
                  border-radius: 5px;
                }
              }
            }
            .table{
                flex: 90%;
                padding:24px;
                .item{
                  &:first-child{
                    padding-top: 0;
                  }
                  position: relative;
                  padding:16px 24px;
                  display: flex;
                  flex-direction: column;
                  border-bottom: 1px solid rgba(0,0,0,.06);
                  .title{
                    font-size: 16px;
                    font-weight: 500;
                    margin-bottom: 12px;
                    font-family: '-apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji';
                    &:hover{
                      color: #1890ff;
                    }
                  }
                  .content{
                    // max-width: 820px;
                    line-height: 23px;
                    font-size: 14px;
                  }
                  .promulgator{
                    margin-top: 16px;
                    display: flex;
                    align-items: center;
                    font-size: 15px;
                    .img{
                      width: 30px;
                      height: 30px;
                      border-radius: 50%;
                      margin-right: 4px;
                    }
                    a{
                      color: #1890ff;
                      margin: 0 4px;
                    }
                    span{
                      color: var(--fontColor);
                    }
                    .date{
                        margin-left: 16px;
                    }
                  }
                  .ranking{
                    margin-top: 16px;
                    display: flex;
                    .split{
                      width: 1px;
                      height: 14px;
                      background-color: rgba(0,0,0,.06);
                    }
                    .ranking_item{
                      &:first-child{
                        padding-left: 0;
                      }
                      padding:0px 16px;
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      .number{
                        margin-left: 5px;
                        font-size: 14px;
                      }
                    }
                  }
                  .more{
                    cursor: pointer;
                    position: absolute;
                    right: 0;
                  }
                }
            }
            .load{
              margin-top: 24px;
              text-align: center;
            }

        }
        .echarts{
            display: flex;
            flex-direction: column;
            .table {
              display: flex;
              flex-direction: column;
              padding: 0 24px;
              background-color: var(--bgColor);
              border-radius: 5px;
              box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
              flex: 1;
              .el_table{
                flex: 1;
              }
              // margin-bottom: 24px;
              .head{
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .title{
                        font-size: 18px;
                        font-weight: bold;
                    }
                }
              .pagination{
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: flex-end;            
              }
            }
            .pie{
                border-radius: 5px;
                box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
                background-color: var(--bgColor);
                // min-height: 800px;
                max-height: calc(100vh - 85px - 24px - 50px);
                padding: 0 24px;
                padding-bottom: 20px;
                flex: 1;
                display: flex;
                flex-direction: column;
                .pieEcharts{
                    flex: 1;
                }
            }
        }
    }
 }
</style>
