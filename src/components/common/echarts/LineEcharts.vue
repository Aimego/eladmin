<template>
  <div id="line" />
</template>

<script>
export default {
  name: 'LineEcharts',
  methods: {
    InitLine(option) {
      const lineEcharts = this.$echarts.init(document.getElementById('line'))
      lineEcharts.setOption(option)
      window.addEventListener('resize', () => {
        lineEcharts.resize()
      })
    }
  }
}
</script>
