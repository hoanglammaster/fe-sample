import { Action } from '@/components/molecules/Action'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { UAA_CHILDREN_PATH } from '@/routes'
import { Box, Button, ButtonBase, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import DetailPermissionDialog from '../DetailPermissionDialog'
import { useListUserDialog } from '../useListUserDialog'
import { PublishDialog } from '../../../SystemManagement/Dialog/PublishDialog'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DeleteDialog } from '../../../SystemManagement/Dialog/DeleteDialog'
import moment from 'moment'
import { truncateText } from '@/components/atoms/TooltipCustom'

interface Props {
  t: any
  listProduct: any[]
  listPermission: any
  filter: any
  loading?: boolean
  handleDeleteRow: (val: number, version: number) => void
  setFilter: (val: any) => void
  handleChangeStatus: (val: number, version: number) => void
}

const PermissionConfigTable = (props: Props) => {
  const {
    listProduct,
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
          styleCell: {
            style: {
              minWidth: 180,
            },
          },
        },
        {
          render: (val) => {
            return (
              <Box className='flex items-center border'>
                <Typography sx={{ fontSize: '14px' }}>{val?.name}</Typography>
              </Box>
            )
          },
          header: t('column.roleName'),
          styleCell: {
            style: {
              minWidth: 200,
            },
          },
        },
        {
          render: (val: any) => {
            return (
              <Box className='flex items-center'>
                <Typography
                  sx={{ fontSize: '14px' }}
                  className=' line-clamp-1 max-w-150'
                  title={`${val?.system?.code} - ${val.system?.name}`}
                >
                  {val?.system?.code} - {val.system?.name}
                </Typography>
              </Box>
            )
          },
          header: t('column.name'),
          styleCell: {
            style: {
              minWidth: 200,
            },
          },
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
          styleCell: {
            style: {
              minWidth: 100,
            },
          },
        },
        {
          render: (val) =>
            truncateText(
              (val?.createdBy?.firstName
                ? val?.createdBy?.firstName + ' '
                : '') +
                (val?.createdBy?.lastName ? val?.createdBy?.lastName : '')
            ),
          header: t('column.createdBy'),
          fieldName: 'createdBy',
          styleCell: {
            style: {
              minWidth: 150,
            },
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
                      `${UAA_CHILDREN_PATH.PERMISSION_CONFIG}/view/${val.id}`
                    )
                  }
                  onEditAction={() =>
                    router.push(
                      `${UAA_CHILDREN_PATH.PERMISSION_CONFIG}/update/${val.id}`
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
          header: (
            <Typography variant='subtitle2'>{t('common:action')}</Typography>
          ),
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
                      onSubmit={() => handleChangeStatus(val?.id, val?.version)}
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
        paginationHidden={listPermission?.content < 1}
        onRowClick={(val) =>
          router.push(`${UAA_CHILDREN_PATH.PERMISSION_CONFIG}/view/${val.id}`)
        }
      />
      {/* <DetailPermissionDialog
        t={t}
        detail={detail}
        onClose={() => setDetail(undefined)}
        listProduct={listProduct}
      /> */}
      {renderListUserDialog()}
    </>
  )
}

export default PermissionConfigTable
