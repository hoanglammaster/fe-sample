import { authMdmApi, authParnerApi, authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'

export const createUpdateFeature = (data: any, method: string) => {
  if (!!data?.id) {
    return authUAAAPI({
      method,
      url: `/cms/api/v1/features/${data.id}`,
      data,
    })
  }
  return authUAAAPI({ method, url: '/cms/api/v1/features', data })
}

export const changeStatusFeature = (id: number, version: number) => {
  return authUAAAPI({
    method: 'put',
    url: `/cms/api/v1/features/${id}/publish/versions/${version}`,
  })
}

export const modifyFeatureApi = (params: any) => {
  return authUAAAPI({
    method: 'put',
    url: '/cms/api/v1/features/modify-api',
    params,
  })
}

export const getFeatureDetail = (id: number) => {
  return authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/features/${id}`,
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
export const useGetListPartner = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/systems', params],
    () => getListPartner(params),
    { ...defaultOption, ...options }
  )
}

export const checkApiMapped = async (params: {
  apiId: number
  featureId: number
}) => {
  const { data } = await authUAAAPI({
    url: `/cms/api/v1/features/${params?.featureId}/check-api/${params?.apiId}`,
    method: 'put',
    params,
  })
  return data?.data ?? data
}

export const getListSubPartner = async (params: {
  serviceId: number
  partnerId: number
}) => {
  const { data } = await authUAAAPI({
    url: `/cms/api/v1/partner/sub-partner`,
    method: 'get',
    params,
  })
  return data ?? {}
}

export const useGetListSubPartner = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/systems', params],
    () => getListSubPartner(params),
    { ...defaultOption, ...options }
  )
}
