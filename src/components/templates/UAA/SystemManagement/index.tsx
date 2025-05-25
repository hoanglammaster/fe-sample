import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Action } from '@/components/molecules/Action'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { UAA_CHILDREN_PATH } from '@/routes'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { SYSTEM_TYPE } from './AddNewSystemManagement'
import SystemFilter from './SystemFilter'
import { useSystemManagement } from './useSystemManagement'
import Image from 'next/image'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DeleteDialog } from './Dialog/DeleteDialog'
import { PublishDialog } from './Dialog/PublishDialog'
import { WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import moment from 'moment'
import { truncateText } from '@/components/atoms/TooltipCustom'
import ActionProvider from '@/components/atoms/ActionProvider'

const SystemManagement = () => {
  const {
    listSystem,
    getListSystem,
    loading,
    t,
    handleDeleteRow,
    methodForm,
    onSubmit,
    handleChangeStatus,
    setFilterSystem,
    filterSystem,
  } = useSystemManagement()
  const router = useRouter()

  const { hideDialog, showDialog } = useDialog()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderTooltip = (val: any[]) => {
    return (
      <Box sx={{ backgroundColor: WHITE }}>
        <Typography variant='subtitle2' className='mb-5'>
          {t('column.role')}
        </Typography>
        {val.map((v, index) => {
          return (
            <Typography variant='body2' className='mb-5' key={index}>
              {v?.roleTypeCode} - {v?.roleTypeName}
            </Typography>
          )
        })}
      </Box>
    )
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('column.code'),
          fieldName: 'code',
        },
        {
          header: t('column.name'),
          fieldName: 'name',
        },
        {
          header: t('column.role'),
          fieldName: 'roleTypeId',
          neverHidden: true,
          render: (row) =>
            row?.roleTypes?.length > 0 && (
              <Tooltip
                title={renderTooltip(row?.roleTypes ?? [])}
                placement='bottom-start'
              >
                <Image
                  src={require('@/assets/svg/iconInformation.svg')}
                  alt='eye'
                  width={16}
                  height={16}
                />
              </Tooltip>
            ),
        },
        {
          header: t('common:table.createdAt'),
          render: (val: any) => {
            return (
              <p>
                {val?.createdAt &&
                  moment(val?.createdAt).isValid() &&
                  moment(val?.createdAt).format('DD/MM/YYYY')}
              </p>
            )
          },
        },
        {
          header: t('common:table.createdBy'),
          fieldName: 'createdBy',
          render: (val: any) =>
            truncateText(
              (val?.createdBy?.firstName
                ? val?.createdBy?.firstName + ' '
                : '') +
                (val?.createdBy?.lastName ? val?.createdBy?.lastName : '')
            ),
        },
        {
          header: t('column.status'),
          fieldName: 'isActivated',
          render: (row) => (
            <Typography sx={{ fontSize: '14px' }}>
              {renderStatus(row?.status)}
            </Typography>
          ),
        },
        {
          neverHidden: true,
          header: t('column.action'),
          fieldName: '',
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
                    `${UAA_CHILDREN_PATH.SYSTEM_MANAGEMENT}/view/${val.id}`
                  )
                }
                onEditAction={() =>
                  router.push(
                    `${UAA_CHILDREN_PATH.SYSTEM_MANAGEMENT}/update/${val.id}`
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
    [handleChangeStatus, handleDeleteRow, renderTooltip, router, showDialog, t]
  )
  return (
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography className='mr-10' variant='h1'>
            {t('title.page')}
          </Typography>
          <ActionProvider action='CREA'>
            <Button
              variant='outlined'
              size='medium'
              onClick={() =>
                router.push(`${UAA_CHILDREN_PATH.SYSTEM_MANAGEMENT}/create`)
              }
            >
              {t('common:btn.addNew')}
            </Button>
          </ActionProvider>
        </Box>
      }
    >
      <SystemFilter
        methodForm={methodForm}
        onSubmit={onSubmit}
        loading={loading}
      />
      <CustomTable
        loading={loading}
        columns={columns}
        onChangePageSize={(val) => setFilterSystem({ ...filterSystem, ...val })}
        paginationHidden={listSystem?.content?.length < 1}
        {...listSystem}
        {...filterSystem}
        data={listSystem?.content ?? []}
        isShowColumnStt
        onRowClick={(row: any) => {
          router.push(`${UAA_CHILDREN_PATH.SYSTEM_MANAGEMENT}/view/${row?.id}`)
        }}
      />
    </PageContainer>
  )
}

export default SystemManagement
