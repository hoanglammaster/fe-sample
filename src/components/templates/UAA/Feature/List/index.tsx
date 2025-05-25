import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Action } from '@/components/molecules/Action'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { Box, Button, ButtonBase, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import FeatureFilter from './FeatureFilter'
import useFeature from './useFeature'
import { DeleteDialog } from '../../SystemManagement/Dialog/DeleteDialog'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import { CustomTableDrop } from '../CreateUpdate/TableCustomDrop'
import {
  BLUE,
  GREEN,
  ORANGE,
  WHITE,
} from '@/components/layouts/WrapLayout/Theme/colors'
import moment from 'moment'
import Image from 'next/image'
import DialogImport from './DialogImport'

const ListFeature = () => {
  const { t } = useTranslation(TRANSLATE_UAA.FEATURE)
  const {
    filter,
    handleDeleteRow,
    listFeature,
    loading,
    setFilter,
    methodForm,
    onSubmit,
    handleChangeStatus,
    refetch,
  } = useFeature()
  const router = useRouter()
  const { hideDialog, showDialog } = useDialog()

  const columnsSe = useMemo(
    () =>
      [
        {
          header: t('table.system'),
          fieldName: 'code',
          render: (val: any) =>
            (val?.systemResponse?.code ?? '') +
            '-' +
            (val?.systemResponse?.name ?? ''),
        },
        {
          header: t('table.featureCode'),
          fieldName: 'code',
        },
        {
          header: t('table.featureName'),
          fieldName: 'name',
        },
        {
          header: t('common:table.createdAt'),
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
          header: t('common:table.createdBy'),
          fieldName: 'createdBy',
          render: (val) =>
            `${val.createdBy?.firstName ?? ''} ${
              val.createdBy?.lastName ?? ''
            }`,
        },

        {
          render: (val) => (
            <Typography variant='body2' sx={{ fontSize: '14px' }}>
              {renderStatus(val?.status)}
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
                  router.push(`${UAA_CHILDREN_PATH.FEATURE}/view/${val.id}`)
                }
                onEditAction={() =>
                  router.push(`${UAA_CHILDREN_PATH.FEATURE}/update/${val.id}`)
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
    [handleChangeStatus, handleDeleteRow, router, showDialog, t]
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
          header: t('form.service'),
          // fieldName: 'serviceName',
          render: (v: any) => (
            <Typography sx={{ fontSize: '14px' }}>
              {v?.serviceCode} - {v?.serviceName}
            </Typography>
          ),
          styleCell: { style: { backgroundColor: WHITE } },
        },
        {
          header: t('form.apiCode'),
          fieldName: 'code',
          render: (v) => (
            <Typography title={v?.code} sx={{ fontSize: '14px' }}>
              {v?.code.length > 20
                ? `${v?.code.slice(0, 20) + '...'}`
                : v?.code}
            </Typography>
          ),
          styleCell: { style: { backgroundColor: WHITE } },
        },
        {
          header: t('form.apiName'),
          fieldName: 'name',
          render: (v) => (
            <Typography title={v?.name} sx={{ fontSize: '14px' }}>
              {v?.name.length > 20
                ? `${v?.name.slice(0, 20) + '...'}`
                : v?.name}
            </Typography>
          ),
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
            {t('title.listFeature')}
          </Typography>
          <Link
            href={`${UAA_CHILDREN_PATH.FEATURE}/create`}
            className='no-underline'
          >
            <Button variant='outlined' size='medium'>
              {t('common:btn.addNew')}
            </Button>
          </Link>
        </Box>
      }
    >
      <FeatureFilter
        methodForm={methodForm}
        loading={loading}
        onSubmit={onSubmit}
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
            onClick={() => {
              showDialog(<DialogImport refetch={refetch} />)
            }}
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
          columns={columnsSe}
          {...listFeature}
          {...filter}
          data={listFeature?.content ?? []}
          isLoading={loading}
          onChangePageSize={(val: any) => setFilter({ ...filter, ...val })}
          paginationHidden={listFeature?.content.length < 1}
          isShowColumnStt
          onRowClick={(row) => {
            router.push(`${UAA_CHILDREN_PATH.FEATURE}/view/${row?.id}`)
          }}
          // renderAdditional={(row) => (
          //   <CustomTable
          //     data={row?.apis ?? []}
          //     columns={secondColumns}
          //     paginationHidden
          //   />
          // )}
        />
      </div>
    </PageContainer>
  )
}

export default ListFeature
