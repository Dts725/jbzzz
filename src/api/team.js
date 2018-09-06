import request from '@/utils/request'

export function getList(params = '', comid = -1, name) {
  let url = name=='admin' ? `/team?teamname=${encodeURI(params)}` : `/team?community_id=${comid}&teamname=${encodeURI(params)}`;
  return request({
    url: url,
    method: 'get'
  })
}

export function getDetail(id) {
  return request({
    url: `/team/${id}`,
    method: 'get'
  })
}

export function addItem(params) {
  return request({
    url: '/team',
    method: 'post',
    data: params
  })
}

export function editorItem(params) {
  const id = params.id
  delete params.id
  return request({
    url: `/team/${id}`,
    method: 'put',
    data: params
  })
}

export function delItems(ids) {
  return request({
    url: `/team/${ids}`,
    method: 'delete'
  })
}

// 获取团队成员列表
export function getTeamMemberList(team_id) {
  return request({
    url: `/team_list?team_id=${encodeURI(team_id)}`,
    method: 'get'
  })
}

// 删除团队成员
export function delTeamMember(team_id, uid) {
  return request({
    url: `/team_delete?team_id=${team_id}&uid=${uid}`,
    method: 'get'
  })
}

// 新增团队成员
export function addTeamMember(params) {
  return request({
    url: '/team_add',
    method: 'post',
    data: params
  })
}

