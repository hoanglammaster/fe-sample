import { errorMsg } from '@/helper/message'
import React, { useEffect, useState } from 'react'
import {deleteListMenuConfig, getListMenuConfig, getListSystem, publishListMenuConfig} from './service'
import {useDialog} from "@/components/hooks/dialog/useDialog";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const useConfigMenu = () => {
  const [listSystem, setListSystem] = useState<any[]>([])
  const [listMenuConfig, setListMenuConfig] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<any>({ page: 0, size: 10 })
  const { hideDialog } = useDialog()

  const getListSystemData = async () => {
    try {
      const res = await getListSystem({ page: 0, size: 1000 })
      setListSystem(res?.data?.data?.content)
    } catch (error) {}
  }

  const handleDeleteRow = async (id: number, version: number) => {
    try {
      const res = await deleteListMenuConfig(id, version)
      getListMenu(filter)
      setLoading(true)
      hideDialog()
    } catch (error) {
    } finally {
      hideDialog()
    }
  }

  const onPublished = async (id: number, version: number) => {
    try {
      const res = await publishListMenuConfig(id, version)
      hideDialog()
      setLoading(true)
      getListMenu(filter)
    } catch (e) {
    } finally {
      hideDialog()
    }
  }

  const getListMenu = async (fil: any) => {
    try {
      setLoading(true)
      const res = await getListMenuConfig(fil)
      setListMenuConfig(res?.data?.data)
      console.log('Res', res?.data?.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const refetch = () => getListMenu(filter)

  console.log('listMenuConfig', listMenuConfig)

  useEffect(() => {
    getListSystemData()
  }, [])

  useEffect(() => {
    getListMenu(filter)
  }, [filter])

  return {
    listSystem,
    loading,
    listMenuConfig,
    handleDeleteRow,
    onPublished,
    filter,
    setFilter,
    refetch,
  }
}

export default useConfigMenu
