import request from '@/utils/request'

// 课程id查询班级
export function courseByIdClass(courseId, page, size) {
    return request({
        method: 'POST',
        url: '/api/dean/Curriculum/byCid',
        data: {
            courseId,
            page,
            size
        }
    })
}

// 成绩分析
export function analysisById(id) {
    return request({
        url: `/api/dean/Curriculum/analysis${id}`
    })
}