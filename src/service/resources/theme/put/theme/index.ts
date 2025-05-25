import { authResourceApi } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const putThemeConfig = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  return await authResourceApi({
    method: 'put',
    url: 'api/v1/color-theme',
    params: {
      companyId: requestBody.companyId,
    },
    data: requestBody.data,
  })
}
