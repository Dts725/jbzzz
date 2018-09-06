import request from '@/utils/request'

export function getList(params = '', page = 1, comid=-1, name) {
  let url = name == 'admin' ? `/appointment?username=${encodeURI(params)}&page=${page}&admin=1` : `/appointment?community_id=${comid}&username=${encodeURI(params)}&page=${page}&admin=1`;
  return request({
    url: url,
    method: 'get'
  })
}

export function getDetail(id) {
  return request({
    url: `/appointment/${id}`,
    method: 'get'
  })
}

export function handleManager(params, flag) {
  const id = params.id
  delete params.id
  params.authority = flag
  return request({
    url: `/appointment/${id}`,
    method: 'put',
    data: params
  })
}
