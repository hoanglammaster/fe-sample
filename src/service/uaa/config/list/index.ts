import { authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getConfigList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: 'api/v1/config/list',
    params,
  })

  return data
}

export const useQueryGetConfigList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/config/list', params],
    () => getConfigList(params),
    { ...defaultOption, ...options }
  )
}
