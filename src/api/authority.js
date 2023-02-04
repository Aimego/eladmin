import request from '@/utils/request'

// 分页获取所有用户
export function userPageAll(page, size) {
    return request({
        method: 'POST',
        url: '/api/dean/user/pageList',
        data: {
            page,
            size
        }
    })
}