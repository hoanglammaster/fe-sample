import cookie from 'js-cookie'
import getConfig from 'next/config'
import { JSONBigParser } from '@/helper/json'

const {
  publicRuntimeConfig: { SUB_DOMAIN },
} = getConfig()

const generateRandomString = (length) => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }
  return result
}

export const decodeJWT = (token: string) => {
  // Split the token into parts
  const parts = token.split('.')
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format')
  }

  // Decode the payload (the second part)
  const payload = parts[1]
  const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8')
  const parsed = JSONBigParser.parse(decodedPayload)
  return parsed
}

export const getCmsToken = () => {
  if (['null', 'undefined', ''].includes(cookie.get('ACCESS_TOKEN') ?? '')) {
    return undefined
  }
  return cookie.get('ACCESS_TOKEN')
}

export const getDeviceId = () => {
  if (['null', 'undefined', ''].includes(cookie.get('DEVICE_ID') ?? '')) {
    const newDeviceId = generateRandomString(12)
    cookie.set('DEVICE_ID', newDeviceId)
    return newDeviceId
  }
  return cookie.get('DEVICE_ID')
}

export const getDeviceName = () => {
  if (['null', 'undefined', ''].includes(cookie.get('DEVICE_NAME') ?? '')) {
    const newDeviceName = generateRandomString(8)
    cookie.set('DEVICE_NAME', newDeviceName)
    return newDeviceName
  }
  return cookie.get('DEVICE_NAME')
}

export const setCmsToken = (val: any) => {
  if (window.location.origin.includes('localhost') || !SUB_DOMAIN) {
    return cookie.set('ACCESS_TOKEN', JSON.stringify(val))
  }
  return cookie.set('ACCESS_TOKEN', JSON.stringify(val), {
    domain: SUB_DOMAIN,
  })
}

export const removeCmsToken = () => {
  if (window.location.origin.includes('localhost') || !SUB_DOMAIN) {
    return cookie.remove('ACCESS_TOKEN')
  }
  return cookie.remove('ACCESS_TOKEN', {
    domain: SUB_DOMAIN,
  })
}

export const setUserCookie = (userInfo: any) => {
  if (window.location.origin.includes('localhost') || !SUB_DOMAIN) {
    return cookie.set('USER_INFO', JSON.stringify(userInfo))
  }
  return cookie.set('USER_INFO', JSON.stringify(userInfo), {
    domain: SUB_DOMAIN,
  })
}

export const getUserCookie = () => {
  if (['null', 'undefined', ''].includes(cookie.get('USER_INFO') ?? '')) {
    return undefined
  }
  return cookie.get('USER_INFO')
}

export const removeUserCookie = () => {
  if (window.location.origin.includes('localhost') || !SUB_DOMAIN) {
    return cookie.remove('USER_INFO')
  }
  return cookie.remove('USER_INFO', {
    domain: SUB_DOMAIN,
  })
}
//DEFAULT_LANGUAGE
export const getDefaultLanguage = () => {
  if (
    ['null', 'undefined', ''].includes(cookie.get('DEFAULT_LANGUAGE') ?? '')
  ) {
    return undefined
  }
  return cookie.get('DEFAULT_LANGUAGE')
}
