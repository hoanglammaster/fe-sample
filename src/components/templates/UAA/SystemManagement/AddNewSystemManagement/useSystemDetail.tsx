import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getDetailSystem, getFeatureByProduct } from '../service'
import { useTranslation } from 'react-i18next'
import { TRANSLATE_UAA } from '@/routes'
import { Response } from './type'

export const useSystemDetail = () => {
  const { t } = useTranslation(TRANSLATE_UAA.SYSTEM_MANAGEMENT)
  const router = useRouter()
  const { slug } = router.query
  const isEdit = !!slug && slug !== 'create'
  const [loading, setLoading] = useState<boolean>(false)
  const [detailSystem, setDetailSystem] = useState<Response['GET']>()

  const prepareData = async (id: number) => {
    setLoading(true)
    try {
      const res = await getDetailSystem(id)
      setDetailSystem({
        ...res?.data?.data,
      })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isEdit) {
      prepareData(Number(slug))
    }
  }, [isEdit, slug])

  return {
    detailSystem,
    loading,
    isEdit,
    t,
  }
}
