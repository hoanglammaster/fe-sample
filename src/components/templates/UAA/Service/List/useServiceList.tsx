import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getListService } from '../../APIManangement/service'
import { changeStatusService } from '../CreateUpdate/service'
import { deleteData } from './service'

const useServiceList = () => {
  const [listService, setListService] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<any>({ number: 0, size: 10 })
  const { hideDialog } = useDialog()
  const getList = async (params: any) => {
    try {
      setLoading(true)
      const res = await getListService({
        ...params,
        name: !!params?.name ? params?.name : undefined,
        code: !!params?.code ? params?.code : undefined,
        sort: ['createdAt,desc'],
      })
      setListService(res?.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setListService(null)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRow = async (id: number, version: number) => {
    try {
      setLoading(true)
      const res = await deleteData(id, version)
      await getList(filter)
      setLoading(false)
      hideDialog()
    } catch (error) {
      hideDialog()
      setLoading(false)
    } finally {
      hideDialog()
    }
  }

  const methodForm = useForm({
    defaultValues: {
      name: '',
      code: '',
    },
  })
  const onSubmit = methodForm.handleSubmit((val) => {
    setFilter({ ...val, page: 0, size: filter.size ?? 20 })
  })

  const handleChangeStatus = async (id: number, version: number) => {
    try {
      const res = await changeStatusService({ serviceId: id, version })
      getList(filter)
      hideDialog()
    } catch (e) {
      hideDialog()
    } finally {
      hideDialog()
    }
  }

  useEffect(() => {
    getList(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const data = {
    loading,
    listService,
    setFilter,
    filter,
    handleDeleteRow,
    methodForm,
    onSubmit,
    handleChangeStatus,
  }
  return data
}

export default useServiceList
