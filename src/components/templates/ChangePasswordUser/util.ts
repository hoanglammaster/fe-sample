import { authUAAAPI } from '@/config/axiosConfig'

export const putChangePasswordUser = async (requestBody: any) => {
  const { data } = await authUAAAPI({
    method: 'put',
    url: 'cms/api/v1/user/change-password',
    data: requestBody,
  })
  return data
}

export const getRegexChangePassword = async () => {
  const { data } = await authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/user/change-password/regex',
  })
  return data
}
