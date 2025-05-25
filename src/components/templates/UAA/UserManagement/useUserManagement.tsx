import { useEffect, useState } from 'react'
import { deleteData, getListUser } from './service'
import { useTranslation } from 'react-i18next'
import { errorMsg } from '@/helper/message'
import { TRANSLATE_UAA } from '@/routes'
import { useForm } from 'react-hook-form'
import { getListTiers } from '../PermissionConfig/List/service'
import {
  getListRoleTypeBySystem,
  getListRoleTypeStartWith9,
  getListTierByRoleType,
} from '../ConfigRoleType/CreateUpdate/service'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { STATUS_UAA } from '@/helper/utils'

type Params = {
  page?: number
  size?: number
}

type Response = {
  id: number
  code: string
  name: string
  description: string
  isActive: boolean
}

interface PermissionProduct {
  systemId: number
  permissions: any[]
}
export const useUserManagement = () => {
  const { t } = useTranslation(TRANSLATE_UAA.USER)
  const methodForm = useForm({
    defaultValues: {
      search: '',
      tierId: null,
      status: null,
      roleTypeId: null,
    },
  })
  const [listUser, setListUser] = useState<{ content: Response[] }>()
  const [listRoleType, setListRoleType] = useState<any[]>([])
  const [listTier, setListTier] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [filter, setFilter] = useState<any>({
    page: 0,
    size: 10,
    tierId: null,
    status: null,
    roleTypeId: null,
  })
  const { hideDialog } = useDialog()
  const roleTypeId = Number(methodForm.watch('roleTypeId'))

  // const [filterUser, setFilterUser] = useState<Params>({ page: 0, size: 10 })

  const tranferGroupPermission = (data: any[]) => {
    let products: PermissionProduct[] = []
    // data.forEach((item) => {
    //   if (products.some((v) => v.systemId === item.systemId)) {
    //     products = products.map((v) => {
    //       return {
    //         ...v,
    //         permissions:
    //           v.systemId === item.systemId
    //             ? [...v.permissions, item]
    //             : [v.permissions],
    //       }
    //     })
    //   } else {
    //     products = products.concat({
    //       systemId: item.systemId,
    //       permissions: [item],
    //     })
    //   }
    // })
    return products
  }

  const prepareData = async (params?: Params) => {
    try {
      setLoading(true)
      const res = await getListUser({ ...params })
      setListUser(res?.data?.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setListUser({ content: [] })
    } finally {
      setLoading(false)
    }
  }

  const getRoleType = async () => {
    const res = await getListRoleTypeStartWith9({
      startWithRoleTypeCode: 9,
    })
    setListRoleType(res?.data?.data ?? [])
  }
  const getTier = async (roleTypeId: number) => {
    try {
      const res = await getListTierByRoleType({
        page: 0,
        size: 1000,
        status: STATUS_UAA.PUBLISHED,
        roleTypeId: roleTypeId,
      })
      setListTier(res?.data?.data ?? [])
    } catch (err) {}
  }
  const handleDeleteRow = async (id: number) => {
    try {
      setLoading(true)
      await deleteData(id)
      prepareData(filter)
      setLoading(false)
      hideDialog()
    } catch (error) {
      setLoading(false)
    } finally {
      hideDialog()
    }
  }

  const onSubmit = methodForm.handleSubmit((val) => {
    setFilter({ ...val, page: 0, size: filter.size })
  })

  useEffect(() => {
    prepareData(filter)
  }, [filter])

  useEffect(() => {
    getRoleType()
  }, [])

  useEffect(() => {
    !!roleTypeId && getTier(Number(roleTypeId))
  }, [roleTypeId])

  return {
    listUser,
    t,
    loading,
    handleDeleteRow,
    tranferGroupPermission,
    onSubmit,
    setFilter,
    methodForm,
    filter,
    listRoleType,
    listTier,
    prepareData,
  } as const
}
