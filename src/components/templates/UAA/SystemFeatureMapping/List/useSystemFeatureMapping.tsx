import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { changeStatusFeature } from '../CreateUpdate/service'
import { deleteData, getListFeatureMapping } from './service'
import { useQueryGetListSystem } from '../../SystemManagement/service'
import { useQueryGetListFeature } from '../../Feature/List/service'

const useFeature = () => {
  const [listFeatureMapping, setListFeatureMapping] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({ page: 0, size: 10 })
  const { hideDialog } = useDialog()

  const getList = async (params: any) => {
    try {
      setLoading(true)
      const res = await getListFeatureMapping({
        ...params,
        sort: ['createdAt,desc'],
      })
      setListFeatureMapping(res?.data?.data)
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
      name: '',
      code: '',
      systemId: null,
      featureId: null,
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

  const { data: listSystem, isLoading: loadingListSystem } =
    useQueryGetListSystem({ page: 0, size: 1000 })

  const { data: listFeature, isLoading: loadingListFeature } =
    useQueryGetListFeature({ page: 0, size: 1000, isMappingSystem: true })

  const data = {
    loading,
    listFeatureMapping,
    setFilter,
    filter,
    handleDeleteRow,
    methodForm,
    onSubmit,
    handleChangeStatus,
    listFeature,
    listSystem,
    loadingListFeature,
    loadingListSystem,
  }

  useEffect(() => {
    getList(filter)
  }, [filter])

  return data
}

export default useFeature
