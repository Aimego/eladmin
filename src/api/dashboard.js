import request from '@/utils/request'

// 总浏览次数 (浏览，点赞，收藏)
export function WorkBenchCount() {
    return request({
        url: '/api/dean/workbench/count'
    })
}

// 总开课次数
export function openCourse() {
    return request({
        url: '/api/dean/workbench/openCourse'
    })
}

// 总实验人次
export function testCount() {
    return request({
        url: '/api/dean/workbench/testCount'
    })
}

// header数据统计
export function headerStatistic() {
    return Promise.all([WorkBenchCount(), openCourse(), testCount()])
}

// 实验评价统计
export function evaluate(page,size) {
    return request({
        method: 'POST',
        url: '/api/dean/workbench/evaluate',
        data: {
            page,size
        }
    })
}

// 统计实验平均分
export function WorkbenchWeek(we, id) {
   return request({
    url: '/api/dean/workbench/week',
    params: {
        we,id
    }
   }) 
}

// 最近实验平均分
export function WorkbenchLately(id) {
    return request({
        url: `/api/dean/workbench/lately${id}`
    })
}

// 根据专业获取专业实验数
export function WorkbenchItem() {
    return request({
        url: '/api/dean/workbench/item'
    })
}