import { authUAAAPI } from '@/config/axiosConfig'

export const getOtpForgotPassword = (data: any) => {
  return authUAAAPI({
    url: 'public-api/v1/user/forgot-password',
    method: 'post',
    data,
  })
}

export const submitChangePassword = (data: any) => {
  return authUAAAPI({
    url: 'public-api/v1/user/submit-password',
    method: 'post',
    data,
  })
}
