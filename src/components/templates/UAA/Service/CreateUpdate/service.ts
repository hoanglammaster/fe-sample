import { authUAAAPI } from '@/config/axiosConfig'

export const createUpdateService = (data: any) => {
  return authUAAAPI({ method: 'post', data, url: 'cms/api/v1/services' })
}

export const updateService = (data: any, serviceId: number) => {
  return authUAAAPI({
    method: 'put',
    url: `cms/api/v1/services/${serviceId}`,
    data,
  })
}

export const getDetailService = (params: any) => {
  return authUAAAPI({
    method: 'get',
    params,
    url: `cms/api/v1/services/${params.serviceId}`,
  })
}

export const changeStatusService = (params: any) => {
  return authUAAAPI({
    method: 'put',
    url: `cms/api/v1/services/${params.serviceId}/publish/versions/${params.version}`,
  })
}
