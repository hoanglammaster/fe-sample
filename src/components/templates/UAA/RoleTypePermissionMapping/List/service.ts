import { authMdmApi, authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'

export const getListRoleTypePermissionMapping = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/role-types',
    params,
  })
}

export const deleteData = (id: number) => {
  return authUAAAPI({
    method: 'delete',
    url: `/cms/api/v1/features${id}`,
  })
}

export const getListRoleType = (params: any) => {
  return authUAAAPI({
    url: '/cms/api/v1/mdm/role-types',
    params,
    method: 'get',
  })
}

const getListTierByRoleType = (params: any) => {
  return authUAAAPI({
    url: '/cms/api/v1/mdm/tiers',
    params,
    method: 'get',
  })
}

export const useQueryGetListRoleType = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/role-types', params],
    () => getListRoleType(params),
    { ...defaultOption, ...options }
  )
}

export const useQueryGetListTier = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/systems', params],
    () => getListTierByRoleType(params),
    { ...defaultOption, ...options }
  )
}
