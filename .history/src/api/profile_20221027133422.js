import request from '@/utils/request'

// 查看用户信息
export function adminById() {
    return request({
        url: '/api/edu/user/byId'
    })
}

// 上传用户头像
export function adminImages(file) {
    let formdata = new FormData()
    formdata.append('file',file)
    return request({
        method: 'POST',
        url: '/api/dean/admin/image',
        data: formdata
    })
}

// 修改用户信息
export function adminUpdate(form) {
    return request({
        method: 'POST',
        url: '/api/dean/admin/update',
        data: form
    })
}