import request from '@/utils/remote_request'

export function fetchMachineList() {
  return request({
    url: '/machine/list',
    method: 'get'
  })
}

export function fetchMachineStatus(id) {
  return request({
    url: '/machine/info/now',
    method: 'get',
    params: { id }
  })
}

export function fetchMachineInfoList(query, type) {
  return request({
    url: '/machine/info/list',
    method: 'get',
    params: {
      id: query.id,
      start: query.start,
      end: query.end,
      type: type
    }
  })
}
