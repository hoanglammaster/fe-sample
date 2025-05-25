import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { changeStatusFeature } from '../CreateUpdate/service'
import {
  deleteData,
  getListRoleTypePermissionMapping,
  useQueryGetListRoleType,
  useQueryGetListTier,
} from './service'
import { useQueryGetListSystem } from '../../SystemManagement/service'
import { useQueryGetListFeature } from '../../Feature/List/service'
import { STATUS_UAA } from '@/helper/utils'
import { useQueryGetListPermission } from '../../PermissionConfig/List/service'

const useRoleTypePermissionMapping = () => {
  const [listFeatureMapping, setListFeatureMapping] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({ page: 0, size: 10 })
  const { hideDialog } = useDialog()

  const getList = async (params: any) => {
    try {
      setLoading(true)
      const res = await getListRoleTypePermissionMapping({
        ...params,
        sort: ['createdAt,desc'],
      })
      setListFeatureMapping(res?.data?.data)
      setLoading(false)
    } catch (err) {
      setListFeatureMapping(null)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRow = async (id: number) => {
    try {
      setLoading(true)
      const res = await deleteData(id)
      getList(filter)
      setLoading(false)
      hideDialog()
    } catch (error) {
      setLoading(false)
    } finally {
      hideDialog()
    }
  }

  const methodForm = useForm({
    defaultValues: {
      roleTypeId: null,
      tierId: null,
      groupPermissionId: null,
    },
  })
  const onSubmit = methodForm.handleSubmit((val) => {
    setFilter({ ...val, page: 0, size: filter.size ?? 20 })
  })

  const { watch } = methodForm

  const handleChangeStatus = async (id: number) => {
    try {
      const res = await changeStatusFeature(id)
      hideDialog()
      getList(filter)
    } catch (e) {
    } finally {
      hideDialog()
    }
  }

  const { data: listRoleType, isLoading: loadingRoleType } =
    useQueryGetListRoleType({
      page: 0,
      size: 1000,
      status: STATUS_UAA.PUBLISHED,
    })

  console.log('listRoleType222', listRoleType)

  const { data: listTier, isLoading: loadingTier } = useQueryGetListTier(
    {
      page: 0,
      size: 1000,
      roleTypeId: watch('roleTypeId'),
    },
    {
      enabled: !!watch('roleTypeId'),
    }
  )

  const { data: listPermission, isLoading: loadingListPermission } =
    useQueryGetListPermission({
      page: 0,
      size: 1000,
    })

  const data = {
    loading,
    listFeatureMapping,
    setFilter,
    filter,
    handleDeleteRow,
    methodForm,
    onSubmit,
    handleChangeStatus,
    listTier,
    listRoleType,
    loadingTier,
    loadingRoleType,
    listPermission,
    loadingListPermission,
  }

  useEffect(() => {
    getList(filter)
  }, [filter])

  return data
}

export default useRoleTypePermissionMapping
