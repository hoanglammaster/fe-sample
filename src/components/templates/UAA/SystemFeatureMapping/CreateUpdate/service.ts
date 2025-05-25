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

export const changeStatusFeature = (id: number) => {
  return authUAAAPI({
    method: 'put',
    url: `/cms/api/v1/features/${id}/status`,
  })
}

export const createUpdateSystemFeatureMapping = (
  data: any,
  isCreate: boolean
) => {
  return authUAAAPI({
    method: isCreate ? 'post' : 'put',
    url: `/cms/api/v1/systems/${data.systemId}/features`,
    data,
  })
}

export const modifyFeatureApi = (params: any) => {
  return authUAAAPI({
    method: 'put',
    url: '/cms/api/v1/features/modify-api',
    params,
  })
}

export const getFeatureMappingDetail = (id: number, params?: any) => {
  return authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/systems/${id}/features`,
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
export const useGetListPartner = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/systems', params],
    () => getListPartner(params),
    { ...defaultOption, ...options }
  )
}

export const checkFeatureSystemMapped = async (params: {
  featureId: number
  systemId: number
}) => {
  const { data } = await authUAAAPI({
    url: `/cms/api/v1/systems/${params?.systemId}/check-feature/${params?.featureId}`,
    method: 'put',
    params,
  })
  return data?.data ?? data
}

export const getListServicePartner = async (params: any) => {
  const { data } = await authParnerApi({
    url: '/api/v1/cms/services',
    method: 'get',
    params,
  })
  return data?.data ?? data
}

export const useQueryGetListServicePartner = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/cms/services', params],
    () => getListServicePartner(params),
    { ...defaultOption, ...options }
  )
}
