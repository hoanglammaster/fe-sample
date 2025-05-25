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
import useFeature from './useSystemFeatureMapping'
import { truncateText } from '@/components/atoms/TooltipCustom'

const ListSystemFeatureMapping = () => {
  const { t } = useTranslation(TRANSLATE_UAA.FEATURE)
  const {
    filter,
    handleDeleteRow,
    listFeatureMapping,
    loading,
    setFilter,
    methodForm,
    onSubmit,
    handleChangeStatus,
    listFeature,
    listSystem,
    loadingListFeature,
    loadingListSystem,
  } = useFeature()
  const router = useRouter()
  const { hideDialog, showDialog } = useDialog()

  const columnsSe = useMemo(
    () =>
      [
        {
          header: t('table.system'),
          fieldName: 'name',
        },
        {
          header: t('common:table.createdAt'),
          render: (val) =>
            !!val.createdAt ? moment(val.createdAt).format('DD/MM/YYYY') : '',
          styleCell: {
            style: {
              minWidth: 150,
            },
          },
        },
        {
          header: t('common:table.createdBy'),
          fieldName: 'createdBy',
          render: (val) =>
            (val?.createdBy?.firstName ? val?.createdBy?.firstName + ' ' : '') +
            (val?.createdBy?.lastName ? val?.createdBy?.lastName : ''),
        },
        {
          render: (val) => (
            <Box>
              <Action
                actionList={
                  val.status === STATUS_UAA.DRAFT
                    ? ['watch', 'edit', 'delete']
                    : ['watch', 'edit']
                }
                onWatchAction={() =>
                  router.push(
                    `${UAA_CHILDREN_PATH.SYSTEM_FEATURE_MAPPING}/view/${val.id}`
                  )
                }
                onEditAction={() =>
                  router.push(
                    `${UAA_CHILDREN_PATH.SYSTEM_FEATURE_MAPPING}/update/${val.id}`
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
          neverHidden: true,
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
          fieldName: 'serviceName',
          render: (row, index) => index + 1,
          styleCell: { style: { backgroundColor: WHITE } },
        },
        {
          header: t('form.featureCode'),
          fieldName: 'code',
          styleCell: { style: { backgroundColor: WHITE } },
        },
        {
          header: t('form.featureName'),
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

  return (
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography className='mr-10' variant='h1'>
            {t('title.listFeatureMapping')}
          </Typography>
          <Link
            href={`${UAA_CHILDREN_PATH.SYSTEM_FEATURE_MAPPING}/create`}
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
        listFeature={listFeature?.data?.data?.content}
        listSystem={listSystem?.content}
        loadingFeature={loadingListFeature}
        loadingSystem={loadingListSystem}
      />
      <CustomTableDrop
        columns={columnsSe}
        {...listFeatureMapping}
        data={listFeatureMapping?.content ?? []}
        loading={loading}
        {...filter}
        onChangePageSize={(val: any) => setFilter({ ...filter, ...val })}
        onRowClick={(row: any) => {
          router.push(
            `${UAA_CHILDREN_PATH.SYSTEM_FEATURE_MAPPING}/view/${row?.id}`
          )
        }}
        isShowColumnStt
        renderAdditional={(row) => (
          <CustomTable
            data={row?.features.slice(0, 5) ?? []}
            columns={secondColumns}
            paginationHidden
          />
        )}
      />
    </PageContainer>
  )
}

export default ListSystemFeatureMapping
