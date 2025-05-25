import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ConfigRoleTypeInterface } from './type'
import { errorMsg, successMsg } from '@/helper/message'
import {
  createUpdateConfigRoleType,
  getDetailConfigRoleType,
  getListGroupPermissionBySystem,
  getListRoleTypeBySystem,
  getListTierByRoleType,
} from './service'
import { useRouter } from 'next/router'
import { UAA_CHILDREN_PATH, UAA_PATH } from '@/routes'
import { getSystem } from '../../SystemManagement/service'
import { STATUS_UAA } from '@/helper/utils'

const useCreateUpdateConfigRole = () => {
  const [listRoleType, setListRoleType] = useState<any[]>([])
  const [loading, setLoading] = useState<false>(false)
  const [listTier, setListTier] = useState<any[]>([])
  const [listSystem, setListSystem] = useState<any[]>([])
  const [listPermission, setListPermission] = useState<any[]>([])

  const methodForm = useForm<ConfigRoleTypeInterface>({
    defaultValues: {
      groupPermissionIds: [],
    },
  })
  const router = useRouter()
  const { slug } = router.query

  const isEdit = !!slug

  const getDetail = async (id: number) => {
    try {
      const res = await getDetailConfigRoleType(id)
      const newData = res?.data?.data ?? {}
      methodForm.reset({
        ...newData,
        groupPermissionIds: newData?.groupPermissionResponses?.map(
          (v: any) => v.id
        ),
      })
    } catch (e) {}
  }

  const getRoleType = async (systemId: number) => {
    const res = await getListRoleTypeBySystem({
      systemId,
      page: 0,
      size: 1000,
    })
    setListRoleType(res?.data?.data?.content ?? [])
  }

  const getTier = async (roleTypeId: number) => {
    const res = await getListTierByRoleType({
      roleTypeId,
      page: 0,
      size: 1000,
    })
    setListTier(res?.data?.data ?? [])
  }

  const getListSystem = async () => {
    try {
      const res = await getSystem({
        page: 0,
        size: 1000,
      })
      setListSystem(
        res?.content?.filter((v: any) => v.status === STATUS_UAA.PUBLISHED)
      )
    } catch (error) {}
  }
  const getListPermission = async (systemId: number) => {
    try {
      const res = await getListGroupPermissionBySystem({
        systemId,
        page: 0,
        size: 1000,
      })
      setListPermission(
        res?.data?.data?.content?.filter(
          (v: any) => v.status === STATUS_UAA.PUBLISHED
        )
      )
    } catch (error) {}
  }

  const onSubmit = methodForm.handleSubmit(async (val) => {
    try {
      const res = await createUpdateConfigRoleType(val)
      router.push(UAA_CHILDREN_PATH.CONFIG_ROLE_TYPE)
    } catch (e) {}
  })

  useEffect(() => {
    getListSystem()
  }, [])

  useEffect(() => {
    slug && getDetail(Number(slug))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return {
    methodForm,
    onSubmit,
    getRoleType,
    getTier,
    listRoleType,
    listSystem,
    listTier,
    getListPermission,
    listPermission,
    loading,
    isEdit,
  }
}

export default useCreateUpdateConfigRole
