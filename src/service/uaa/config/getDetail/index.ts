import { authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getConfigDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: `api/v1/config`,
    params: {
      configId: params?.id,
    },
  })
  return data
}

export const useQueryGetConfigDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery([`api/v1/config`, params], () => getConfigDetail(params), {
    ...defaultOption,
    ...options,
  })
}
