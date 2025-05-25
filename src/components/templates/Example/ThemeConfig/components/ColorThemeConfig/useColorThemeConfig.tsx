import { layoutType } from '@/components/layouts/MultipleLayouts/recoil'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { putThemeConfig } from '@/service/resources/theme/put/theme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'
import { ThemeColorConfigInput, ThemeColorConfigSchema } from './schema'

export const useColorThemeConfig = (refetch: any) => {
  const [layout, setLayout] = useRecoilState(layoutType)
  const defaultValues = useAppSelector((state) => state.themeColorData)

  const dispatch = useAppDispatch()
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const layoutSelect = useMemo(() => {
    return [
      {
        label: 'Layout 1',
        value: 'Layout1',
      },
      {
        label: 'Layout 2',
        value: 'Layout2',
      },
      {
        label: 'Layout 3',
        value: 'Layout3',
      },
    ]
  }, [])

  const themeSelect = useMemo(() => {
    return [
      {
        label: 'Theme 1',
        value: 'THEME_1',
      },
      {
        label: 'Theme 2',
        value: 'THEME_2',
      },
      {
        label: 'Theme 3',
        value: 'THEME_3',
      },
      {
        label: 'Custom theme',
        value: 'CUSTOM',
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
  } = useFormCustom<ThemeColorConfigInput>({
    defaultValues: {
      ...defaultValues,
      layout,
    },
    resolver: zodResolver(ThemeColorConfigSchema),
  })

  const router = useRouter()

  const putColorConfigApi = useMutation(putThemeConfig, {
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {},
  })

  const onSubmit = handleSubmit(async (input) => {
    // console.log('input', input)
    const { layout } = input
    if (layout) setLayout(layout as any)

    console.log('input', input)

    putColorConfigApi.mutate({
      companyId: 51,
      data: input,
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
      layoutSelect,
      themeSelect,
      isLoadingSubmit,
    },
    { onSubmit },
  ] as const
}
