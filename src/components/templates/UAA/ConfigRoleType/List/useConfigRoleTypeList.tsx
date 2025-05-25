import { TRANSLATE_UAA } from '@/routes'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { deleteConfig, getListRoleTypeConfig } from './service'
import { errorMsg, successMsg } from '@/helper/message'
import { useForm } from 'react-hook-form'
import { getListGroupPermissionBySystem } from '../CreateUpdate/service'
import { STATUS_UAA } from '@/helper/utils'
import { getSystem } from '../../SystemManagement/service'

const useConfigRoleTypeList = () => {
  const { t } = useTranslation(TRANSLATE_UAA.CONFIG_ROLE_TYPE)
  const [listConfig, setListConfig] = useState<any>()
  const [listPermission, setListPermission] = useState<any[]>([])
  const [listSystem, setListSystem] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [filterConfig, setFilterConfig] = useState<any>({ page: 0, size: 10 })

  const getListConfig = async (params: any) => {
    try {
      setLoading(true)
      const res = await getListRoleTypeConfig({ ...params })
      setListConfig(res?.data?.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const methodForm = useForm({
    defaultValues: {
      search: '',
      groupPermissionId: null,
      systemId: null,
    },
  })

  const onSubmit = methodForm.handleSubmit((val) => {
    setFilterConfig({ ...val, page: 0, size: filterConfig?.size ?? 20 })
  })

  const getListSystem = async () => {
    try {
      const res = await getSystem({
        page: 0,
        size: 1000,
      })
      setListSystem(
        res?.content?.filter((v: any) => v.status === STATUS_UAA.PUBLISHED)
      )
    } catch (error) {}
  }

  const getListPermission = async () => {
    try {
      const res = await getListGroupPermissionBySystem({
        page: 0,
        size: 1000,
      })
      setListPermission(
        res?.data?.data?.content?.filter(
          (v: any) => v.status === STATUS_UAA.PUBLISHED
        )
      )
    } catch (error) {}
  }

  useEffect(() => {
    getListConfig(filterConfig)
  }, [filterConfig])

  useEffect(() => {
    getListPermission()
    getListSystem()
  }, [])

  const handleDeleteRow = async (id: number) => {
    try {
      const res = await deleteConfig(id)
      getListConfig(filterConfig)
      return res
    } catch (err) {}
  }

  return {
    listConfig: listConfig,
    loading,
    filterConfig: filterConfig,
    listPermission,
    setFilterConfig: setFilterConfig,
    getListConfig: getListConfig,
    handleDeleteRow,
    t,
    onSubmit,
    methodForm,
    listSystem,
  }
}

export default useConfigRoleTypeList
