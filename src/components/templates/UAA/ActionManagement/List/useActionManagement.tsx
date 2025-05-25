import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { renderStatus, STATUS_UAA } from '@/helper/utils'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { Button } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import { deleteAction, publishAction, useQueryGetListAction } from '../service'
import { DeleteDialog } from '../../SystemManagement/Dialog/DeleteDialog'
import { truncateText } from '@/components/atoms/TooltipCustom'

const useActionManagement = () => {
  const { t } = useTranslation(TRANSLATE_UAA.ACTION_MANAGEMENT)
  const router = useRouter()
  const formAction = useForm<any>()
  const [filterAction, setFilterAction] = useState<any>({ page: 0, size: 10 })
  const { showDialog, hideDialog } = useDialog()

  const {
    data,
    isLoading: loadingListAction,
    refetch,
  } = useQueryGetListAction(filterAction)

  const onSubmit = formAction.handleSubmit((val) => {
    setFilterAction({
      ...val,
      page: 0,
      size: filterAction.size ?? 10,
      codeOrName: val?.codeOrName.trim(),
    })
  })

  const handleDeleteAction = async (id: number, version: number) => {
    try {
      await deleteAction(id, version)
      hideDialog()
      refetch()
    } catch (e) {
      hideDialog()
    }
  }

  const handlePublishAction = async (id: number, version: number) => {
    try {
      await publishAction(id, version)
      hideDialog()
      refetch()
    } catch (e) {
      hideDialog()
    }
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('label.actionCode'),
          fieldName: 'code',
          styleCell: {
            style: { minWidth: 100 },
          },
        },
        {
          header: t('label.actionName'),
          fieldName: 'name',
          styleCell: {
            style: { minWidth: 110 },
          },
        },
        {
          header: t('label.sequenceNumber'),
          fieldName: 'sequence',
          neverHidden: true,
          render: (val) => (
            <div className='flex justify-center items-center'>
              {val?.sequence ? val?.sequence : '-'}
            </div>
          ),
          styleCell: {
            style: {
              minWidth: 230,
              textAlign: 'center',
            },
          },
        },
        {
          header: t('label.description'),
          fieldName: 'description',
        },
        {
          header: t('common:table.createdBy'),
          fieldName: 'createdBy',
          render: (v) =>
            truncateText(
              (!!v?.createdBy?.firstName ? v?.createdBy?.firstName + ' ' : '') +
                (!!v?.createdBy?.lastName ? v?.createdBy?.lastName : '')
            ),
        },
        {
          header: t('common:table.createdAt'),
          fieldName: 'createdAt',
          render: (v) =>
            v?.createdAt &&
            moment(v?.createdAt).isValid() &&
            moment(v?.createdAt).format('DD/MM/YYYY'),
          styleCell: {
            style: {
              minWidth: 100,
            },
          },
        },
        {
          header: t('common:status'),
          fieldName: 'status',
          render: (v) => renderStatus(v?.status),
        },
        {
          header: t('label.action'),
          fieldName: '',
          render: (v) => (
            <Action
              actionList={
                v?.status === STATUS_UAA.PUBLISHED
                  ? ['watch', 'edit']
                  : ['watch', 'edit', 'delete']
              }
              onWatchAction={() => {
                router.push(
                  `${UAA_CHILDREN_PATH.ACTION_MANAGEMENT}/view/${v?.id}`
                )
              }}
              onEditAction={() => {
                router.push(
                  `${UAA_CHILDREN_PATH.ACTION_MANAGEMENT}/update/${v?.id}`
                )
              }}
              onDeleteAction={() => {
                showDialog(
                  <DeleteDialog
                    handleDeleteRow={handleDeleteAction}
                    row={v}
                    t={t}
                  />
                )
              }}
            />
          ),
        },
        {
          render: (v) =>
            v.status === STATUS_UAA.DRAFT && (
              <Button
                variant='outlined'
                size='small'
                onClick={() =>
                  showDialog(
                    <PublishDialog
                      onSubmit={() => handlePublishAction(v?.id, v?.version)}
                      row={v}
                      t={t}
                    />
                  )
                }
              >
                {'Publish'}
              </Button>
            ),
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, showDialog, t]
  )

  return [
    {
      t,
      formAction,
      columns,
      router,
      listAction: data,
      filterAction,
      loadingListAction,
    },
    { setFilterAction, onSubmit },
  ] as const
}

export default useActionManagement
