import React, { useEffect, useState } from 'react'
import {
  getUserDataPublic,
  getUserInfo,
  useLogin,
} from '../UAA/Login/hooks/useLogin'
import { useForm } from 'react-hook-form'
import {
  updateCurentUserPassword,
  updateUserInfo,
  uploadUserAvatar,
} from './service'
import { errorMsg, successMsg } from '@/helper/message'
import { getCmsToken } from '@/config/token'
import { updateUser, updateUserPublicInfo } from '../UAA/UserManagement/service'

const useUser = () => {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [listLanguage, setListLanguage] = useState()
  const [listCountry, setListCountry] = useState()
  const [isEdit, setIsEdit] = useState(false)

  const { getAccountInfo } = useLogin()

  const getUserDataInfo = async () => {
    try {
      setLoading(true)
      const userDetail = await getUserInfo()
      setUserData(userDetail?.data?.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const formContextUser = useForm({
    mode: 'onChange',
    defaultValues: {},
  })

  const formContextPassword = useForm({
    mode: 'onSubmit',
    defaultValues: {},
  })

  const handleSubmitUserInfo = formContextUser.handleSubmit(
    async (val: any) => {
      try {
        if (val.id) {
          await updateUserPublicInfo(val, Number(val.id))
          setIsEdit(false)
          getUserDataInfo()
          getAccountInfo()
        }
      } catch (err) {}
    }
  )

  const handleUploadFile = async (file: any) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await uploadUserAvatar(formData)
      getUserDataInfo()
    } catch (error) {}
    return
  }

  const handleSubmitChangePassword = formContextPassword.handleSubmit(
    async (val: any) => {
      try {
        const dataBody = {
          oldPassword: val.oldPassword,
          newPassword: val.newPassword,
          id: userData?.id,
        }
        await updateCurentUserPassword(dataBody)
        setIsEdit(false)
      } catch (err) {}
    }
  )

  useEffect(() => {
    getUserDataInfo()
    // getLanguage()
    // getCountry()
  }, [])

  useEffect(() => {
    userData &&
      formContextUser.reset({
        ...userData,
        roleTypeName:
          userData?.roleTypeResponse?.roleTypeCode +
          ' - ' +
          userData?.roleTypeResponse?.roleTypeName,
        tierName:
          userData?.tierResponse?.tierCode +
          ' - ' +
          userData?.tierResponse?.tierName,
        roleTypeId: userData?.roleTypeResponse?.id,
        roleTypeCode: userData?.roleTypeResponse?.roleTypeCode,
        tierId: userData?.tierResponse?.id,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  const data = {
    loading,
    formContextUser,
    handleSubmitUserInfo,
    formContextPassword,
    handleSubmitChangePassword,
    listLanguage,
    listCountry,
    isEdit,
    setIsEdit,
    getUserDataInfo,
  }
  return data
}

export default useUser
