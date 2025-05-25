import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useForm } from 'react-hook-form'

export const useConfirmResetDialog = (id: number, refetch: any) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      id,
      status: 'PUBLISHED',
    },
  })

  // const { mutate, isLoading } = useMutation(changeStatusFeature, {
  //   onSuccess: (data) => {
  //     refetch()
  //   },
  //   onError: (error: any) => {
  //   },
  // })

  const onSubmit = handleSubmit(async (input?: any) => {
    // mutate(input)
    hideDialog()
  })

  return [{ isLoading: false }, { onSubmit }] as const
}
