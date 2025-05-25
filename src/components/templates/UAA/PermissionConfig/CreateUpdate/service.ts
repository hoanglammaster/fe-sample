import { authUAAAPI } from '@/config/axiosConfig'

export const createPermissionGroup = (data: any) => {
  return authUAAAPI({
    method: 'post',
    url: 'cms/api/v1/group-permissions',
    data,
  })
}

export const updatePermissionGroup = (data: any, id: string | number) => {
  return authUAAAPI({
    method: 'put',
    url: `cms/api/v1/group-permissions/${id}`,
    data,
  })
}

export const getAllSystem = () => {
  const params = {
    page: 0,
    size: 100,
  }
  return authUAAAPI({ method: 'get', url: '/cms/api/v1/systems', params })
}
