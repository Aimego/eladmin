import request from '@/utils/request'

export function getDataIndicators(eid) {
    return request({
      url: '/api/edu/workbench/getDataIndicators',
      method: 'get',
      params: {eid}
    })
}