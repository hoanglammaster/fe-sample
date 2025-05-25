import { errorMsg, successMsg } from '@/helper/message'
import axios, { AxiosRequestConfig } from 'axios'
import getConfig from 'next/config'
import queryString from 'query-string'
import {
  getCmsToken,
  getDefaultLanguage,
  removeCmsToken,
  setCmsToken,
} from './token'
import { useErrorBoundary, useErrorDialog } from './zustand'
import { decodeJWT } from '@/config/token'
import { JSONBigParser } from '@/helper/json'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  isFileUpload?: boolean // Custom flag for upload requests
  disableToken?: boolean
}

const {
  publicRuntimeConfig: {
    API_AUTH_SCHEMA,
    API_COMMON_SCHEMA,
    API_UAA_SCHEMA,
    API_MDM_SCHEMA,
    API_PARTNER_SCHEMA,
    LOGIN_PATH,
    basePath,
  },
} = getConfig()

const AUTH_COMMON_URL = `http://${API_COMMON_SCHEMA}`
export const AUTH_UAA_URL = `http://${API_UAA_SCHEMA}`
const AUTH_MDM_URL = `http://${API_MDM_SCHEMA}`
const AUTH_PARTNER_URL = `http://${API_PARTNER_SCHEMA}`
const AUTH_URL = `http://${API_AUTH_SCHEMA}`

const NOT_EXIST_ERROR_CODE = 'UA0006'

const AUTH_BASE_URL = AUTH_URL
const API_UAA_REFRESH_TOKEN = '/oauth/refresh-token'

const requestAuth = axios.create({
  baseURL: AUTH_COMMON_URL,
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params: any) =>
      queryString.stringify(params, { arrayFormat: 'comma' }),
  },
  transformResponse: [
    (data) => {
      try {
        return JSONBigParser.parse(data)
      } catch (err) {
        return data
      }
    },
  ],
})

export const logoutApiFunc = async () => {
  try {
    const tokenAccess: any = JSONBigParser.parse(getCmsToken() ?? '{}')
    const decodeRefreshToken: any = decodeJWT(tokenAccess?.refreshToken)
    if (!!tokenAccess && !!decodeRefreshToken?.jti)
      await authUAAAPI({
        method: 'post',
        url: '/oauth/logout',
        baseURL: AUTH_BASE_URL,
        params: { jti: decodeRefreshToken?.jti },
      })
  } catch (e) {
    errorMsg(e)
  }
}

export const logoutFunc = async () => {
  // await logoutApiFunc()
  if (
    !window.location.href.includes('localhost') &&
    !window.location.href.includes('/login')
  ) {
    removeCmsToken()
    window.location.replace(LOGIN_PATH || '/ewallet3/ewallet-uaa-webui/login')
  }
}

export const middlewareRequest = async (config: any) => {
  try {
    // console.log('configconfig', config)
    let temp = {
      ...config,
      headers: {
        ...config?.headers,
        'Accept-Language': getDefaultLanguage()?.toLowerCase() ?? 'en',
      },
      params:
        config.params?.size && !config.params.sort
          ? { ...config.params, sort: ['createdAt,desc'] }
          : config.params,
    }
    if (config?.disableToken) {
      return temp
    }

    const tokenAccess: any = JSONBigParser.parse(getCmsToken() ?? '{}')

    if (config.url.includes('/login')) {
      return temp
    }
    if (tokenAccess?.accessToken) {
      return {
        ...temp,
        headers: {
          ...temp.headers,
          Authorization: `Bearer ${tokenAccess?.accessToken}`,
        },
      }
    }
    return {
      ...temp,
      headers: {
        ...temp.headers,
      },
    }
  } catch (err) {
    // localStorage.clear()
    // sessionStorage.clear()
    // removeCmsToken()
    // window.location.replace('/login')
  }
}

const listHiddenError = ['/public-info', '/menu-configs/config']

