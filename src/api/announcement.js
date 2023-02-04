import request from '@/utils/request'

// 查询所有公告
export function announcementPageAll(page, size) {
    return request({
        method: 'POST',
        url: '/api/dean/bulletin/pageAll',
        data: {
            classId: '',
            exId: '',
            name: '',
            page,
            size
        }
    })
}

// id查询公告
export function announcementById(id) {
    return request({
        method: 'GET',
        url: `/api/dean/bulletin/byId${id}`
    })
}

// 添加公告
export function announcementAdd(form) {
    return request({
        method: 'POST',
        url: '/api/dean/bulletin/add',
        data: form
    })
}

// 修改公告
export function announcementUpdate(form) {
    return request({
        method: 'POST',
        url: '/api/dean/bulletin/update',
        data: form
    })
}

// 删除公告
export function announcementDel(id) {
    return request({
        method: 'GET',
        url: `/api/dean/bulletin/del${id}`
    })
}