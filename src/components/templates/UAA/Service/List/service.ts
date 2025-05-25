import { authUAAAPI } from '@/config/axiosConfig'

export const deleteData = (serviceId: number, version: any) => {
  return authUAAAPI({
    method: 'delete',
    url: `cms/api/v1/services/${serviceId}/versions/${version}`,
  })
}
