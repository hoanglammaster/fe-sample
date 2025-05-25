import { authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'

export const getListAction = async (params: any) => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/actions',
    params,
  })
  return data?.data ?? data
}

export const useQueryGetListAction = (params: any, options?: any) => {
  return useQuery<any>(
    ['/cms/api/v1/actions', params],
    () => getListAction(params),
    { ...defaultOption, ...options }
  )
}

export const postAction = async (requestBody: any) => {
  const { data } = await authUAAAPI({
    method: 'post',
    url: '/cms/api/v1/actions',
    data: requestBody,
  })
  return data?.data ?? data
}

export const updateAction = async (requestBody: any) => {
  const { data } = await authUAAAPI({
    method: 'put',
    url: `/cms/api/v1/actions/${requestBody?.id}`,
    data: requestBody,
  })
  return data?.data ?? data
}

export const getDetailAction = async (id: number) => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/actions/${id}`,
  })
  return data?.data ?? data
}

export const deleteAction = async (id: number, version: number) => {
  return await authUAAAPI({
    method: 'delete',
    url: `/cms/api/v1/actions/${id}/versions/${version}`,
  })
}

export const publishAction = async (id: number, version: number) => {
  return await authUAAAPI({
    method: 'put',
    url: `/cms/api/v1/actions/${id}/publish/versions/${version}`,
  })
}

export const getMaxSequence = async () => {
  return await authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/actions/max-sequence',
  })
}
