<template>
  <section class="app-main" ref="appmain">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <ThemeSettings class="theme" 
      draggable="true"
      @dragstart.native="dragstart"
      @dragend.native="dragend"
      :style="{left:`${ThemesetX}px`, top:`${ThemesetY}px`}"
      ></ThemeSettings>
  </section>
</template>

<script>
import ThemeSettings from '@/components/ThemeSettings'
export default {
  components:{
    ThemeSettings
  },
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    ThemesetX() {
      if(this.ThemeoffsetX > this.ClientWidth) return this.ClientWidth
      else if(this.ThemeoffsetX < 0) return 0
      else return this.ThemeoffsetX
    },
    ThemesetY() {
      if(this.ThemeoffsetY > this.ClientHeight) return this.ClientHeight
      else if(this.ThemeoffsetY < 0) return 0
      else return this.ThemeoffsetY
    }
  },
  data() {
    return {
      ThemeoffsetX: 0,
      ThemeoffsetY: 365,
      offsetX: 0,
      offsetY: 0,
      ClientWidth: 0,
      ClientHeight: 0
    }
  },
  mounted() {
    this.ClientWidth = this.$refs.appmain.clientWidth - 48 // 可移动最大阈值x轴范围 = appMain最大宽度 - themes最大宽度 
    this.ThemeoffsetX = this.ClientWidth
    this.ClientHeight = this.$refs.appmain.clientHeight - 48
  },
  methods: {
    dragstart(e) {
      let {clientX, clientY} = e
      this.offsetX = clientX
      this.offsetY = clientY
    },
    dragend(e) {
      let {clientX, clientY} = e
      let currentX = clientX - this.offsetX // 计算偏移量
      let currentY = clientY - this.offsetY
      this.ThemeoffsetX += currentX
      this.ThemeoffsetY += currentY
    }
  }
}
</script>

<style scoped lang="scss">
.app-main {
  /*85 = navbar  */
  min-height: calc(100vh - 85px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 24px;
  .theme{
    position: absolute;
    z-index: 9999;
  }
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
