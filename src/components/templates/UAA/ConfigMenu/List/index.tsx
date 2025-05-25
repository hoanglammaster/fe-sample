import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { Box, Button, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import useConfigMenu from './useConfigMenu'
import { default as IconEye } from '@/assets/svg/Eye.svg'
import EditIcon from '@/components/Icon/EditIcon'
import CreateMenuDialog from './CreateMenuDialog'
import CoreDialog from '@/components/molecules/CoreDialog'
import { renderMenuConfig } from '@/components/layouts/MultipleLayouts/Layout2/components/LeftMenu/useMenu'
import { Action } from '@/components/molecules/Action'
import { useRouter } from 'next/router'
import { errorMsg, successMsg } from '@/helper/message'
import { deleteListMenuConfig, publishListMenuConfig } from './service'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DeleteDialog } from '../../SystemManagement/Dialog/DeleteDialog'
import MenuConfigFilter from './MenuConfigFilter'
import { renderStatus, STATUS_UAA } from '@/helper/utils'
import { PublishDialog } from '@/components/templates/UAA/SystemManagement/Dialog/PublishDialog'

const ConfigMenu = () => {
  const { t } = useTranslation(TRANSLATE_UAA.MENU)
  const {
    listMenuConfig,
    listSystem,
    loading,
    handleDeleteRow,
    onPublished,
    setFilter,
    refetch,
    filter,
  } = useConfigMenu()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { hideDialog, showDialog } = useDialog()

  const columns = useMemo(
    () =>
      [
        {
          header: t('column.system'),
          fieldName: 'systemName',
        },
        {
          header: t('column.platform'),
          fieldName: 'platform',
        },
        {
          header: t('column.location'),
          fieldName: 'location',
        },
        {
          header: t('column.status'),
          fieldName: 'status',
          render: (row) => renderStatus(row?.status),
        },
        {
          header: t('column.action'),
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
                      `${UAA_CHILDREN_PATH.CONFIGURATION_MENU}/view/${val.id}`
                    )
                  }
                  onEditAction={() =>
                    router.push(
                      `${UAA_CHILDREN_PATH.CONFIGURATION_MENU}/update/${val.id}`
                    )
                  }
                  onDeleteAction={() =>
                    showDialog(
                      <DeleteDialog
                        handleDeleteRow={() =>
                          handleDeleteRow(val.id, val.version)
                        }
                        text={t('label.deleteConfirm')}
                        t={t}
                      />
                    )
                  }
                />
                {val.status === STATUS_UAA.DRAFT && (
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={() =>
                      showDialog(
                        <PublishDialog
                          onSubmit={() => onPublished(val.id, val.version)}
                          row={val}
                          t={t}
                        />
                      )
                    }
                  >
                    {'Publish'}
                  </Button>
                )}
              </Box>
            )
          },
        },
      ] as ColumnProps[],
    [handleDeleteRow, onPublished, router, showDialog, t]
  )

  return (
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography variant='h1' className='mr-10'>
            {t('title.page')}
          </Typography>
          <Button
            onClick={() => setOpen(true)}
            variant='outlined'
            size='medium'
          >
            {t('common:btn.addNew')}
          </Button>
        </Box>
      }
    >
      <MenuConfigFilter
        loading={loading}
        listSystem={listSystem}
        onChange={(val) => setFilter({ ...val, page: 0, size: filter.size })}
      />
      <>
        <CustomTable
          columns={columns}
          {...listMenuConfig}
          {...filter}
          data={listMenuConfig?.content ?? []}
          isLoading={loading}
          isShowColumnStt
          onChangePageSize={(val: any) => setFilter(val)}
          onRowClick={(val) =>
            router.push(
              `${UAA_CHILDREN_PATH.CONFIGURATION_MENU}/view/${val.id}`
            )
          }
        />
        <CoreDialog
          open={open}
          handleClose={() => setOpen(false)}
          maxWidth='md'
          fullWidth
          dialogTitle={
            <Typography variant='h3' className='my-10'>
              {t('text.add')}
            </Typography>
          }
          dialogContent={
            <CreateMenuDialog
              handleClose={() => setOpen(false)}
              listSystem={listSystem}
              open={open}
            />
          }
        />
      </>
    </PageContainer>
  )
}

export default ConfigMenu
