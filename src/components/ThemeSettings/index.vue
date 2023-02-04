<template>
    <div>
        <div class="setting" @click="visibleDrawer = true">
            <i style="color:#fff" class="el-icon-s-tools"></i>
        </div>
        <el-drawer
         title="我是标题"
         :visible.sync="visibleDrawer"
          size="300px"
         :with-header="false">
            <div class="optionsBar">
                <div class="stylize">
                    <span class="title">整体风格设置</span>
                    <div class="choose">
                        <span v-for="(item) in stylizeOptions"
                             :key="item"
                             @click="changeThemes(item)"
                             :class="['item',item, {'act_item': stylize == item}]"></span>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            visibleDrawer: false,
            stylizeOptions: ['light','night'],
            stylize: 'light',
            checkList:[]
        }
    },
    methods: {
        ...mapMutations('settings', ['CHANGE_STYLIZE']),
        changeThemes(type){
            this.stylize = type
            document.head.querySelector('#skin').setAttribute('href',`/skin/${type}.css`)
            console.log(document.head.querySelector('#skin'))
            this.$nextTick(()=>{
                this.CHANGE_STYLIZE()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .setting{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #409EFF;
        width: 48px;
        height: 48px;
        border-radius: 5px;
    }
    .optionsBar{
        padding: 24px;
        .choose{
            margin-top: 15px;
            display: flex;
            .item{
                position: relative;
                width: 44px;
                height: 36px;
                box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
                margin-right: 18px;
                &:after{
                    content: '';
                    position: absolute;
                    height: 20px;
                    width: 20px;
                    right: 0;
                    bottom: 0;
                    background-color: #a9a9;
                }
            }
            .act_item{
                &:after{
                    content: '';
                    background: url('~@/assets/img/check.png') no-repeat center;
                    background-size: 15px;
                    background-color: #fff;
                }
            }
            .light{
                background-color: #fff;
            }
            .night{
                background-color: #000 ;
            }
        }
    }
</style>