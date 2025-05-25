import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setFontConfig } from '@/redux/reducer/fontReducer'
import { putFontConfig } from '@/service/resources/theme/put/font'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { FontConfigInput, FontConfigSchema } from './schema'

export const useFontConfig = (refetch: any) => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const dispatch = useAppDispatch()
  const defaultValues = useAppSelector((state) => state.fontData)

  const fontSelect = useMemo(() => {
    return [
      {
        label: 'Roboto',
        value: 'Roboto',
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
    setValue,
  } = useFormCustom<FontConfigInput>({
    defaultValues,
    resolver: zodResolver(FontConfigSchema),
  })

  const putFontApi = useMutation(putFontConfig, {
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {},
  })

  const onSubmit = handleSubmit(async (input) => {
    putFontApi.mutate({
      companyId: 51,
      data: [
        {
          type: 'H1',
          color: input.h1Color,
          font: input.h1Font,
          size: input.h1Size,
        },
        {
          type: 'H4',
          color: input.h2Color,
          font: input.h2Font,
          size: input.h2Size,
        },
        {
          type: 'H3',
          color: input.h3Color,
          font: input.h3Font,
          size: input.h3Size,
        },
        {
          type: 'H4',
          color: input.h4Color,
          font: input.h4Font,
          size: input.h4Size,
        },
        {
          type: 'H5',
          color: input.h5Color,
          font: input.h5Font,
          size: input.h5Size,
        },
        {
          type: 'H6',
          color: input.h6Color,
          font: input.h6Font,
          size: input.h6Size,
        },
        {
          type: 'SUBTITLE1',
          color: input.subtitle1Color,
          font: input.subtitle1Font,
          size: input.subtitle1Size,
        },
        {
          type: 'SUBTITLE2',
          color: input.subtitle2Color,
          font: input.subtitle2Font,
          size: input.subtitle2Size,
        },

        {
          type: 'BODY1',
          color: input.body1Color,
          font: input.body1Font,
          size: input.body1Size,
        },
        {
          type: 'BODY2',
          color: input.body2Color,
          font: input.body2Font,
          size: input.body2Size,
        },
        {
          type: 'CAPTION',
          color: input.captionColor,
          font: input.captionFont,
          size: input.captionSize,
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
      setValue,
      defaultValues,
      fontSelect,
      isLoadingSubmit,
    },
    { onSubmit },
  ] as const
}
