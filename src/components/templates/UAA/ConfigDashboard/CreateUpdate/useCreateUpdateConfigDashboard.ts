import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getListSystem, getMenuList } from '../../ConfigMenu/List/service'
import { errorMsg, successMsg } from '@/helper/message'
import { handleDashboard } from './service'
import { RequestBody } from './type'
import { UAA_CHILDREN_PATH } from '@/routes'

const useCreateUpdateConfigDashboard = () => {
  const methodForm = useForm<RequestBody['POST']>({
    defaultValues: { menuIds: [{}] },
  })

  const { watch, handleSubmit } = methodForm
  const [listSystem, setListSystem] = useState<any[]>([])
  const [listMenu, setListMenu] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { slug } = router.query

  const getListSystemData = async () => {
    try {
      setLoading(true)
      const res = await getListSystem({ page: 0, size: 1000 })
      setListSystem(res?.data?.data?.content)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const getDetailDashboardConfig = async (id: string | number) => {
    try {
      setLoading(true)
      const res = await handleDashboard({ dashboardId: id }, undefined, 'get')
      methodForm.reset({
        ...res?.data?.data,
        menuIds: res?.data?.data?.menus.map((v: any, index: number) => {
          return { menu: v.id, no: index + 1 }
        }),
      })
    } catch (err) {}
  }

  const getListMenuForm = async (productId: string | number) => {
    try {
      const res = await getMenuList({ page: 0, size: 1000, productId })
      setListMenu(res?.data?.data?.content)
    } catch (error) {
      setLoading(false)
    }
  }

  const handleSubmitForm = handleSubmit(async (val) => {
    try {
      const data = {
        ...val,
        title: val.description,
        menuIds: val.menuIds
          .sort((a, b) => {
            return a.no - b.no
          })
          .map((v) => v.menu),
      }
      const res = await handleDashboard({}, data, val.id ? 'put' : 'post')
      router.push(UAA_CHILDREN_PATH.CONFIG_DISPLAY_SYSTEM)
    } catch (err) {}
  })

  useEffect(() => {
    getListSystemData()
  }, [])

  const productId = watch('productId')

  const isEdit = !!slug

  const handleRecallMenu = () => {
    productId && getListMenuForm(productId)
  }

  useEffect(() => {
    if (productId) {
      getListMenuForm(productId)
    }
  }, [productId])

  useEffect(() => {
    slug && getDetailDashboardConfig(slug.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const data = {
    methodForm,
    listSystem,
    loading,
    listMenu,
    handleRecallMenu,
    handleSubmitForm,
    isEdit,
  }
  return data
}

export default useCreateUpdateConfigDashboard
