import { authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'

export const getConfigDetail = async (params: any): Promise<any> => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/config`,
    params: {
      configId: params?.id,
    },
  })
  return data
}

export const useQueryGetConfigDetail = (params: any, options?: any) => {
  return useQuery([`/api/v1/config`, params], () => getConfigDetail(params), {
    ...defaultOption,
    ...options,
  })
}

export const putConfig = async (requestBody: any): Promise<any> => {
  return await authUAAAPI({
    method: 'put',
    url: `/cms/api/v1/config`,
    params: {
      configId: requestBody?.id,
    },
    data: requestBody,
  })
}
