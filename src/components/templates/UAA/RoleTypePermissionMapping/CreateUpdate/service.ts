import { authParnerApi, authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { getListScope } from '../../ScopeManagement/List/service'

export const changeStatusFeature = (id: number) => {
  return authUAAAPI({
    method: 'put',
    url: `/cms/api/v1/clients/${id}/status`,
  })
}

export const createUpdateRoleTypePermissionMapping = (
  data: any,
  isCreate: boolean
) => {
  return authUAAAPI({
    method: isCreate ? 'post' : 'put',
    url: `/cms/api/v1/role-types/${data.roleTypeId}/tiers/${data?.tierId}/permissions`,
    data,
  })
}

export const getRoleTypePermissionDetail = (
  roleTypeId: number | string,
  tierId: number | string
) => {
  return authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/role-types/${roleTypeId}/tiers/${tierId}/permissions`,
  })
}

export const getListOptionApi = (params: any) => {
  return authUAAAPI({
    url: 'api/v1/api/list',
    params,
    method: 'get',
  })
}

export const getListRoleType = (params: any) => {
  return authUAAAPI({
    url: '/cms/api/v1/role-types/role-type',
    params,
    method: 'get',
  })
}

const getListTierByRoleType = (params: any) => {
  return authUAAAPI({
    url: '/cms/api/v1/role-types/tier',
    params,
    method: 'get',
  })
}

export const useQueryGetListRoleTypeMapping = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/systems', params],
    () => getListRoleType(params),
    { ...defaultOption, ...options }
  )
}

export const useQueryGetListTierMapping = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/systems', params],
    () => getListTierByRoleType(params),
    { ...defaultOption, ...options }
  )
}

//partner

export const getListPartner = (params: any) => {
  return authParnerApi({
    method: 'get',
    url: '/api/v1/partner-info',
    params,
  })
}

export const getPartnerInfo = (params: any) => {
  return authParnerApi({
    method: 'get',
    url: '/api/v1/partner-service/partner-info',
    params,
  })
}

export const useQueryGetListScope = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/systems', params],
    () => getListScope(params),
    { ...defaultOption, ...options }
  )
}
