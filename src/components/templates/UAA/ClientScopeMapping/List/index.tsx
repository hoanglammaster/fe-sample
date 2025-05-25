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
import SystemFeatureFilter from './SystemFeatureFilter'
import useClientScopeMapping from './useClientScopeMapping'
import { CustomTableDrop } from '../../Feature/CreateUpdate/TableCustomDrop'

const ListClientScopeMapping = () => {
  const { t } = useTranslation(TRANSLATE_UAA.CLIENT_SCOPE_MAPPING)
  const {
    filter,
    handleDeleteRow,
    listFeatureMapping,
    loading,
    setFilter,
    methodForm,
    onSubmit,
    handleChangeStatus,
    listClient,
    listScope,
    loadingListClient,
    loadingListScope,
  } = useClientScopeMapping()
  const router = useRouter()
  const { hideDialog, showDialog } = useDialog()

  const columnsSe = useMemo(
    () =>
      [
        {
          header: t('table.client'),
          fieldName: 'code',
          render: (row) => `${row?.code ?? ''} - ${row?.name ?? ''}`,
        },
        {
          header: t('table.type'),
          fieldName: 'name',
          render: (row) =>
            row?.type === 'INTERNAL'
              ? 'Internal'
              : row?.type === 'EXTERNAL'
              ? 'External'
              : 'Partner',
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
          render: (val) => (
            <Typography
              style={{ whiteSpace: 'pre-wrap' }}
              sx={{ fontSize: '14px' }}
            >
              {val.createdBy?.firstName}
              &nbsp;
              {val.createdBy?.lastName}
            </Typography>
          ),
        },
        {
          neverHidden: true,
          render: (val) => (
            <Box>
              <Action
                actionList={
                  val.status === STATUS_UAA.DRAFT
                    ? ['watch', 'edit']
                    : ['watch', 'edit']
                }
                onWatchAction={() =>
                  router.push(
                    `${UAA_CHILDREN_PATH.CLIENT_SCOPE_MAPPING}/view/${val.id}`
                  )
                }
                onEditAction={() =>
                  router.push(
                    `${UAA_CHILDREN_PATH.CLIENT_SCOPE_MAPPING}/update/${val.id}`
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
          header: t('table-scope.code'),
          fieldName: 'code',
          styleCell: { style: { backgroundColor: WHITE } },
        },
        {
          header: t('table-scope.name'),
          fieldName: 'name',
          styleCell: { style: { backgroundColor: WHITE } },
        },
        {
          header: '',
          styleCell: { style: { width: '100px', backgroundColor: WHITE } },
        },
      ] as ColumnProps[],
    [t]
  )

  console.log('listClient', listClient, listScope)

  return (
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography className='mr-10' variant='h1'>
            {t('title.page')}
          </Typography>
          <Link
            href={`${UAA_CHILDREN_PATH.CLIENT_SCOPE_MAPPING}/create`}
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
        listClient={listClient?.content}
        listScope={listScope?.data?.data?.content}
        loadingListScope={loadingListScope}
        loadingListClient={loadingListClient}
      />
      <CustomTableDrop
        columns={columnsSe}
        {...listFeatureMapping}
        data={listFeatureMapping?.content ?? []}
        loading={loading}
        onChangePageSize={(val: any) => setFilter(val)}
        onRowClick={(row: any) => {
          router.push(
            `${UAA_CHILDREN_PATH.CLIENT_SCOPE_MAPPING}/view/${row?.id}`
          )
        }}
        isShowColumnStt
        renderAdditional={(row) => (
          <CustomTable
            data={row?.scopes ?? []}
            columns={secondColumns}
            paginationHidden
          />
        )}
      />
    </PageContainer>
  )
}

export default ListClientScopeMapping
