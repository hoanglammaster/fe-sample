import { authMdmApi, authParnerApi, authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { getListScope } from '../../ScopeManagement/List/service'

export const changeStatusFeature = (id: number) => {
  return authUAAAPI({
    method: 'put',
    url: `/cms/api/v1/clients/${id}/status`,
  })
}

export const createUpdateSystemFeatureMapping = (
  data: any,
  isCreate: boolean
) => {
  return authUAAAPI({
    method: isCreate ? 'post' : 'put',
    url: `/cms/api/v1/clients/${data.clientId}/scopes`,
    data,
  })
}

export const getListClientForScope = async (params: any) => {
  try {
    const { data } = await authUAAAPI({
      url: '/cms/api/v1/clients/list',
      method: 'get',
      params,
    })
    return data?.data
  } catch (e) {}
}

export const useQueryGetListClientForScope = (params: any, options?: any) => {
  return useQuery(
    [`api/v1/config`, params],
    () => getListClientForScope(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getFeatureMappingDetail = (id: number, params?: any) => {
  return authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/clients/${id}/scopes`,
    params,
  })
}

export const getListOptionApi = (params: any) => {
  return authUAAAPI({
    url: 'api/v1/api/list',
    params,
    method: 'get',
  })
}

export const useGetListOptionApi = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/systems', params],
    () => getListOptionApi(params),
    { ...defaultOption, ...options }
  )
}

export const getListTransType = () => {
  return authUAAAPI({
    url: '/cms/api/v1/partner/trans-types',
    method: 'get',
  })
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
