import request from '@/utils/request'

export function getList(params = '', comid = -1, name) {
  let url = name=='admin' ? `/field?fieldname=${encodeURI(params)}` : `/field?community_id=${comid}&fieldname=${encodeURI(params)}`;
  return request({
    url: url,
    method: 'get'
  })
}

export function getDetail(id) {
  return request({
    url: `/field/${id}`,
    method: 'get'
  })
}

export function addItem(params) {
  return request({
    url: '/field',
    method: 'post',
    data: params
  })
}

export function editorItem(params) {
  const id = params.id
  delete params.id
  return request({
    url: `/field/${id}`,
    method: 'put',
    data: params
  })
}

export function delItems(ids) {
  return request({
    url: `/field/${ids}`,
    method: 'delete'
  })
}

