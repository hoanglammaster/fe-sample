import { errorMsg, successMsg } from '@/helper/message'
import { STATUS_UAA } from '@/helper/utils'
import { TRANSLATE_UAA } from '@/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  createUser,
  getDetailUserRoleType,
  getListProduct,
  updateUser,
} from '../service'
import { RequestBody } from './type'

export const useUserDetail = () => {
  const { t } = useTranslation(TRANSLATE_UAA.USER)

  const router = useRouter()
  const { slug } = router.query
  const isEdit = !!slug && slug !== 'create'
  const [loading, setLoading] = useState<boolean>(false)
  const [detailUser, setDetailApi] = useState<any>()

  const getUserDetailData = async (id: number) => {
    try {
      setLoading(true)
      const res = await getDetailUserRoleType(id)
      const newData = res?.data?.data
      setDetailApi({
        ...newData,
        roleTypeId: newData?.roleTypeResponse?.id,
        tierId: newData?.tierResponse?.id,
        // products: changeRoleToProduct(res?.data?.data?.groupPermissionIds),
      })
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const [listProduct, setListProduct] = useState<any>([])
  const getListProductOption = async () => {
    try {
      const res = await getListProduct()
      setListProduct(
        res?.data?.data?.content.filter(
          (v: any) => v.status === STATUS_UAA.PUBLISHED
        )
      )
    } catch (err) {
      console.log(err)
    }
  }

  const createUpdateUserData = async (val: RequestBody['POST']) => {
    try {
      const dataBody = {
        ...val,
        password: isEdit || val.isGeneratePassword ? undefined : val.password,
        rePassword: undefined,
      }
      if (isEdit) {
        const res = await updateUser(dataBody, Number(slug))
      } else {
        const res = await createUser(dataBody)
      }
      router.push('/uaa/user-management')
    } catch (err) {}
  }

  useEffect(() => {
    if (isEdit) {
      getUserDetailData(Number(slug))
    }
    getListProductOption()
  }, [isEdit, slug])

  return {
    detailUser,
    loading,
    isEdit,
    listProduct,
    createUpdateUserData,
    t,
  }
}
