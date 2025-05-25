import { authUAAAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const putConfig = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authUAAAPI({
    method: 'put',
    url: `api/v1/config`,
    params: {
      configId: requestBody?.id,
    },
    data: requestBody,
  })
}
