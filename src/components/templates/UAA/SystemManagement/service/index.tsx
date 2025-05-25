import { authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'

const END_POINT = '/public-api/v1/system'

export const getSystem = async (params: any) => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/systems`,
    params,
  })
  return data?.data
}

export const getSystemPublic = async (params: any) => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: `${END_POINT}/list`,
    params,
  })
  return data?.data
}

export const getListSystemNotMap = async (params: any) => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: 'cms/api/v1/systems/system-not-map',
    params,
  })
  return data ?? data?.data
}

export const useQueryGetListSystemNotMap = (params: any, options?: any) => {
  return useQuery<any>(
    ['cms/api/v1/systems/system-not-map', params],
    () => getListSystemNotMap(params),
    { ...defaultOption, ...options }
  )
}

export const useQueryGetListSystem = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/systems', params],
    () => getSystem(params),
    { ...defaultOption, ...options }
  )
}

export const useQueryGetListSystemPublic = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/systems', params],
    () => getSystemPublic(params),
    { ...defaultOption, ...options }
  )
}

export const getDetailSystem = (id: number) => {
  return authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/systems/${id}`,
  })
}

export const getListFeature = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/features',
    params,
  })
}

export const getListFeatureMap = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: 'cms/api/v1/systems/feature-map',
    params,
  })
}

export const useQueryGetListFeatureMap = (params: any, options?: any) => {
  return useQuery<any>(
    ['cms/api/v1/systems/feature-map', params],
    () => getListFeatureMap(params),
    { ...defaultOption, ...options }
  )
}

export const saveSystem = (data: any, config = {}) => {
  if (data.hasOwnProperty('id') && data['id']) {
    return authUAAAPI({
      method: 'put',
      url: `/cms/api/v1/systems/${data['id']}`,
      data,
    })
  }
  return authUAAAPI({
    method: 'post',
    url: '/cms/api/v1/systems',
    data,
  })
}

export const changeStatusSystem = (systemId: number, version: number) => {
  return authUAAAPI({
    method: 'put',
    url: `cms/api/v1/systems/${systemId}/publish/versions/${version}`,
  })
}

export const deleteData = (systemId: number, version: number) => {
  return authUAAAPI({
    method: 'delete',
    url: `cms/api/v1/systems/${systemId}/versions/${version}`,
  })
}

export const modifyProductFeature = (params: any) => {
  return authUAAAPI({
    method: 'put',
    url: 'api/v1/system/modify-feature',
    params,
  })
}

export const getFeatureByProduct = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/group-permissions/feature-action',
    params,
  })
}

export const useQueryGetFeatureByProduct = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/group-permissions/feature-action', params],
    () => getFeatureByProduct(params),
    { ...defaultOption, ...options }
  )
}

export const getFeatureBysystem = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: 'api/v1/feature/list-by-system',
    params,
  })
}

export const fileUploadUAA = (data: any, params = {}) => {
  return authUAAAPI({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: 'api/v1/system/upload-image',
    data,
    params,
    isFileUpload: true,
  })
}
