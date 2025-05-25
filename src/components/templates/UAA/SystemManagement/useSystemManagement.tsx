import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { TRANSLATE_UAA } from '@/routes'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { changeStatusSystem, deleteData, getSystem } from './service'

export const useSystemManagement = () => {
  const [listSystem, setListSystem] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useTranslation(TRANSLATE_UAA.SYSTEM_MANAGEMENT)

  const [filterSystem, setFilterSystem] = useState<any>({
    page: 0,
    size: 10,
    sort: ['createdAt,desc'],
  })
  const { hideDialog, showDialog } = useDialog()

  const methodForm = useForm({
    defaultValues: {
      search: '',
      systemCodes: '',
    },
  })

  const getListSystem = async (params?: any) => {
    try {
      setLoading(true)

      const res = await getSystem({
        ...params,
        search: !!params?.search ? params?.search : undefined,
        systemCodes: !!params?.systemCodes ? params?.systemCodes : undefined,
      })
      setListSystem(res)
    } catch (error) {
      setListSystem([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRow = async (id: number, version: number) => {
    try {
      setLoading(true)
      const res = await deleteData(id, version)
      await getListSystem(filterSystem)
      setLoading(false)
      hideDialog()
    } catch (error) {
      setLoading(false)
      hideDialog()
    } finally {
      hideDialog()
      setLoading(false)
    }
  }

  const handleChangeStatus = async (id: number, version: number) => {
    try {
      const res = await changeStatusSystem(id, version)
      hideDialog()
      getListSystem(filterSystem)
    } catch (e) {
      hideDialog()
    } finally {
      hideDialog()
    }
  }

  const onSubmit = methodForm.handleSubmit((val) => {
    setFilterSystem({
      ...val,
      page: 0,
      size: filterSystem.size ?? 10,
      systemCodes: val?.systemCodes.trim(),
      search: val?.search.trim(),
    })
  })

  useEffect(() => {
    getListSystem(filterSystem)
  }, [filterSystem])

  return {
    listSystem,
    getListSystem,
    loading,
    t,
    handleDeleteRow,
    setFilterSystem,
    filterSystem,
    methodForm,
    onSubmit,
    handleChangeStatus,
  } as const
}
