import { authUAAAPI } from '@/config/axiosConfig'

export const handleMenuConfig = (params: any, data: any, method: string) => {
  return authUAAAPI({
    method,
    url: '/cms/api/v1/menu-configs',
    params,
    data,
  })
}

export const getDetailMenuConfig = (id: string) => {
  return authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/menu-configs/${id}`,
  })
}

export const createMenuConfig = (data: any) => {
  return authUAAAPI({
    method: 'post',
    url: `/cms/api/v1/menu-configs`,
    data,
  })
}

export const updateMenuConfig = (id: string, data: any) => {
  return authUAAAPI({
    method: 'put',
    url: `/cms/api/v1/menu-configs/${id}`,
    data,
  })
}
