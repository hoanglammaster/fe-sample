import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { UAA_CHILDREN_PATH } from '@/routes'
import { Box, Button, Typography } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { DeleteDialog } from '../../../SystemManagement/Dialog/DeleteDialog'
import { PublishDialog } from '../../../SystemManagement/Dialog/PublishDialog'
import { useListUserDialog } from '../useListUserDialog'
import { truncateText } from '@/components/atoms/TooltipCustom'

interface Props {
  t: any
  listPermission: any
  filter: any
  loading?: boolean
  handleDeleteRow: (val: number, version: number) => void
  setFilter: (val: any) => void
  handleChangeStatus: (val: number, version: number) => void
}

const PermissionConfigTable = (props: Props) => {
  const {
    listPermission,
    filter,
    loading,
    handleDeleteRow,
    t,
    setFilter,
    handleChangeStatus,
  } = props

  const [detail, setDetail] = useState<any>()
  const { hideDialog, showDialog } = useDialog()

  const router = useRouter()

  const { handleOpenListUseDialog, renderListUserDialog } = useListUserDialog()

  const tableColumns = useMemo(
    () =>
      [
        {
          render: (val: any) => {
            return (
              <Box className='flex items-center'>
                <Typography sx={{ fontSize: '14px' }}>{val.code}</Typography>
              </Box>
            )
          },
          header: t('column.code'),
        },
        {
          header: t('column.roleName'),
          fieldName: 'name',
        },
        {
          render: (val: any) => {
            return (
              <Typography sx={{ fontSize: '14px' }}>
                {val.createdAt && moment(val.createdAt).isValid()
                  ? moment(val.createdAt).format('DD/MM/YYYY')
                  : ''}
              </Typography>
            )
          },
          header: t('column.createdAt'),
        },
        {
          header: t('column.createdBy'),
          fieldName: 'createdBy',
          render: (val: any) => {
            return truncateText(
              (val?.createdBy?.firstName ?? '') +
                ' ' +
                (val?.createdBy?.lastName ?? '')
            )
          },
        },
        {
          header: t('common:status'),
          fieldName: 'status',
          render: (row) => (
            <Typography sx={{ fontSize: '14px' }}>
              {renderStatus(row?.status)}
            </Typography>
          ),
        },
        {
          neverHidden: true,
          render: (val: any) => {
            return (
              <Box className='flex items-center'>
                <Action
                  actionList={
                    val.status === STATUS_UAA.DRAFT
                      ? ['watch', 'edit', 'delete']
                      : ['watch', 'edit']
                  }
                  onWatchAction={() =>
                    router.push(
                      `${UAA_CHILDREN_PATH.SCOPE_MANAGEMENT}/view/${val.id}`
                    )
                  }
                  onEditAction={() =>
                    router.push(
                      `${UAA_CHILDREN_PATH.SCOPE_MANAGEMENT}/update/${val.id}`
                    )
                  }
                  onDeleteAction={() =>
                    showDialog(
                      <DeleteDialog
                        handleDeleteRow={handleDeleteRow}
                        row={val}
                        t={t}
                      />
                    )
                  }
                />
              </Box>
            )
          },
          header: t('common:action'),
        },
        {
          render: (val) =>
            val.status === STATUS_UAA.DRAFT && (
              <Button
                variant='outlined'
                size='small'
                onClick={() =>
                  showDialog(
                    <PublishDialog
                      onSubmit={handleChangeStatus}
                      row={val}
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
    [t, router, showDialog, handleDeleteRow, handleChangeStatus]
  )
  return (
    <>
      <CustomTable
        columns={tableColumns}
        loading={loading}
        onChangePageSize={(val: any) => setFilter({ ...filter, ...val })}
        data={listPermission?.content ?? []}
        isShowColumnStt
        {...listPermission}
        {...filter}
        onRowClick={(val) =>
          router.push(`${UAA_CHILDREN_PATH.SCOPE_MANAGEMENT}/view/${val.id}`)
        }
      />
      {renderListUserDialog()}
    </>
  )
}

export default PermissionConfigTable
