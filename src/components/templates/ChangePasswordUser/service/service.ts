import { authUAAAPI } from '@/config/axiosConfig'

export const putChangePasswordUser = async (requestBody: any) => {
  const { data } = await authUAAAPI({
    method: 'put',
    url: '/cms/api/v1/user/change-password',
    data: requestBody,
  })
  return data
}
