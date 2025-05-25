import React, { useEffect, useState } from 'react'
import { changeStatusPermission, deleteRow, getListScope } from './service'
import { errorMsg, successMsg } from '@/helper/message'
import { getListSystem } from '../../ConfigMenu/List/service'
import { useForm } from 'react-hook-form'
import { STATUS_UAA } from '@/helper/utils'
import { useDialog } from '@/components/hooks/dialog/useDialog'

const useScopeList = () => {
  const [listPermission, setListPermission] = useState<any>()
  const [loading, setLoading] = useState(false)
  const { hideDialog } = useDialog()

  const [filter, setFilter] = useState({ systemId: null, page: 0, size: 10 })
  const getListPermissionData = async (params: any) => {
    try {
      setLoading(true)
      const res = await getListScope(params)
      setListPermission(res?.data?.data)
      setLoading(false)
    } catch (error) {
      setListPermission(null)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRow = async (id: number, version: number) => {
    try {
      setLoading(true)
      const res = await deleteRow(id, version)
      await getListPermissionData(filter)
    } catch (error) {
    } finally {
      setLoading(false)
      hideDialog()
    }
  }

  const handleChangeStatus = async (id: number, version: number) => {
    try {
      const res = await changeStatusPermission(id, version)
      await getListPermissionData(filter)
      setLoading(true)
      hideDialog()
    } catch (error) {
      setLoading(false)
    } finally {
      hideDialog()
    }
  }

  const methodForm = useForm({
    defaultValues: {
      codeOrName: '',
      systemId: null,
    },
  })

  const onSubmit = methodForm.handleSubmit((val) => {
    setFilter({ ...val, page: 0, size: filter.size })
  })

  useEffect(() => {
    getListPermissionData(filter)
  }, [filter])

  const data = {
    getListPermissionData,
    filter,
    setFilter,
    handleDeleteRow,
    listPermission,
    loading,
    onSubmit,
    methodForm,
    handleChangeStatus,
  }
  return data
}

export default useScopeList
