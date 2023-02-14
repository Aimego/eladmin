import request from '@/utils/request'
import objfilters from '@/utils/filters' // 过滤queyr对象，如果对象值为空则不传该key
// 查询所有实验
export function experimentAll(page, size, query) {
  return request({
    method: 'POST',
    url: '/experiment',
    data: {
      page,
      size,
      filters: objfilters(query)
    }
  })
}

// 查询所有专业
export function professional() {
  return request({
    url: '/experiment/professional'
  })
}

// 编辑实验
export function editExperiment(form) {
  return request({
    method: 'POST',
    url: '/experiment/editExperiment',
    data: form
  })
}

// 添加实验
export function addExperiment(form) {
  return request({
    method: 'POST',
    url: '/experiment/addExperiment',
    data: form
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
      name: ''
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
      eid, id
    }
  })
}

// 实验统计
export function experimentStatistic(id) {
  return request({
    url: `/api/dean/test/count${id}`
  })
}
