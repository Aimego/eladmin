import request from '@/utils/request'
import myfilters from '@/utils/filters'

// 获取文件资源
export function fileAll(page, size, query) {
  return request({
    method: 'POST',
    url: '/systemTools/resource',
    data: {
      page,
      size,
      filters: myfilters(query)
    }
  })
}

// 删除文件资源
export function deleteFiles(arr) {
  return request({
    method: 'POST',
    url: '/systemTools/deleteResource',
    data: {
      files: arr
    }
  })
}
