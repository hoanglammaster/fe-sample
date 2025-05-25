import { errorMsg, successMsg } from '@/helper/message'
import { STATUS_UAA, trimObject } from '@/helper/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { changeApiStatus, postApi, useQueryGetListService } from '../service'
import { useAPIDetail } from './useAPIDetail'

export const useAPIForm = () => {
  const { detailApi, loading, t, onPublished } = useAPIDetail()
  const router = useRouter()

  const { data: listService } = useQueryGetListService({ page: 0, size: 1000 })

  const { register, control, handleSubmit, watch, formState, reset } = useForm({
    mode: 'onTouched',
    defaultValues: {
      ...detailApi,
      id: detailApi?.id ?? undefined,
      code: detailApi?.code ?? '',
      name: detailApi?.name ?? '',
      serviceId: detailApi?.service?.id ?? undefined,
      endpoint: detailApi?.endpoint ?? '',
      description: detailApi?.description,
      method: detailApi?.method ?? '',
      status: detailApi?.status ?? STATUS_UAA.DRAFT,
      type: detailApi?.type ?? '',
      isAuthorized: detailApi?.isAuthorized ?? false,
    },
    // resolver: zodResolver(PostInputSchema),
  })
  const isView = router.asPath.includes('/view')

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await postApi(trimObject(data))
      router.push('/uaa/api-management')
    } catch (err) {}
  })

  useEffect(() => {
    detailApi &&
      reset({
        ...detailApi,
        id: detailApi?.id ?? undefined,
        code: detailApi?.code ?? '',
        name: detailApi?.name ?? '',
        serviceId: detailApi?.service?.id ?? undefined,
        endpoint: detailApi?.endpoint ?? '',
        method: detailApi?.method ?? '',
        status: detailApi?.status ?? STATUS_UAA.DRAFT,
        type: detailApi?.type ?? '',
        isAuthorized: detailApi?.isAuthorized ?? true,
        description: detailApi?.description,
      })
  }, [detailApi, reset])

  return [
    {
      register,
      control,
      handleSubmit,
      watch,
      formState,
      loading,
      isView,
      onPublished,
      listService: listService?.data?.content?.filter(
        (v) => v?.status === 'PUBLISHED'
      ),
    },
    { onSubmit },
    t,
  ] as const
}
