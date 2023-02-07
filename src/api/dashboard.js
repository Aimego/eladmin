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

// 统计实验平均分
export function WorkbenchWeek(we, id) {
   return request({
    url: '/api/dean/workbench/week',
    params: {
        we,id
    }
   }) 
}

// 获取实验周期统计
export function WorkbenchLately(status) {
    return request({
        url: '/dashboard/experimentalPeriod',
        params: {
            status
        }
    })
}

// 获取实验专业统计
export function WorkbenchItem() {
    return request({
        url: '/dashboard/professtional'
    })
}

// 实验评价统计
export function evaluate(page,size) {
    return request({
        method: 'POST',
        url: '/dashboard/experimentalEvaluation',
        data: {
            page,size
        }
    })
}