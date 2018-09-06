import request from '@/utils/request'

export function getList(params = '', page = 1) {
  return request({
    url: `/active?page=${page}`, // name=${encodeURI(params)}&
    method: 'get'
  })
}

export function getDetail(id) {
  return request({
    url: `/active/${id}`,
    method: 'get'
  })
}

export function handleManager(params, flag) {
  const id = params.id
  delete params.id
  params.authority = flag
  params.verify = 2
  return request({
    url: `/active/${id}`,
    method: 'put',
    data: params
  })
}

export function addItem(params) {
  return request({
    url: '/active',
    method: 'post',
    data: params
  })
}

export function editorItem(params) {
  const id = params.id
  delete params.id
  return request({
    url: `/active/${id}`,
    method: 'put',
    data: params
  })
}

export function delItems(ids) {
  return request({
    url: `/active/${ids}`,
    method: 'delete'
  })
}
