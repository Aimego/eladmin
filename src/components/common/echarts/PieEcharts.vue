<template>
  <div id="pie" />
</template>

<script>
export default {
  name: 'PieEcharts',
  methods: {
    InitPie(option) {
      // const option = {
      //     legend: {
      //         top: 'bottom'
      //     },
      //     series: [{
      //         name: 'Nightingale Chart',
      //         type: 'pie',
      //         radius: [50, 100],
      //         center: ['50%', '50%'],
      //         roseType: 'area',
      //         itemStyle: {
      //         borderRadius: 8
      //     },
      //     data: [
      //         { value: 40, name: 'rose 1' },
      //         { value: 38, name: 'rose 2' },
      //         { value: 32, name: 'rose 3' }
      //     ]}
      //  ]
      // }
      // console.log(option)
      const PieEcharts = this.$echarts.init(document.getElementById('pie'))
      PieEcharts.setOption(option)
      window.addEventListener('resize', () => {
        PieEcharts.resize()
      })
    }
  }
}
</script>
