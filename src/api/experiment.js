import request from '@/utils/request'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
// 查询所有实验
export function experimentAll(page, size){
    return request({
        method: 'POST',
        url: '/api/dean/test/pageAll',
        data: { 
            id:'',
            name:'',
            page,
            size
        }
    })
}

// 实验id获取课程
export function experimentCourse(id, page, size) {
    return request({
        method: 'POST',
        url: '/api/dean/Test/course',
        data: {
            id,
            page,
            size,
            name:''
        }
    })
}


// 统计实验平均分
export function experimentResult(eid, we, id) {
    return request({
        url: '/api/dean/Test/week',
        params: {
            eid, we, id
        }
    })
}

// 实验成绩统计
export function achievement(id) {
    return request({
        url: `/api/dean/test/achievement${id}`
    })
}

// 实验人次统计(0周2月3年)
export function frequency(id, eid) {
    return request({
        url: `/api/dean/test/frequency`,
        params: {
            eid,id
        }
    })
}

// 实验统计
export function experimentStatistic(id) {
    return request({
        url: `/api/dean/test/count${id}`
    })
}