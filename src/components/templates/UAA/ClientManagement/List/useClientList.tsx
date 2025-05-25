import { ColumnProps } from '@/components/organism/TableCustom'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { Button, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  deleteClient,
  publishClient,
  useQueryGetListClient,
} from './service/service'
import { Action } from '@/components/molecules/Action'
import { useRouter } from 'next/router'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH, UAA_TRANSLATE_PATH } from '@/routes'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { DeleteDialog } from '../../SystemManagement/Dialog/DeleteDialog'
import DialogActionClient from './components/DialogLock'
import { truncateText } from '@/components/atoms/TooltipCustom'

export const useClientList = () => {
  const { t } = useTranslation(TRANSLATE_UAA.CLIENT)
  const { showDialog, hideDialog } = useDialog()
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({ page: 0, size: 10 })
  const methodForm = useForm({
    defaultValues: {
      name: '',
      code: '',
      type: '',
    },
  })

  const {
    data: listClient,
    isLoading: loadingClient,
    refetch,
  } = useQueryGetListClient(filter)

  const onSubmit = methodForm.handleSubmit((val) => {
    setFilter({ ...val, page: 0, size: filter.size ?? 10 })
  })

  const handlePublishClient = async (id: number, version: number) => {
    try {
      if (id) {
        const data = await publishClient(id, version)
        router.push(UAA_CHILDREN_PATH.CLIENT_MANAGEMENT)
        hideDialog()
        refetch()
      }
    } catch (e) {
      hideDialog()
    } finally {
      hideDialog()
    }
  }

  const handleDeleteClient = async (id: number, version: number) => {
    try {
      const data = await deleteClient(id, version)
      hideDialog()
      refetch()
    } catch (e) {
      hideDialog()
    } finally {
      hideDialog()
    }
  }

  const router = useRouter()

  const columns = useMemo(
    () =>
      [
        {
          header: t('label.clientCode'),
          fieldName: 'code',
        },
        {
          header: t('label.clientName'),
          fieldName: 'name',
        },
        {
          header: t('label.type'),
          fieldName: 'type',
          render: (val) =>
            val?.type === 'EXTERNAL'
              ? 'External'
              : val?.type === 'INTERNAL'
              ? 'Internal'
              : 'Partner',
        },
        {
          header: t('common:table.createdAt'),
          render: (v) => moment(v.createdAt).format('DD/MM/YYYY'),
        },
        {
          header: t('common:table.createdBy'),
          fieldName: 'createdBy',
          render: (val) =>
            truncateText(
              (val?.createdBy?.firstName
                ? val?.createdBy?.firstName + ' '
                : '') +
                (val?.createdBy?.lastName ? val?.createdBy?.lastName : '')
            ),
        },
        {
          header: t('common:status'),
          render: (val) =>
            val?.status === 'PUBLISHED' ? (
              <Typography sx={{ color: '#4DBC6C', fontSize: '14px' }}>
                Active
              </Typography>
            ) : val?.status === 'DRAFT' ? (
              <Typography sx={{ color: '#F57322', fontSize: '14px' }}>
                Draft
              </Typography>
            ) : val?.status === 'LOCKED' ? (
              <Typography sx={{ color: '#002495', fontSize: '14px' }}>
                Locked
              </Typography>
            ) : val?.status === 'TERMINATED' ? (
              <Typography sx={{ color: '#C93A3D', fontSize: '14px' }}>
                Terminated
              </Typography>
            ) : (
              <Typography sx={{ color: '#4DBC6C', fontSize: '14px' }}>
                Active
              </Typography>
            ),
        },
        {
          header: t('common:action'),
          fieldName: 'action',
          neverHidden: true,
          render: (val) => {
            let listAction: any[] = []
            if (val.status === STATUS_UAA.DRAFT) {
              listAction = ['watch', 'edit', 'delete']
            }
            if (
              val.status === STATUS_UAA.ACTIVE ||
              val.status === STATUS_UAA.ACTIVE
            ) {
              listAction = ['watch', 'unlock', 'cancel']
            }
            if (val.status === STATUS_UAA.TERMINATED) {
              listAction = ['watch']
            }
            if (val.status === STATUS_UAA.LOCKED) {
              listAction = ['watch', 'edit', 'lock', 'cancel']
            }
            return (
              <div className='flex'>
                <Action
                  actionList={listAction}
                  onWatchAction={() =>
                    router.push(
                      `${UAA_CHILDREN_PATH.CLIENT_MANAGEMENT}/view/${val.id}`
                    )
                  }
                  onEditAction={() =>
                    router.push(
                      `${UAA_CHILDREN_PATH.CLIENT_MANAGEMENT}/update/${val.id}`
                    )
                  }
                  onDeleteAction={() => {
                    showDialog(
                      <DeleteDialog
                        t={t}
                        handleDeleteRow={handleDeleteClient}
                        row={val}
                      />
                    )
                  }}
                  onUnlockAction={() => {
                    showDialog(
                      <DialogActionClient
                        refetch={() => refetch()}
                        t={t}
                        row={val}
                        action='lock'
                      />
                    )
                  }}
                  onLockAction={() =>
                    showDialog(
                      <DialogActionClient
                        refetch={() => refetch()}
                        t={t}
                        row={val}
                        action='unlock'
                      />
                    )
                  }
                  onCancelAction={() =>
                    showDialog(
                      <DialogActionClient
                        refetch={() => refetch()}
                        t={t}
                        row={val}
                        action='terminate'
                      />
                    )
                  }
                />
                {val?.status === STATUS_UAA.DRAFT && (
                  <Button
                    variant='outlined'
                    size='small'
                    className='ml-3'
                    onClick={() =>
                      showDialog(
                        <PublishDialog
                          onSubmit={() =>
                            handlePublishClient(val?.id, val?.version)
                          }
                          t={t}
                        />
                      )
                    }
                  >
                    {'Publish'}
                  </Button>
                )}
              </div>
            )
          },
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const data = {
    loading,
    listClient,
    setFilter,
    filter,
    methodForm,
    onSubmit,
    columns,
    loadingClient,
  }

  return data
}
