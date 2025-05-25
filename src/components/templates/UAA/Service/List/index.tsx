import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Action } from '@/components/molecules/Action'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ServiceFilter from './ServiceFilter'
import useServiceList from './useServiceList'
import { DeleteDialog } from '../../SystemManagement/Dialog/DeleteDialog'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import moment from 'moment'
import { truncateText } from '@/components/atoms/TooltipCustom'

const ListService = () => {
  const {
    handleDeleteRow,
    listService,
    loading,
    setFilter,
    filter,
    methodForm,
    onSubmit,
    handleChangeStatus,
  } = useServiceList()
  const { t } = useTranslation(TRANSLATE_UAA.SERVICE)
  const router = useRouter()
  const { hideDialog, showDialog } = useDialog()

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.serviceCode'),
          fieldName: 'code',
        },
        {
          header: t('table.serviceName'),
          fieldName: 'name',
          styleCell: {
            style: {
              minWidth: 200,
            },
          },
        },
        {
          header: t('table.urlRef'),
          fieldName: 'urlReference',
          render: (v) => truncateText(v?.urlReference),
          styleCell: {
            style: {
              minWidth: 200,
            },
          },
        },
        {
          header: t('table.createAt'),
          render: (val) => (
            <Typography style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>
              {val.createdAt &&
                moment(val.createdAt).isValid() &&
                moment(val.createdAt).format('DD/MM/YYYY')}
            </Typography>
          ),
          styleCell: {
            style: {
              minWidth: 100,
            },
          },
        },
        {
          header: t('table.createBy'),
          fieldName: 'createdBy',
          render: (val) =>
            truncateText(
              (val?.createdBy?.firstName
                ? val?.createdBy?.firstName + ' '
                : '') +
                (val?.createdBy?.lastName ? val?.createdBy?.lastName : '')
            ),
          styleCell: {
            style: {
              minWidth: 200,
            },
          },
        },
        {
          render: (val) => (
            <Typography variant='body2' sx={{ fontSize: '14px' }}>
              {renderStatus(val.status)}
            </Typography>
          ),
          header: t('table.status'),
        },
        {
          neverHidden: true,
          render: (val) => (
            <Box>
              <Action
                actionList={
                  val.status === STATUS_UAA.DRAFT
                    ? ['watch', 'edit', 'delete']
                    : ['watch', 'edit']
                }
                onWatchAction={() =>
                  router.push(`${UAA_CHILDREN_PATH.SERVICE}/view/${val.id}`)
                }
                onEditAction={() =>
                  router.push(`${UAA_CHILDREN_PATH.SERVICE}/update/${val.id}`)
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
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography className='mr-10' variant='h1'>
            {t('title.listService')}
          </Typography>

          <Button
            variant='outlined'
            size='medium'
            onClick={() => router.push(`${UAA_CHILDREN_PATH.SERVICE}/create`)}
          >
            {t('common:btn.addNew')}
          </Button>
        </Box>
      }
    >
      <ServiceFilter
        methodForm={methodForm}
        loading={loading}
        onSubmit={onSubmit}
      />
      <CustomTable
        columns={columns}
        {...listService}
        data={listService?.content ?? []}
        loading={loading}
        {...filter}
        onChangePageSize={(val) => setFilter(val)}
        isShowColumnStt
        onRowClick={(row: any) => {
          router.push(`${UAA_CHILDREN_PATH.SERVICE}/view/${row?.id}`)
        }}
        paginationHidden={(listService?.content ?? []).length < 1}
      />
    </PageContainer>
  )
}

export default ListService
