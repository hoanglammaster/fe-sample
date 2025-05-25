import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import { Action } from '@/components/molecules/Action'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { STATUS_UAA } from '@/helper/utils'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { Box, Button, Typography } from '@mui/material'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { DeleteDialog } from '../../SystemManagement/Dialog/DeleteDialog'
import { CustomTableDrop } from '../CreateUpdate/TableCustomDrop'
import SystemFeatureFilter from './SystemFeatureFilter'
import useRoleTypePermissionMapping from './useRoleTypePermissionMapping'

const ListRoleTypePermissionMapping = () => {
  const { t } = useTranslation(TRANSLATE_UAA.ROLE_TYPE_PERMISSION_MAPPING)
  const {
    filter,
    handleDeleteRow,
    listFeatureMapping,
    loading,
    setFilter,
    methodForm,
    onSubmit,
    handleChangeStatus,
    listPermission,
    listRoleType,
    listTier,
    loadingListPermission,
    loadingRoleType,
    loadingTier,
  } = useRoleTypePermissionMapping()
  const router = useRouter()
  const { showDialog } = useDialog()

  const columnsSe = useMemo(
    () =>
      [
        {
          header: t('label.roleType'),
          render: (row) =>
            `${row?.roleTypeResponse?.roleTypeCode ?? ''} - ${
              row?.roleTypeResponse?.roleTypeName ?? ''
            }`,
          fieldName: 'roleTypeName',
        },
        {
          header: t('label.tier'),
          render: (row) =>
            `${row?.tierResponse?.tierCode ?? ''} - ${
              row?.tierResponse?.tierName ?? ''
            }`,
          fieldName: 'tierName',
        },
        {
          header: t('table.createdAt'),
          render: (val) => (
            <Typography
              style={{ whiteSpace: 'pre-wrap' }}
              sx={{ fontSize: '14px' }}
            >
              {val.createdAt &&
                moment(val.createdAt).isValid() &&
                moment(val.createdAt).format('DD/MM/YYYY')}
            </Typography>
          ),
        },
        {
          header: t('table.createdBy'),
          fieldName: 'createdBy',
          render: (val) =>
            (val.createdBy?.firstName ?? '') +
            ' ' +
            (val.createdBy?.lastName ?? ''),
        },
        // {
        //   render: (val) => (
        //     <Typography variant='body2'>{renderStatus(val?.status)}</Typography>
        //   ),
        //   header: (
        //     {t('table.status')}</Typography>
        //   ),
        // },
        {
          render: (val) => (
            <Action
              actionList={
                val.status === STATUS_UAA.DRAFT
                  ? ['watch', 'edit']
                  : ['watch', 'edit']
              }
              onWatchAction={() =>
                router.push(
                  `${UAA_CHILDREN_PATH.ROLE_TYPE_PERMISSION_MAPPING}/view/${val.roleTypeId}/${val.tierId}`
                )
              }
              onEditAction={() =>
                router.push(
                  `${UAA_CHILDREN_PATH.ROLE_TYPE_PERMISSION_MAPPING}/update/${val.roleTypeId}/${val.tierId}`
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
          ),
          header: t('table.action'),
        },
      ] as ColumnProps[],
    [handleDeleteRow, router, showDialog, t]
  )

  const secondColumns = useMemo(
    () =>
      [
        {
          header: '',
          styleCell: { style: { backgroundColor: WHITE, width: 100 } },
        },
        {
          header: 'No',
          render: (row, index) => index + 1,
          styleCell: { style: { backgroundColor: WHITE } },
        },
        {
          header: t('label.system'),
          fieldName: 'name',
          styleCell: { style: { backgroundColor: WHITE } },
          render: (row) =>
            `${row?.systems?.code ?? ''} - ${row?.systems?.name ?? ''}`,
        },
        {
          header: t('label.permission'),
          fieldName: 'code',
          render: (row) => `${row?.code ?? ''} - ${row?.name ?? ''}`,
          styleCell: { style: { backgroundColor: WHITE } },
        },

        {
          header: '',
          styleCell: { style: { width: '100px', backgroundColor: WHITE } },
        },
      ] as ColumnProps[],
    [t]
  )

  return (
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography className='mr-10' variant='h1'>
            {t('title.page')}
          </Typography>
          <Link
            href={`${UAA_CHILDREN_PATH.ROLE_TYPE_PERMISSION_MAPPING}/create`}
            className='no-underline'
          >
            <Button variant='outlined' size='medium'>
              {t('common:btn.addNew')}
            </Button>
          </Link>
        </Box>
      }
    >
      <SystemFeatureFilter
        methodForm={methodForm}
        loading={loading}
        onSubmit={onSubmit}
        listTier={listTier?.data?.data ?? []}
        listPermission={listPermission?.data?.data?.content}
        loadingPermission={loadingListPermission}
        loadingRoleType={loadingRoleType}
        listRoleType={listRoleType?.data?.data ?? []}
        loadingTier={loadingTier}
      />
      <CustomTableDrop
        columns={columnsSe}
        {...listFeatureMapping}
        {...filter}
        data={listFeatureMapping?.content ?? []}
        loading={loading}
        onChangePageSize={(val: any) => setFilter({ ...filter, ...val })}
        onRowClick={(row: any) => {
          router.push(
            `${UAA_CHILDREN_PATH.ROLE_TYPE_PERMISSION_MAPPING}/view/${row?.roleTypeId}/${row?.tierId}`
          )
        }}
        isShowColumnStt
        renderAdditional={(row) => (
          <CustomTable
            data={row?.groupPermissionMappings ?? []}
            columns={secondColumns}
            paginationHidden
          />
        )}
      />
    </PageContainer>
  )
}

export default ListRoleTypePermissionMapping
