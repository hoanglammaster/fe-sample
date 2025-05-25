import { authUAAAPI } from '@/config/axiosConfig'

export const getListFeatureMapping = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/systems/features',
    params,
  })
}

export const deleteData = (id: number) => {
  return authUAAAPI({
    method: 'delete',
    url: `/cms/api/v1/features${id}`,
  })
}
