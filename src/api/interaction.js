import request from '@/utils/request'

// 讨论总量排行
export function interactPageAll(page, size) {
    return request({
        method: 'POST',
        url: '/api/dean/interact/pageAll',
        data: {
            page, size
        }
    })
}

// 学生发帖量
export function interactStudent(page, size) {
    return request({
        method: 'POST',
        url: '/api/dean/interact/student',
        data: {
            page, size
        }
    })
}

// 老师发帖量
export function interactTeacher(page, size) {
    return request({
        method: 'POST',
        url: '/api/dean/interact/teacher',
        data: {
            page, size
        }
    })
}

// 最近讨论
export function interactRecently(page, size) {
    return request({
        method: 'POST',
        url: '/api/dean/interact/pageAll',
        data: {
            page, size
        }
    })
}

// 删除讨论
export function interactDelete(id) {
    return request({
        url: `/api/dean/interact/del${id}`
    })
}