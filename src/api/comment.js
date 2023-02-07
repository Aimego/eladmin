import request from '@/utils/request'

// 分页查询所有评价
export function evaluatePageAll(id, page, size) {
    return request({
        method: 'POST',
        url:'/api/dean/evaluate/pageAll',
        data: {
            id, page, size
        }
    })
}

// 查看评价
export function previewEvaluate(id) {
    return request({
        url: `/dashboard/EvaluationView`,
        params: {
            id
        }
    })
}

// 删除评价
export function DeleteEvaluate(id) {
    return request({
        url: `/dashboard/DelEvaluation`,
        params: {
            id
        }
    })
}