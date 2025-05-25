import { authMdmApi, authUAAAPI } from '@/config/axiosConfig'

export const getListScope = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: 'cms/api/v1/scopes',
    params,
  })
}

export const getListTiers = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/mdm/tiers',
    params,
  })
}

export const deleteRow = (id: number | string, version: number) => {
  return authUAAAPI({
    method: 'delete',
    url: `cms/api/v1/scopes/${id}/versions/${version}`,
  })
}

export const changeStatusPermission = (id: number, version: number) => {
  return authUAAAPI({
    method: 'put',
    url: `cms/api/v1/scopes/${id}/publish/versions/${version}`,
  })
}

export const getListUsersByRole = (id: number | string) => {
  const api = 'api/v1/user/list-by-group-permission'
  const params = { groupPermissionId: id }
  return authUAAAPI({ method: 'get', url: api, params })
}

export const getRoleDetail = (id: number | string) => {
  return authUAAAPI({
    method: 'get',
    url: `cms/api/v1/scopes/${id}`,
  })
}

export const getApiByProduct = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: 'api/v1/api/list-by-group-permission',
    params,
  })
}
