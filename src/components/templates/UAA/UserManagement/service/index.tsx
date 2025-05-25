import { authUAAAPI } from '@/config/axiosConfig'

export const getListUser = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: 'cms/api/v1/user/list',
    params,
  })
}
export const deleteData = (id: number) => {
  const params = { userId: id }
  return authUAAAPI({
    method: 'delete',
    url: 'api/v1/user',
    params,
  })
}

export const getUserInfo = (id: number) => {
  return authUAAAPI({ method: 'get', url: `api/v1/user/${id}` })
}

export const getDetailUserRoleType = (id: number) => {
  return authUAAAPI({
    method: 'get',
    url: `cms/api/v1/user/user-role-type/${id}`,
  })
}

export const createUser = (data: any) => {
  return authUAAAPI({ method: 'post', url: 'cms/api/v1/user', data })
}
export const updateUser = (data: any, userId: number) => {
  return authUAAAPI({ method: 'put', url: `cms/api/v1/user/${userId}`, data })
}

export const updateUserPublicInfo = (data: any, userId: number) => {
  return authUAAAPI({ method: 'put', url: `cms/api/v1/user/user-info`, data })
}

export const getRoleUser = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: 'cms/api/v1/group-permissions/list-by-user',
    params,
  })
}

export const getProductUser = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: 'api/v1/system/list-by-user',
    params,
  })
}

export const modifyRoleUser = (params: any) => {
  return authUAAAPI({
    method: 'put',
    url: 'api/v1/user/modify-role',
    params,
  })
}

export const getListRole = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: 'cms/api/v1/group-permissions/list',
    params: { ...params, page: 0, size: 100 },
  })
}

export const getListProduct = () => {
  return authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/systems/available',
  })
}

export const getMenuByCode = (systemCode: string) => {
  return authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/menu-configs/config',
    params: { systemCode, platform: 'WEB' },
  })
}

export const updateUserPassword = (data: any) => {
  return authUAAAPI({
    method: 'put',
    url: 'api/v1/user/reset-password',
    data,
  })
}

export const resetPassword = async (data: any) => {
  return authUAAAPI({
    method: 'put',
    url: 'cms/api/v1/user/reset-password',
    data,
  })
}

export const actionUser = async (
  id: number,
  action: string,
  version: number
) => {
  const { data } = await authUAAAPI({
    method: 'put',
    url: `cms/api/v1/user/user-role-type/${id}/${action}/versions/${version}`,
  })
  return data ?? data?.data
}
