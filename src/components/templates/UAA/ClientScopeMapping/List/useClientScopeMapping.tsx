import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { STATUS_UAA } from '@/helper/utils'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryGetListClient } from '../../ClientManagement/List/service/service'
import {
  changeStatusFeature,
  useQueryGetListScope,
} from '../CreateUpdate/service'
import { deleteData, getListFeatureMapping } from './service'

const useClientScopeMapping = () => {
  const [listFeatureMapping, setListFeatureMapping] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    scopeId: null,
    clientId: null,
  })
  const { hideDialog } = useDialog()

  const getList = async (params: any) => {
    try {
      setLoading(true)
      const res = await getListFeatureMapping({
        ...params,
        sort: ['createdAt,desc'],
      })
      setListFeatureMapping(res?.data?.data)
      setLoading(false)
    } catch (err) {
      setListFeatureMapping(null)
      setLoading(false)
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
      name: '',
      code: '',
      scopeId: null,
      clientId: null,
    },
  })
  const onSubmit = methodForm.handleSubmit((val) => {
    setFilter({ ...val, page: 0, size: filter.size ?? 20 })
  })

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

  const { data: listScope, isLoading: loadingListScope } = useQueryGetListScope(
    { page: 0, size: 1000, status: STATUS_UAA.PUBLISHED }
  )

  const { data: listClient, isLoading: loadingListClient } =
    useQueryGetListClient({ page: 0, size: 1000, status: STATUS_UAA.ACTIVE })

  const data = {
    loading,
    listFeatureMapping,
    setFilter,
    filter,
    handleDeleteRow,
    methodForm,
    onSubmit,
    handleChangeStatus,
    listClient,
    listScope,
    loadingListClient,
    loadingListScope,
  }

  useEffect(() => {
    getList(filter)
  }, [filter])

  return data
}

export default useClientScopeMapping
