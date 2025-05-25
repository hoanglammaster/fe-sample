import { authUAAAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { errorMsg } from '@/helper/message'
import { string } from 'zod'

export const getListSubMenu = async (params: any) => {
    const { data } = await authUAAAPI({
        url: 'cms/api/v1/sub-menu-configs',
        method: 'get',
        params,
    })
    return data?.data
}

export const useQueryGetListSubMenu = (params: any, options?: any) => {
    return useQuery([`api/v1/sub-menu-configs`, params],
        () => getListSubMenu(params), {
        ...defaultOption,
        ...options,
    })
}

export const postSubMenu = async (
    requestBody: any
): Promise<any> => {
    return await authUAAAPI({
        method: 'post',
        url: `cms/api/v1/sub-menu-configs`,
        data: requestBody,
    })
}

export const putSubMenu = async (
    requestBody: any
): Promise<any> => {
    return await authUAAAPI({
        method: 'put',
        url: `cms/api/v1/sub-menu-configs/${requestBody?.id}`,
        data: requestBody,
    })
}

export const getListSystem = async (params: any) => {
    const { data } = await authUAAAPI({
        method: 'get',
        url: `/cms/api/v1/systems`,
        params,
    })
    return data
}

export const getListService = async (params: any) => {
    const { data } = await authUAAAPI({
        method: 'get',
        url: `/cms/api/v1/services`,
        params,
    })
    return data
}

export const getListApi = async (params: any) => {
    const { data } = await authUAAAPI({
        url: 'cms/api/v1/apis',
        method: 'get',
        params,
    })
    return data
}

export const useQueryGetListApi = (params: any, options?: any) => {
    return useQuery([`api/v1/apis`, params],
        () => getListApi(params), {
        ...defaultOption,
        ...options,
    })
}

export const getListAction = async (params: any) => {
    const { data } = await authUAAAPI({
        url: 'cms/api/v1/actions',
        method: 'get',
        params,
    })
    return data?.data
}

export const useQueryGetListAction = (params: any, options?: any) => {
    return useQuery([`api/v1/actions`, params],
        () => getListAction(params), {
        ...defaultOption,
        ...options,
    })
}

export const getDetailSubMenu = async (params: any) => {
    const { data } = await authUAAAPI({
        url: `cms/api/v1/sub-menu-configs/${params?.id}`,
        method: 'get',
    })
    return data?.data
}

export const useQueryGetDetailSubMenu = (params: any, options?: any) => {
    return useQuery([`api/v1/sub-menu-configs/${params?.id}`, params],
        () => getDetailSubMenu(params), {
        ...defaultOption,
        ...options,
    })
}

export const deleteSubMenu = async (
    params: any
): Promise<any> => {
    const { data } = await authUAAAPI({
        method: 'delete',
        url: `cms/api/v1/sub-menu-configs/${params.id}/versions/${params?.version}`,
    })
    return data
}

export const publishSubMenu = async (
    requestData: any
): Promise<any> => {
    const { data } = await authUAAAPI({
        method: 'put',
        url: `cms/api/v1/sub-menu-configs/${requestData?.id}/publish/versions/${requestData?.version}`,
        data: requestData,
    })
    return data
}