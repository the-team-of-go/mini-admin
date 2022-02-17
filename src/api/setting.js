import request from '@/utils/setting_request'

export function fetchAdminList() {
  return request({
    url: '/v1/admin',
    method: 'get'
  })
}

export function addAdmin(data) {
  return request({
    method: 'post',
    url: '/v1/admin',
    data: data
  })
}

export function delAdmin(id) {
  return request({
    url: '/v1/admin',
    method: 'delete',
    params: { id }
  })
}

export function updateAdmin(data) {
  return request({
    url: '/v1/admin',
    method: 'put',
    data: data
  })
}

export function updateSetting(data) {
  return request({
    url: '/v1/config',
    method: 'put',
    data: data
  })
}

export function fetchSetting() {
  return request({
    url: '/v1/config',
    method: 'get'
  })
}
