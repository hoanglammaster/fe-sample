import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Action } from '@/components/molecules/Action'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { UAA_CHILDREN_PATH } from '@/routes'
import { Box, Button, ButtonBase, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import ApiFilter from './components/ApiFilter/APIFilter'
import { useAPIManagement } from './useAPIManagement'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DeleteDialog } from '../SystemManagement/Dialog/DeleteDialog'
import { PublishDialog } from '../SystemManagement/Dialog/PublishDialog'
import Image from 'next/image'
import { BLUE, GREEN, ORANGE } from '@/helper/colors'
import moment from 'moment'
import { truncateText } from '@/components/atoms/TooltipCustom'
import DialogImport from './components/DialogImport'

const APIManagement = () => {
  const [value, handle, t, serviceInfo] = useAPIManagement()

  const { listApi, loading, filterApi } = value

  const {
    setFilterApi,
    getListApi,
    handleDeleteRow,
    handleChangeStatus,
    refetch,
  } = handle

  const { listService, loadingService } = serviceInfo
  const router = useRouter()
  const { hideDialog, showDialog } = useDialog()

  const columns = useMemo(
    () =>
      [
        {
          header: t('column.code'),
          render: (v) => truncateText(v?.code),
        },
        {
          header: t('column.name'),
          fieldName: 'name',
        },
        {
          header: t('column.service'),
          fieldName: 'serviceName',
          render: (v) =>
            !!v?.serviceCode && !!v?.serviceName
              ? v?.serviceCode + ' - ' + v?.serviceName
              : '',
        },
        {
          header: t('column.method'),
          fieldName: 'method',
        },
        {
          header: t('common:table.createdAt'),
          render: (v) => moment(v.createdAt).format('DD/MM/YYYY'),
          styleCell: {
            style: {
              minWidth: 100,
            },
          },
        },
        {
          header: t('common:table.createdBy'),
          fieldName: 'createdBy',
          render: (v) =>
            truncateText(
              (v?.createdBy?.firstName ? v?.createdBy?.firstName + ' ' : '') +
                (v?.createdBy?.lastName ? v?.createdBy?.lastName : '')
            ),
        },
        {
          header: t('column.status'),
          fieldName: 'status',
          render: (row) => renderStatus(row?.status),
        },
        {
          header: t('column.action'),
          fieldName: '',
          neverHidden: true,
          render: (val) => (
            <Box className='flex flex-row'>
              <Action
                actionList={
                  val.status === STATUS_UAA.DRAFT
                    ? ['watch', 'edit', 'delete']
                    : ['watch', 'edit']
                }
                onWatchAction={() =>
                  router.push(
                    `${UAA_CHILDREN_PATH.API_MANAGEMENT}/view/${val.id}`
                  )
                }
                onEditAction={() =>
                  router.push(
                    `${UAA_CHILDREN_PATH.API_MANAGEMENT}/update/${val.id}`
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
    [handleChangeStatus, handleDeleteRow, router, showDialog, t]
  )

  return (
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography className='mr-10' variant='h1'>
            {t('title.page')}
          </Typography>

          <Button
            variant='outlined'
            size='medium'
            onClick={() =>
              router.push(`${UAA_CHILDREN_PATH.API_MANAGEMENT}/create`)
            }
          >
            {t('common:btn.addNew')}
          </Button>
        </Box>
      }
    >
      <ApiFilter
        t={t}
        setFilter={setFilterApi}
        filterApi={filterApi}
        listService={listService}
        loading={loadingService}
      />
      <div>
        <div className='flex gap-5 mb-10 justify-end'>
          <div className='flex items-center gap-3'>
            <Image
              src={require('@/assets/svg/GreenExport.svg')}
              alt=''
              height={16}
              width={16}
            />
            <Typography sx={{ color: GREEN }}>
              {t('common:btn.export')}
            </Typography>
          </div>
          <ButtonBase
            onClick={() => showDialog(<DialogImport refetch={refetch} />)}
            className='flex items-center gap-3'
          >
            <Image
              src={require('@/assets/svg/BlueUpload.svg')}
              alt=''
              height={16}
              width={16}
            />
            <Typography sx={{ color: BLUE }}>
              {t('common:btn.import')}
            </Typography>
          </ButtonBase>
          <div className='flex items-center gap-3'>
            <Image
              src={require('@/assets/svg/ClockClockwise.svg')}
              alt=''
              height={16}
              width={16}
            />
            <Typography sx={{ color: ORANGE }}>
              {t('common:btn.historyImport')}
            </Typography>
          </div>
        </div>
        <CustomTable
          data={listApi?.content ?? []}
          columns={columns}
          {...filterApi}
          onChangePageSize={(val) => {
            setFilterApi({ ...filterApi, page: val.page, size: val.size })
          }}
          isLoading={loading}
          isShowColumnStt
          onRowClick={(row) => {
            router.push(`${UAA_CHILDREN_PATH.API_MANAGEMENT}/view/${row?.id}`)
          }}
          paginationHidden={(listApi?.content ?? []).length < 1}
          {...listApi}
        />
      </div>
    </PageContainer>
  )
}

export default APIManagement
