import { errorMsg, successMsg } from '@/helper/message'
import { UAA_CHILDREN_PATH } from '@/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  changeStatusService,
  createUpdateService,
  getDetailService,
  updateService,
} from './service'
import { STATUS_UAA } from '@/helper/utils'
import { useDialog } from '@/components/hooks/dialog/useDialog'

const useCreateUpdateService = () => {
  const router = useRouter()
  const { hideDialog } = useDialog()
  const [loading, setLoading] = useState(false)
  const formServiceContext = useForm<any>({
    mode: 'onTouched',
    defaultValues: { status: 'DRAFT' },
  })
  const { slug } = router.query
  const isCreate = !slug
  const id = Number(router.query.slug)
  const isView = router.asPath.includes('/view')
  const version = formServiceContext.watch('version')

  const handleCreateUpdateService = async (data: any) => {
    try {
      isCreate
        ? await createUpdateService(data)
        : await updateService(data, data?.id)
      router.push(UAA_CHILDREN_PATH.SERVICE)
    } catch (err) {}
  }

  const handleChangeStatus = async () => {
    try {
      await changeStatusService({ serviceId: id, version })
      router.push(UAA_CHILDREN_PATH.SERVICE)
      hideDialog()
    } catch (e) {}
  }

  const handleSubmit = formServiceContext.handleSubmit((val) =>
    handleCreateUpdateService(val)
  )

  const getDetailServiceData = async (serviceId: number | string) => {
    try {
      setLoading(true)
      const res = await getDetailService({ serviceId })
      formServiceContext.reset(res?.data?.data)
      setLoading(false)
    } catch (err) {}
  }

  useEffect(() => {
    slug && getDetailServiceData(slug.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const data = {
    formServiceContext,
    handleSubmit,
    loading,
    isCreate,
    isView,
    handleChangeStatus,
  }
  return data
}

export default useCreateUpdateService
