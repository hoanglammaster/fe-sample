import { STATUS_UAA } from '@/helper/utils'
import { useFormCustom } from '@/lib/form'
import { useEffect, useState } from 'react'
import {
  getListLanguage,
  getListRoleTypeStartWith9,
  getListTierByRoleType,
} from '../../ConfigRoleType/CreateUpdate/service'
import { RequestBody } from './type'
import { useUserDetail } from './useUserDetail'
import { getRegexChangePassword } from '@/components/templates/ChangePasswordUser/util'

export const useUserForm = () => {
  const [listRoleType, setListRoleType] = useState<any[]>([])
  const [listTier, setListTier] = useState<any[]>([])
  const [listLanguages, setListLanguages] = useState<any[]>([])
  const [dataRegex, setDataRegex] = useState<any[]>([])
  const { detailUser, loading, isEdit, createUpdateUserData, t } =
    useUserDetail()
  const { register, control, handleSubmit, watch, formState, reset, setValue } =
    useFormCustom<RequestBody['POST']>({
      mode: 'onTouched',
      defaultValues: {
        ...detailUser,
        id: detailUser?.id ?? 0,
        firstName: detailUser?.firstName ?? '',
        lastName: detailUser?.lastName ?? '',
        isGeneratePassword: detailUser?.isGeneratePassword ?? false,
        username: detailUser?.username ?? '',
        sex: detailUser?.sex ?? null,
        products: detailUser?.groupPermissionIds ?? [{}],
        roleTypeId: detailUser?.roleTypeId,
        tierId: detailUser?.tierId,
        phoneNumberOTP: detailUser?.phoneNumberOTP,
        systemId: detailUser?.systemId ?? 0,
        status: 'ACTIVE',
      },
    })
  const onSubmit = handleSubmit(async (data) => {
    await createUpdateUserData(data)
  })

  const getRegex = async () => {
    try {
      const res = await getRegexChangePassword()
      setDataRegex(res?.data?.regex ?? [])
    } catch (e) {}
  }

  const getRoleType = async () => {
    const res = await getListRoleTypeStartWith9({
      startWithRoleTypeCode: 9,
    })
    setListRoleType(res?.data?.data ?? [])
  }

  const getTier = async (roleTypeId: number) => {
    const res = await getListTierByRoleType({
      roleTypeId,
      page: 0,
      size: 1000,
      status: STATUS_UAA.PUBLISHED,
    })
    setListTier(res?.data?.data ?? [])
  }

  const getLanguage = async () => {
    const res = await getListLanguage({
      page: 0,
      size: 1000,
      status: STATUS_UAA.PUBLISHED,
      used: true,
    })
    setListLanguages(res?.data?.data ?? [])
  }

  useEffect(() => {
    detailUser &&
      reset({
        ...detailUser,
        roleTypeId: detailUser?.roleTypeResponse?.id,
        tierId: detailUser?.tierResponse?.id,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailUser])

  useEffect(() => {
    getLanguage()
    getRegex()
  }, [])

  useEffect(() => {
    listLanguages.length > 0 &&
      setValue('lang', listLanguages.filter((v) => v?.isDefault)[0]?.id)
  }, [listLanguages, setValue])

  return [
    {
      register,
      control,
      handleSubmit,
      watch,
      formState,
      t,
      loading,
      listRoleType,
      listTier,
      listLanguages,
      setValue,
      dataRegex,
    },
    { onSubmit, getTier, getRoleType },
  ] as const
}
