import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { Response } from './type'
import { authResourceApi } from '@/config/axiosConfig'

export const getThemeConfigAPI = async (
  params?: any
): Promise<Response['GET']> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: 'api/v1/theme-sys-config',
    params,
  })

  return data
}

export const useQueryGetThemeConfigAPI = (
  params: {
    companyId: number
  },
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/theme-sys-config', params],
    () => getThemeConfigAPI(params),
    { ...defaultOption, ...options }
  )
}
