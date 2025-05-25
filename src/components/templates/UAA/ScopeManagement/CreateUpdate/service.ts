import { authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'

export const createPermissionGroup = (data: any) => {
  return authUAAAPI({
    method: 'post',
    url: 'cms/api/v1/scopes',
    data,
  })
}

export const updatePermissionGroup = (data: any, id: string | number) => {
  return authUAAAPI({
    method: 'put',
    url: `cms/api/v1/scopes/${id}`,
    data,
  })
}

export const getFeatureByScope = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/scopes/service-api',
    params,
  })
}

export const useQueryGetFeatureByScope = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/group-permissions/feature-api', params],
    () => getFeatureByScope(params),
    { ...defaultOption, ...options }
  )
}

export const getAllSystem = () => {
  const params = {
    page: 0,
    size: 100,
  }
  return authUAAAPI({ method: 'get', url: '/cms/api/v1/systems', params })
}
