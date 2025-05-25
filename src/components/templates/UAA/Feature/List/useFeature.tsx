import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { changeStatusFeature } from '../CreateUpdate/service'
import { deleteData, getListFeature } from './service'

const useFeature = () => {
  const [listFeature, setListFeature] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({ page: 0, size: 10 })
  const { hideDialog } = useDialog()

  const getList = async (params: any) => {
    try {
      setLoading(true)
      const res = await getListFeature({
        ...params,
        name: !!params?.name ? params?.name : undefined,
        code: !!params?.code ? params?.code : undefined,
      })
      setListFeature(res?.data?.data)
      setLoading(false)
    } catch (err) {
      setListFeature(null)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRow = async (id: number, version: number) => {
    try {
      setLoading(true)
      const res = await deleteData(id, version)
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
      codeOrName: '',
      system: { id: null, name: '', code: 'All' },
    },
  })
  const onSubmit = methodForm.handleSubmit((val) => {
    const { codeOrName, system } = val
    const systemId = (system as any)?.id
    setFilter((prevState) => ({
      ...prevState,
      codeOrName,
      systemId,
      page: 0,
      size: prevState.size ?? 20,
    }))
  })

  const handleChangeStatus = async (id: number, version: number) => {
    try {
      const res = await changeStatusFeature(id, version)
      hideDialog()
      getList(filter)
    } catch (e) {
    } finally {
      hideDialog()
    }
  }

  const refetch = () => {
    getList(filter)
  }

  const data = {
    loading,
    listFeature,
    setFilter,
    filter,
    handleDeleteRow,
    methodForm,
    onSubmit,
    handleChangeStatus,
    refetch,
  }

  useEffect(() => {
    getList(filter)
  }, [filter])

  return data
}

export default useFeature
