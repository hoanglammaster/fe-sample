import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { publishSubMenu } from '../../service'

export const useDialogChangeStatusSubMenu = (
  id: number,
  refetch?: any,
  version?: number
) => {
  const router = useRouter()
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      id,
      status: 'PUBLISHED',
      version: version,
    },
  })

  const { mutate, isLoading } = useMutation(publishSubMenu, {
    onSuccess: (data) => {
      hideDialog()
      refetch ? refetch() : router.push('/uaa/sub-menu-management')
    },
    onError: (error: any) => {
      hideDialog()
    },
  })

  const onSubmit = handleSubmit(async (input?: any) => {
    mutate(input)
  })

  return [{ isLoading }, { onSubmit }] as const
}
