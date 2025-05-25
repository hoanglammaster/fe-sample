import { TRANSLATE_UAA } from '@/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { changeApiStatus, getDetailApi } from '../service'
import { Response } from './type'

export const useAPIDetail = () => {
  const { t } = useTranslation(TRANSLATE_UAA.API_MANAGEMENT)
  const router = useRouter()
  const { slug } = router.query
  const isEdit: boolean = !!slug && slug !== 'create'
  const [loading, setLoading] = useState<boolean>(false)
  const [detailApi, setDetailApi] = useState<Response['GET']>()

  const prepareData = async (id: number) => {
    setLoading(true)
    try {
      const res = await getDetailApi(id)
      setDetailApi(res?.data?.data)
    } catch (error) {}
    setLoading(false)
  }
  const version = Number(detailApi?.version)
  const onPublished = async () => {
    try {
      setLoading(true)
      if (detailApi?.id) {
        const res = await changeApiStatus(detailApi?.id, version)
        router.push('/uaa/api-management')
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isEdit) {
      prepareData(Number(slug))
    }
  }, [isEdit, slug])

  return {
    detailApi,
    loading,
    isEdit,
    t,
    onPublished,
  }
}
