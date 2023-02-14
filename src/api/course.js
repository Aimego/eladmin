import request from '@/utils/request'

// 查看所有课程
export function coursePageAll(page, size) {
  return request({
    method: 'POST',
    url: '/api/dean/Curriculum/pageAll',
    data: {
      courseId: '',
      name: '',
      page,
      size
    }
  })
}

// id查询课程
export function courseById(id) {
  return request({
    url: `/api/dean/Curriculum/byId${id}`
  })
}

// 课程审核通过
export function adoptById(id) {
  return request({
    url: `/api/dean/Curriculum/adopt/${id}`
  })
}

// 课程审核不通过
export function failById(id) {
  return request({
    url: `/api/dean/Curriculum/fail/${id}`
  })
}
