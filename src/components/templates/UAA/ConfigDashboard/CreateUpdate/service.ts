import { authUAAAPI } from '@/config/axiosConfig'

export const handleDashboard = (params: any, data: any, method: string) => {
  return authUAAAPI({
    method,
    url: 'api/v1/dashboard',
    params,
    data,
  })
}
