import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { putConfig, useQueryGetConfigDetail } from './service'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'

const defaultValues = {}

export const useSaveConfig = () => {
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = router.asPath.includes('/view')
  const { t } = useTranslation(TRANSLATE_UAA.CONFIG)

  const methodForm = useFormCustom<any>({
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

      router.push(UAA_CHILDREN_PATH.CONFIG)
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
      reset({
        ...data.data,
        configGroupName: data?.data?.configGroupResponse?.configGroupName,
      })
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
      t,
    },
    { onSubmit, onCancel },
  ] as const
}
