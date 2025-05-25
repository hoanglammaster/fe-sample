import { useEffect, useState } from 'react'
import { getApi, getListService, deleteApi, changeApiStatus } from './service'
import { useTranslation } from 'react-i18next'
import { TRANSLATE_UAA } from '@/routes'
import { errorMsg, successMsg } from '@/helper/message'
import { STATUS_UAA } from '@/helper/utils'
import { useDialog } from '@/components/hooks/dialog/useDialog'

type ReponseBody = {
  alias: string
  name: string
  serviceUrlRef: string
  endpoint: string
  status: boolean
  method: string
}

type ResponseService = {
  code: string
  description: string
  id?: number
  status: string
  name: string
  urlReference: string
}

type Params = {
  page?: number
  size?: number
  endpoint?: string
  method?: string
  serviceUrlRef?: string
  name?: string
  code?: string
}

export const useAPIManagement = () => {
  const { t } = useTranslation(TRANSLATE_UAA.API_MANAGEMENT)
  const [listApi, setListApi] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [filterApi, setFilterApi] = useState<Params>({ page: 0, size: 10 })
  const { hideDialog } = useDialog()

  const getListApi = async (params: Params) => {
    try {
      setLoading(true)
      const res = await getApi({ ...params })
      setListApi(res?.data?.data)
      setLoading(false)
      hideDialog()
    } catch (error) {
      setListApi(null)
    } finally {
      setLoading(false)
      hideDialog()
    }
  }

  const handleChangeStatus = async (id: number, version: number) => {
    try {
      const res = await changeApiStatus(id, version)
      getListApi(filterApi)
      hideDialog()
    } catch (e) {
    } finally {
      hideDialog()
    }
  }

  useEffect(() => {
    getListApi(filterApi)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterApi])

  const refetch = () => getListApi(filterApi)

  const [listService, setListService] = useState<ResponseService[]>([])
  const [loadingService, setLoadingService] = useState<boolean>(false)

  const getList = async () => {
    try {
      setLoadingService(true)
      const res = await getListService({ page: 0, size: 1000 })
      setListService(
        res?.data?.content?.filter(
          (v: any) => v.status === STATUS_UAA.PUBLISHED
        )
      )
      setLoadingService(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const handleDeleteRow = async (id: number, version: number) => {
    try {
      const res = await deleteApi(id, version)
      getListApi(filterApi)
      return res
    } catch (err) {
    } finally {
      hideDialog()
    }
  }

  return [
    {
      listApi,
      loading,
      filterApi,
    },
    {
      setFilterApi,
      getListApi,
      handleDeleteRow,
      handleChangeStatus,
      refetch,
    },
    t,
    { listService, loadingService },
  ] as const
}
