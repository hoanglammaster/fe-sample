import { authMdmApi, authUAAAPI } from '@/config/axiosConfig'
import { ConfigRoleTypeInterface } from './type'

export const getDetailConfigRoleType = (id: number) => {
  return authUAAAPI({
    url: `api/v1/tier-group-permission-ref/${id}`,
    method: 'get',
  })
}

export const createUpdateConfigRoleType = (data: ConfigRoleTypeInterface) => {
  if (data?.id) {
    return authUAAAPI({
      url: `api/v1/tier-group-permission-ref/${data.id}`,
      method: 'put',
      data,
    })
  } else
    return authUAAAPI({
      url: `api/v1/tier-group-permission-ref`,
      method: 'post',
      data,
    })
}

export const getListRoleTypeBySystem = (params: any) => {
  return authMdmApi({
    url: '/public-api/v1/system/role-types',
    params,
    method: 'get',
    disableToken: true,
  })
}

export const getListRoleTypeStartWith9 = (params: any) => {
  return authUAAAPI({
    url: '/cms/api/v1/mdm/role-types',
    params,
    method: 'get',
  })
}

export const getListTierByRoleType = (params: any) => {
  return authUAAAPI({
    url: '/cms/api/v1/mdm/tiers',
    params,
    method: 'get',
  })
}

export const getListLanguage = (params: any) => {
  return authUAAAPI({
    url: '/public-api/v1/languages',
    params,
    method: 'get',
  })
}

export const getListGroupPermissionBySystem = (params: any) => {
  return authUAAAPI({
    url: 'cms/api/v1/group-permissions',
    params,
    method: 'get',
  })
}
