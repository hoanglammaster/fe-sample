import { authUAAAPI } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQueryConfig'

export const getListFeature = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/features',
    params,
  })
}

export const useQueryGetListFeature = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/features', params],
    () => getListFeature(params),
    { ...defaultOption, ...options }
  )
}

export const deleteData = (id: number, version: number) => {
  return authUAAAPI({
    method: 'delete',
    url: `/cms/api/v1/features/${id}/versions/${version}`,
  })
}

export const getListApis = async (params: any) => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/apis',
    params,
  })
  return data
}

export const getListSystems = async (params: any) => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/systems',
    params,
  })
  return data
}

export const exportTemplateFileFeatureImport = async () => {
  return await authUAAAPI({
    method: 'get',
    url: 'api/v1/cms/features/export-template',
    responseType: 'blob',
  })
}

export const importTemplateFileFeatureImport = async (data) => {
  return await authUAAAPI({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    url: 'api/v1/cms/features/import',
    data,
    isFileUpload: true,
  })
}

export const useQueryGetListApis = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/apis', params],
    () => getListApis(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
