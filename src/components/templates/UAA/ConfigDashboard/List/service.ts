import { authUAAAPI } from '@/config/axiosConfig'

export const getListDashboard = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: 'api/v1/dashboard/list',
    params,
  })
}
