import request from '@/utils/request'

export function getList(params = '', page = 1, comid = -1, name, identity = '') {
  let url = name == 'admin' ? `/user?username=${encodeURI(params)}&identity=${identity}&page=${page}` : `/user?community_id=${comid}&username=${encodeURI(params)}&identity=${identity}&page=${page}`;
  return request({
    url: url,
    method: 'get'
  })
}

export function getDetail(id) {
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
}

export function handleManager(params, flag) {
  const id = params.id
  delete params.id
  params.authority = flag
  params.verify = 2
  return request({
    url: `/user/${id}`,
    method: 'put',
    data: params
  })
}

export function getList2(url) {
  return request({
    url: url,
    method: 'get'
  })
}

export function upDate(url, params) {
  return request({
    url: url,
    method: 'put',
    data: params
  })
}
