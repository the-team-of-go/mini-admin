import request from '@/utils/remote-request'

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

export function fetchMachineInfoList(query) {
  return request({
    url: '/machine/info/list',
    method: 'get',
    params: query
  })
}
