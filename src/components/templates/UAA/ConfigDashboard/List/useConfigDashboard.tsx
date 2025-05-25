import React, { useEffect, useState } from 'react'
import { getListSystem } from '../../ConfigMenu/List/service'
import { errorMsg } from '@/helper/message'
import { getListDashboard } from './service'

const useConfigDashboard = () => {
  const [listSystem, setListSystem] = useState<any[]>([])
  const [listDashboard, setListDashboard] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({ page: 0, size: 10 })
  const getListSystemData = async () => {
    try {
      const res = await getListSystem({ page: 0, size: 1000 })
      setListSystem(res?.data?.data?.content)
    } catch (error) {}
  }

  const getListDashboardConfig = async (filter: any) => {
    try {
      setLoading(true)
      const res = await getListDashboard(filter)
      setListDashboard(res?.data?.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListSystemData()
  }, [])

  useEffect(() => {
    getListDashboardConfig(filter)
  }, [filter])

  const data = {
    listSystem,
    loading,
    listDashboard,
    filter,
    setFilter,
  }
  return data
}

export default useConfigDashboard
