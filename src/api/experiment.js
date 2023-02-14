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

// 删除实验
export function deleteExperiment(_id) {
  return request({
    method: 'POST',
    url: '/experiment/deleteExperiment',
    data: {
      _id
    }
  })
}
