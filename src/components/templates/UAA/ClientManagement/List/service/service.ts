import { authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { ClientType } from '../../Save/type'
import { errorMsg } from '@/helper/message'
import { string } from 'zod'

export const getListClient = async (params: any) => {
  try {
    const { data } = await authUAAAPI({
      url: 'cms/api/v1/clients',
      method: 'get',
      params,
    })
    return data?.data
  } catch (e) {}
}

export const useQueryGetListClient = (params: any, options?: any) => {
  return useQuery([`api/v1/config`, params], () => getListClient(params), {
    ...defaultOption,
    ...options,
  })
}

export const getClientDetail = async (id: string) => {
  const { data } = await authUAAAPI({
    url: `cms/api/v1/clients/${id}`,
    method: 'get',
  })
  return data?.data
}

export const createClient = async (dataBody: ClientType) => {
  return await authUAAAPI({
    url: `cms/api/v1/clients`,
    method: 'post',
    data: dataBody,
  })
}

export const updateClient = async (
  dataBody: ClientType,
  id: string | number
) => {
  return await authUAAAPI({
    url: `cms/api/v1/clients/${id}`,
    method: 'put',
    data: dataBody,
  })
}

export const generateSecretClientKey = async () => {
  const { data } = await authUAAAPI({
    url: '/cms/api/v1/clients/secret',
    method: 'get',
  })
  return data?.data
}

export const publishClient = async (id: number | string, version: number) => {
  const { data } = await authUAAAPI({
    url: `/cms/api/v1/clients/${id}/publish/versions/${version}`,
    method: 'put',
  })
  return data
}

export const deleteClient = async (id: number, version: number) => {
  const { data } = await authUAAAPI({
    method: 'delete',
    url: `cms/api/v1/clients/${id}/versions/${version}`,
  })
  return data
}

export const actionClient = async (
  id: number | string,
  action: string,
  version: number
) => {
  const { data } = await authUAAAPI({
    method: 'put',
    url: `cms/api/v1/clients/${id}/${action}/versions/${version}`,
    params: id,
  })
  return data ?? data?.data
}

export const getConfigKey = async (params: { configKey: string }) => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/config/${params.configKey}`,
  })
  return data ?? data?.data
}
