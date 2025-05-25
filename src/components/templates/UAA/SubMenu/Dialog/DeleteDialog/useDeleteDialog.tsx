import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { deleteSubMenu } from '../../service'

export const useDialogDeleteSubMenu = (
  id: number,
  refetch: any,
  version: number
) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      id,
      version: version,
    },
  })

  const { mutate, isLoading } = useMutation(deleteSubMenu, {
    onSuccess: (data) => {
      hideDialog()
      refetch()
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
