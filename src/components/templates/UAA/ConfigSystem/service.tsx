import { authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { errorMsg } from '@/helper/message'
import { useQuery } from 'react-query'

export const getConfigList = async (params: any): Promise<any> => {
  try {
    const { data } = await authUAAAPI({
      method: 'get',
      url: '/cms/api/v1/config/list',
      params,
    })

    return data
  } catch (e) {}
}

export const getConfigGroupList = async (params: any): Promise<any> => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: '/api/v1/config-group',
    params,
  })

  return data
}

export const useQueryGetConfigList = (params: any, options?: any) => {
  return useQuery<any>(
    ['/ewallet3/common-notification/api/v1/config/list', params],
    () => getConfigList(params),
    { ...defaultOption, ...options }
  )
}

export const useQueryGetConfigGroupList = (params: any, options?: any) => {
  return useQuery(
    ['/ewallet3/common-notification/api/v1/config-group/list', params],
    () => getConfigGroupList(params),
    { ...defaultOption, ...options }
  )
}
