<template>
    <div id="pillar"></div>
</template>

<script>
export default {
    name:'PillarEchats',
    methods: {
        InitPil(xData, seriesData) {
            const option = {
                xAxis: {
                    type: 'category',
                    data: xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: seriesData,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }]
            }
            const PillarEchats = this.$echarts.init(document.getElementById('pillar'))
            PillarEchats.setOption(option)
            window.addEventListener('resize',() => {
                PillarEchats.resize()
            })
        }
    }
}
</script>