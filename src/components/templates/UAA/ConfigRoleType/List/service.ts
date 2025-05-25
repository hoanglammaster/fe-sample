import { authUAAAPI } from '@/config/axiosConfig'

export const getListRoleTypeConfig = (params: any) => {
  return authUAAAPI({
    url: 'api/v1/tier-group-permission-ref',
    method: 'get',
    params,
  })
}

export const deleteConfig = (id: number) => {
  return authUAAAPI({
    url: `api/v1/tier-group-permission-ref/${id}`,
    method: 'delete',
  })
}