export const middlewareResponseUAA = (response: any) => {
  try {
    const data = response?.data

    console.log('errrrrrrr1', response)

    if (response?.config?.responseType === 'blob') {
      return response
    }

    if (data?.errorType !== 'SUCCESS') {
      const responseCode = data?.responseCode
      const message = data?.message ?? data?.description
      if (responseCode?.includes('0000')) {
        return response
      }
      if (
        responseCode?.includes('UA0006') &&
        !listHiddenError.some((item) => response.config.url.includes(item)) &&
        !window.location.pathname.includes('/login')
      ) {
        useErrorBoundary.getState().setIsError(true)
        return Promise.reject('Not exist')
      }
      if (data?.errorType !== 'POPUP') {
        const hasFieldErrors = data?.fieldErrors?.length > 0
        const hasFieldMessage = message?.includes('{field}')
        if (hasFieldMessage && hasFieldErrors) {
          const fields = data.fieldErrors.map((v: any) => v.field).join(', ')
          const newMessage = message.replace('{field}', fields)
          if (
            !listHiddenError.some((item) => response.config.url.includes(item))
          ) {
            errorMsg(newMessage)
          }
          return Promise.reject(newMessage)
        } else {
          if (
            !listHiddenError.some((item) => response.config.url.includes(item))
          ) {
            errorMsg(message)
          }
          return Promise.reject(message)
        }
      }

      if (data?.errorType === 'POPUP') {
        useErrorDialog.getState().setErrorMsg(message)
        return Promise.reject(message)
      }
    } else {
      const responseCode = data?.responseCode
      if (!responseCode?.includes('0000')) {
        const message = data?.message ?? data?.description
        successMsg(message)
      }
      return response
    }

    return response
  } catch (err) {}
  return response
}

let isRefreshing = false
let subscribers: any = []

export const middlewareResponseError = (error: any) => {
  const { config } = error
  const status = error?.response?.status
  const originalRequest = config

  if (error?.code === 'ERR_NETWORK' && !!error?.config?.isFileUpload) {
    errorMsg('There was an error while uploading a file to the server')
    return Promise.reject(
      'There was an error while uploading a file to the server'
    )
  }

  if (error?.config?.responseType === 'blob') {
    return Promise.reject('System busy')
  }

  if (!!status) {
    if ([500, 504].includes(status)) {
      errorMsg('System busy')
      return Promise.reject('System busy')
    }
    if (status === 401 && !config.url.includes('/oauth')) {
      if (!isRefreshing) {
        isRefreshing = true
        const access_token: any = JSONBigParser.parse(getCmsToken() ?? '{}')
        const refreshToken = access_token?.refreshToken
        // Send a request to refresh the access token
        const api = AUTH_BASE_URL + API_UAA_REFRESH_TOKEN
        const requestBody = {
          refreshToken,
        }

        return axios
          .post(api, requestBody)
          .then((res: any) => {
            if (!!res?.data?.data) {
              setCmsToken(res?.data?.data)
              const accessToken = res?.data?.data?.accessToken
              originalRequest.headers.Authorization = `Bearer ${accessToken}`
              subscribers.forEach((callback: any) => callback(accessToken))
              subscribers = []
              return axios(originalRequest)
            }
            return Promise.reject(error)
          })
          .catch((error: any) => {
            logoutFunc()
            errorMsg(error)
            return Promise.reject(error)
          })
          .finally(() => {
            isRefreshing = false
          })
      } else {
        return new Promise((resolve) => {
          subscribers.push((access_token: any) => {
            originalRequest.headers.Authorization = `Bearer ${access_token}`
            resolve(axios(originalRequest))
          })
        })
      }
    }
    errorMsg(error)
    return Promise.reject(error)
  }
  errorMsg(error)
  return Promise.reject(error)
}

requestAuth.interceptors.request.use(middlewareRequest, (error: any) =>
  Promise.reject(error)
)

requestAuth.interceptors.response.use(
  middlewareResponseUAA,
  middlewareResponseError
)

export const authUAAAPI = (options: CustomAxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_UAA_URL,
    ...options,
    headers: {
      'Accept-Language': 'vi',
      ...options.headers,
    },
  })
}

export const authMdmApi = (options: CustomAxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_MDM_URL,
    ...options,
    headers: {
      'Accept-Language': 'vi',
      ...options.headers,
    },
  })
}

export const authParnerApi = (options: CustomAxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_PARTNER_URL,
    ...options,
    headers: {
      'Accept-Language': 'vi',
      ...options.headers,
    },
  })
}

export const authResourceApi = (options: CustomAxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_COMMON_URL,
    ...options,
    headers: {
      'Accept-Language': 'vi',
      ...options.headers,
    },
  })
}

export const authAPI = (options: CustomAxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_URL,
    ...options,
    headers: {
      'Accept-Language': 'vi',
      ...options.headers,
    },
  })
}
