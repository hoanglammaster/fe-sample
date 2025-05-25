import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'

import { TRANSLATE_UAA, UAA_CHILDREN_PATH, UAA_TRANSLATE_PATH } from '@/routes'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useQueryGetConfigGroupList, useQueryGetConfigList } from './service'

const defaultValues = {
  page: 0,
  size: 10,
  configValue: undefined,
  configKey: undefined,
  allowedDisplay: true,
  groupId: null,
  sort: ['createdAt,desc'],
}

export const useConfig = () => {
  const { t } = useTranslation(TRANSLATE_UAA.CONFIG)
  const { showDialog } = useDialog()
  const router = useRouter()

  const [queryPage, setQueryPage] = useState<any>(defaultValues)

  const methodForm = useFormCustom<any>({
    defaultValues,
  })

  const { control, handleSubmit } = methodForm

  const { isLoading, data, refetch, isRefetching } =
    useQueryGetConfigList(queryPage)

  const { isLoading: isLoadingConfigGroup, data: dataConfigGroup } =
    useQueryGetConfigGroupList({
      page: 0,
      size: 1000,
    })

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage({
      ...input,
      page: 0,
      allowedDisplay: true,
    })
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page, size })
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('text.configGroup'),
          fieldName: 'groupName',
        },
        {
          header: t('key'),
          fieldName: 'configKey',
        },
        {
          header: t('description'),
          fieldName: 'description',
        },

        {
          header: t('datatype'),
          fieldName: 'dataType',
        },
        {
          header: t('defaultValue'),
          fieldName: 'defaultValue',
        },
        {
          header: t('value'),
          fieldName: 'value',
        },

        {
          header: t('common:action'),
          fieldName: 'action',
        },
      ] as ColumnProps[],
    [t]
  )

  console.log('dataConfigGroup', dataConfigGroup)

  const rowConfig = data
    ? (data?.data?.content ?? []).map((item: any) => {
        return {
          ...item,
          configValue: item?.name,
          configKey: item?.configKey,
          value: item?.configValue,
          description: item?.description,
          groupName: item?.groupName,
          action: (
            <Action
              actionList={item?.allowedModify ? ['watch', 'edit'] : ['watch']}
              onEditAction={() =>
                router.push(`${UAA_CHILDREN_PATH.CONFIG}/update/${item?.id}`)
              }
              onWatchAction={() =>
                router.push(`${UAA_CHILDREN_PATH.CONFIG}/view/${item?.id}`)
              }
            />
          ),
        }
      })
    : []

  return [
    {
      control,
      rowConfig,
      columns,
      data: data?.data,
      t,
      isLoading: isLoading || isRefetching,
      listConfigGroup: dataConfigGroup?.data ?? [],
      isLoadingConfigGroup,
      queryPage,
      setQueryPage,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
