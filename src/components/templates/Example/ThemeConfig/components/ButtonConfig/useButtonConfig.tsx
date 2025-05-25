import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { putButtonConfig } from '@/service/resources/theme/put/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { ButtonConfigInput, ButtonConfigSchema } from './schema'

export const useButtonConfig = (refetch: any) => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const dispatch = useAppDispatch()
  const defaultValues = useAppSelector((state) => state.buttonData)

  const fontSelect = useMemo(() => {
    return [
      {
        label: 'Roboto',
        value: 'Roboto',
      },
      {
        label: 'Oxygen',
        value: 'Oxygen',
      },
      {
        label: 'Ubuntu',
        value: 'Ubuntu',
      },
      {
        label: 'Times New Roman',
        value: 'Times New Roman',
      },
    ]
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    trigger,
    reset,
  } = useFormCustom<ButtonConfigInput>({
    defaultValues,
    resolver: zodResolver(ButtonConfigSchema),
  })

  const putButtonApi = useMutation(putButtonConfig, {
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {},
  })

  const onSubmit = handleSubmit(async (input) => {
    putButtonApi.mutate({
      companyId: 51,
      data: [
        {
          type: 'SUBMIT',
          textColor: input.submitButton.textColor,
          hoverTextColor: input.submitButton.hoverTextColor,
          backgroundColor: input.submitButton.backgroundColor,
          backgroundHoverColor: input.submitButton.backgroundHoverColor,
          borderColor: input.submitButton.borderColor,
          borderHoverColor: input.submitButton.borderHoverColor,
        },
        {
          type: 'RESET',
          textColor: input.resetButton.textColor,
          hoverTextColor: input.resetButton.hoverTextColor,
          backgroundColor: input.resetButton.backgroundColor,
          backgroundHoverColor: input.resetButton.backgroundHoverColor,
          borderColor: input.resetButton.borderColor,
          borderHoverColor: input.resetButton.borderHoverColor,
        },
        {
          type: 'REJECT',
          textColor: input.rejectButton.textColor,
          hoverTextColor: input.rejectButton.hoverTextColor,
          backgroundColor: input.rejectButton.backgroundColor,
          backgroundHoverColor: input.rejectButton.backgroundHoverColor,
          borderColor: input.rejectButton.borderColor,
          borderHoverColor: input.rejectButton.borderHoverColor,
        },
        {
          type: 'DRAFT',
          textColor: input.draftButton.textColor,
          hoverTextColor: input.draftButton.hoverTextColor,
          backgroundColor: input.draftButton.backgroundColor,
          backgroundHoverColor: input.draftButton.backgroundHoverColor,
          borderColor: input.draftButton.borderColor,
          borderHoverColor: input.draftButton.borderHoverColor,
        },
      ],
    })
  })

  return [
    {
      register,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
      trigger,
      reset,
      defaultValues,
      fontSelect,
      isLoadingSubmit,
    },
    { onSubmit },
  ] as const
}
