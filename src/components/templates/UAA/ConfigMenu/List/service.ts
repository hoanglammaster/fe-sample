import { authUAAAPI } from '@/config/axiosConfig'

export const getListSystem = (params: any) => {
  return authUAAAPI({ method: 'get', url: '/cms/api/v1/systems', params })
}

export const getListMenuConfig = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/menu-configs',
    params,
  })
}

export const deleteListMenuConfig = (id: number, version: number) => {
  return authUAAAPI({
    method: 'delete',
    url: `/cms/api/v1/menu-configs/${id}/versions/${version}`,
  })
}

export const publishListMenuConfig = (id: number | string, version: number) => {
  return authUAAAPI({
    method: 'put',
    url: `/cms/api/v1/menu-configs/${id}/versions/${version}`,
  })
}

export const checkMenuConfig = (data: any) => {
  return authUAAAPI({
    method: 'post',
    url: '/cms/api/v1/menu-configs/validate',
    data,
  })
}

export const handleMenu = (params: any, data: any, method: string) => {
  return authUAAAPI({
    method,
    url: '/cms/api/v1/menu-configs',
    params,
    data,
  })
}

export const getMenuList = (params: any) => {
  return authUAAAPI({
    method: 'get',
    url: '/cms/api/v1/menu-configs',
    params,
  })
}
