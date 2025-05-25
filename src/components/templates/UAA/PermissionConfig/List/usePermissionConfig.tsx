import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getListSystem } from '../../ConfigMenu/List/service'
import { changeStatusPermission, deleteRow, getListPermission } from './service'

const usePermissionConfig = () => {
  const [listPermission, setListPermission] = useState<any>()
  const [listProduct, setListProduct] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { hideDialog } = useDialog()

  const [filter, setFilter] = useState({ systemId: null, page: 0, size: 10 })
  const getListPermissionData = async (params: any) => {
    try {
      setLoading(true)
      const res = await getListPermission(params)
      setListPermission(res?.data?.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setListPermission(null)
    } finally {
      setLoading(false)
    }
  }

  const getProductList = async () => {
    try {
      const res = await getListSystem({
        page: 0,
        size: 1000,
        status: 'PUBLISHED',
      })
      setListProduct(res?.data?.data?.content ?? [])
    } catch (err) {}
  }

  const handleDeleteRow = async (id: number, version: number) => {
    try {
      setLoading(true)
      const res = await deleteRow(id, version)
      hideDialog()
      await getListPermissionData(filter)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    } finally {
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
    getProductList()
  }, [])

  useEffect(() => {
    getListPermissionData(filter)
  }, [filter])

  const data = {
    getListPermissionData,
    filter,
    setFilter,
    handleDeleteRow,
    listPermission,
    listProduct,
    loading,
    onSubmit,
    methodForm,
    handleChangeStatus,
  }
  return data
}

export default usePermissionConfig
