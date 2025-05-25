import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { STATUS_UAA } from '@/helper/utils'
import { useFormCustom } from '@/lib/form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { changeStatusSystem, saveSystem } from '../service'
import { PostInput } from './schema'
import { useSystemDetail } from './useSystemDetail'

export const useSystemForm = () => {
  const router = useRouter()

  const isView = router.asPath.includes('/view')

  const { detailSystem: dataSystem, loading, isEdit, t } = useSystemDetail()
  const { register, control, handleSubmit, watch, formState, reset, setValue } =
    useFormCustom<PostInput>({
      mode: 'onTouched',
      defaultValues: {
        ...dataSystem,
        id: dataSystem?.id ?? undefined,
        code: dataSystem?.code ?? '',
        name: dataSystem?.name ?? '',
        description: dataSystem?.description ?? '',
        status: dataSystem?.status ?? STATUS_UAA.DRAFT,
      },
      // resolver: zodResolver(PostInputSchema),
    })

  const { hideDialog, showDialog } = useDialog()
  const version = Number(dataSystem?.version)
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (isView && data?.id) {
        const res = await changeStatusSystem(data?.id, version)
        hideDialog()
      } else {
        const res = await saveSystem(data)
        hideDialog()
      }
      router.push('/uaa/system-management')
    } catch (err) {
      hideDialog()
    }
  })

  useEffect(() => {
    dataSystem && reset(dataSystem)
  }, [dataSystem, reset])

  return [
    {
      register,
      control,
      handleSubmit,
      watch,
      formState,
      setValue,
      loading,
      isEdit,
      t,
      isView,
    },
    { onSubmit },
  ] as const
}
