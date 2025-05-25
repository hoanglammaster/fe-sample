import { authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'

const END_POINT = 'cms/api/v1/apis'

export const getApi = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: `${END_POINT}`,
    params,
  })
}

export const useQueryGetApi = (params: any, options?: any) => {
  return useQuery<any>([`${END_POINT}`, params], () => getApi(params), {
    ...defaultOption,
    ...options,
  })
}

export const postApi = (data: any) => {
  if (data.hasOwnProperty('id') && data['id']) {
    return authUAAAPI({
      method: 'put',
      url: `${END_POINT}/${data['id']}`,
      data,
    })
  }
  return authUAAAPI({ method: 'post', url: END_POINT, data })
}

export const changeApiStatus = (id: number, version: number) => {
  return authUAAAPI({
    method: 'put',
    url: `${END_POINT}/${id}/publish/versions/${version}`,
  })
}
export const getDetailApi = (id: number) => {
  const params = { id }
  return authUAAAPI({
    method: 'get',
    url: `${END_POINT}/${id}`,
  })
}

export const getListService = async (params: any) => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/services',
    params: { ...params },
  })
  return data
}

export const useQueryGetListService = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/services', params],
    () => getListService(params),
    { ...defaultOption, ...options }
  )
}

export const deleteApi = (id: number, version: number) => {
  return authUAAAPI({
    method: 'delete',
    url: `${END_POINT}/${id}/versions/${version}`,
  })
}

export const importApi = async (data) => {
  return await authUAAAPI({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    url: '/cms/api/v1/apis/import-export',
    data,
    isFileUpload: true,
  })
}

export const exportTemplateApi = async () => {
  return await authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/apis/import-export/template',
    responseType: 'blob',
  })
}
