import { useSwitchSystem } from '@/components/hooks/switchSystem/useSwitchSystem'
import { authAPI, authUAAAPI, logoutApiFunc } from '@/config/axiosConfig'
import {
  getCmsToken,
  getDeviceId,
  getDeviceName,
  removeCmsToken,
  setCmsToken,
} from '@/config/token'
import { useUserInfo } from '@/config/zustand'
import { decodeJWT } from '@/config/token'
import { JSONBigParser } from '@/helper/json'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const loginAxios = (data: any) => {
  return authAPI({
    method: 'post',
    url: '/oauth/login/mobile-web',
    data,
    headers: { 'Content-Type': 'application/json' },
    disableToken: true,
  })
}

export const getUserDataPublic = (userId: number) => {
  return authUAAAPI({
    method: 'get',
    url: `api/v1/user/${userId}/public-info`,
  })
}

export const getUserInfo = () => {
  return authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/user/current-user`,
  })
}

export const getUserInfoByCookieToken = (tokenAccess) => {
  return authUAAAPI({
    method: 'get',
    url: `/cms/api/v1/user/current-user`,
    headers: {
      Authorization: `Bearer ${tokenAccess?.accessToken}`,
    },
  })
}

export const useLogin = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { setUserInfo } = useUserInfo()

  const {
    handleCloseDialog,
    handleOpenDialogOnLogin,
    renderDialogChoseBizzApp,
    loading: loadingDialog,
  } = useSwitchSystem()

  const getAccountInfo = async () => {
    const tokenAccess: any = JSONBigParser.parse(getCmsToken() ?? '{}')
    const tokenDetail: any = tokenAccess?.accessToken
      ? decodeJWT(tokenAccess?.accessToken ?? '')
      : {}

    if (tokenDetail?.user_role_type_id) {
      const userDetail = await getUserDataPublic(tokenDetail?.user_role_type_id)
      setUserInfo(userDetail?.data?.data ?? {})
    }
  }
  const loginAccount = async (dataLogin: any) => {
    try {
      setLoading(true)
      const requestBody = {
        ...dataLogin,
        grantType: 'PASSWORD',
        channel: 'WEB',
        deviceId: getDeviceId(),
        deviceName: getDeviceName(),
      }
      const loginDetail = await loginAxios(requestBody)
      const { data } = loginDetail
      setCmsToken(data?.data ?? {})
      // await getAccountInfo()
      // if (!window.location.origin.includes('localhost')) {
      handleOpenDialogOnLogin()
      // } else {
      //   router.push('/')
      // }

      setLoading(false)
    } catch (err) {
      removeCmsToken()
      setLoading(false)
    }
  }
  const logoutAccount = async () => {
    await logoutApiFunc()
    removeCmsToken()
    router.push('/login')
  }
  return {
    loginAccount,
    logoutAccount,
    loading: loadingDialog || loading,
    getAccountInfo,
    renderDialogChoseBizzApp,
    handleOpenDialog: handleOpenDialogOnLogin,
  }
}
