import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { UAA_CHILDREN_PATH } from '@/routes'
import { useQueryGetConfigDetail } from '@/service/uaa/config/getDetail'
import { putConfig } from '@/service/uaa/config/save'
import { SaveInput, SaveInputSchema } from '@/service/uaa/config/save/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {}

export const useSaveConfig = () => {
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = router.asPath.includes('/view')

  const methodForm = useFormCustom<SaveInput>({
    defaultValues,
    // resolver: zodResolver(SaveInputSchema),
  })

  const { control, handleSubmit, reset, watch, register, setValue } = methodForm

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(putConfig, {
    onSuccess: (res: any) => {
      // if (res?.data?.fieldErrors && res?.data?.fieldErrors.length > 0) {
      //   errorFormField(
      //     setError,
      //     res?.data?.fieldErrors,
      //     res?.data?.description ?? 'System Error'
      //   )
      // } else {
      //   router.back()
      // }
      if (res?.data?.httpCode !== 200) {
      } else {
        router.push(UAA_CHILDREN_PATH.CONFIG)
      }
    },
    onError: (error: any) => {},
  })

  const onSubmit = handleSubmit(
    async (data) => {
      data.id = id
      mutate(data)
    },
    (err) => console.log('_______ err _______', err)
  )

  const { data, isLoading } = useQueryGetConfigDetail({ id }, { enabled: !!id })

  useEffect(() => {
    if (id && data && data.data) {
      reset(data.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data, reset])

  return [
    {
      control,
      watch,
      register,
      setValue,
      isUpdate,
      isLoading,
      isLoadingSubmit,
      isView,
      data: data?.data,
    },
    { onSubmit, onCancel },
  ] as const
}
