import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { GetInput, GetInputSchema } from '@/service/uaa/config/list/schema'
import { useQueryGetConfigList } from '@/service/uaa/config/list'
import { RequestBody } from '@/service/uaa/config/list/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { renderStatus } from '@/helper/utils'
import moment from 'moment'
import { UAA_CHILDREN_PATH } from '@/routes'

const defaultValues = {
  page: 0,
  size: 10,
  groupId: null,
}

export const useConfig = () => {
  const { t } = useTranslation('uaa/config')
  const { showDialog } = useDialog()
  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)
  const methodForm = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit } = methodForm
  const { isLoading, data, refetch } = useQueryGetConfigList(queryPage)

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page, size })
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('configGroupName'),
          fieldName: 'configGroupName',
        },
        {
          header: t('configKey'),
          fieldName: 'configKey',
        },
        {
          header: t('value'),
          fieldName: 'configValue',
        },
        {
          header: t('dataType'),
          fieldName: 'dataType',
        },
        {
          header: t('defaultValue'),
          fieldName: 'defaultValue',
        },
        {
          header: t('description'),
          fieldName: 'description',
        },
        {
          header: t('action'),
          fieldName: 'action',
          neverHidden: true,
        },
      ] as ColumnProps[],
    [t]
  )

  const content = (data?.data?.content ?? []).map((item: any) => {
    return {
      id: item?.id,
      configKey: item.configKey,
      configValue: item.configValue,
      type: item.type,
      createdBy:
        item?.createdBy?.firstName ??
        '' ??
        '' + ' ' + item?.createdBy?.lastName ??
        '',
      createdAt:
        item?.createdAt && moment(item?.createdAt).format('DD/MM/YYYY'),
      status: renderStatus(item?.status),
      action: (
        <Action
          actionList={
            item?.status === 'DRAFT'
              ? ['watch', 'edit', 'delete']
              : ['watch', 'edit']
          }
          onWatchAction={() => {
            router.push({
              pathname: `${UAA_CHILDREN_PATH.CONFIG}/view/[id]`,
              query: {
                id: item.id,
              },
            })
          }}
          onEditAction={() => {
            router.push({
              pathname: `${UAA_CHILDREN_PATH.CONFIG}/[id]`,
              query: {
                id: item.id,
              },
            })
          }}
        />
      ),
    }
  })

  return [
    {
      control,
      content,
      columns,
      isLoading,
      data: data?.data,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
