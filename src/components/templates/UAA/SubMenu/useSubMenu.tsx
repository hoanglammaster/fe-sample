import { ColumnProps } from '@/components/organism/TableCustom'
import { STATUS_UAA, renderStatus, showCodeNameOption } from '@/helper/utils'
import { Button, Tooltip } from '@mui/material'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryGetListSubMenu } from './service'
import { Action } from '@/components/molecules/Action'
import { useRouter } from 'next/router'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import Image from 'next/image'
import { DialogDeleteSubMenu } from './Dialog/DeleteDialog'
import { DialogChangeStatusSubMenu } from './Dialog/PublishDialog'
import { TooltipDialog } from './TooltipDialog'
import { truncateText } from '@/components/atoms/TooltipCustom'

const defaultValues = {
  systemId: {
    code: 'All',
    id: null,
  },
  type: null,
  searchByName: '',
  page: 0,
  size: 10,
  sort: ['createdAt,desc'],
}

export const useSubMenu = () => {
  const { t } = useTranslation(TRANSLATE_UAA.SUB_MENU_MANAGEMENT)
  const [filter, setFilter] = useState({ page: 0, size: 10 })
  const { showDialog } = useDialog()
  const methodForm = useForm({
    defaultValues,
  })

  const {
    data: listSubMenu,
    isFetching: loadingSubMenu,
    refetch,
  } = useQueryGetListSubMenu(filter)

  const onSubmit = methodForm.handleSubmit((val: any) => {
    setFilter({
      ...val,
      page: 0,
      size: filter.size ?? 10,
      systemId: val?.systemId?.id,
    })
  })

  const router = useRouter()

  const columns = useMemo(
    () =>
      [
        {
          header: t('label.system'),
          fieldName: 'description',
          render: (val) =>
            showCodeNameOption(
              val?.systemResponse?.code,
              val?.systemResponse?.name
            ),
        },
        {
          header: t('label.subMenuType'),
          fieldName: 'type',
          styleCell: {
            sx: {
              minWidth: 120,
            },
          },
        },
        {
          header: t('label.subMenuName'),
          fieldName: 'name',
        },
        {
          header: t('common:action'),
          neverHidden: true,
          styleCell: {
            sx: {
              textAlign: 'center',
            },
          },
          render: (val) => {
            if ((val?.actionResponses?.length ?? 0) > 0) {
              return (
                <Tooltip
                  title={<TooltipDialog item={val?.actionResponses} t={t} />}
                  style={{ cursor: 'pointer' }}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                        bgcolor: 'common.white',
                        '& .MuiTooltip-arrow': {
                          color: 'common.white',
                        },
                        maxWidth: 3000,
                        maxHeight: 400,
                        padding: 2,
                        overflow: 'auto',
                      },
                    },
                  }}
                >
                  <Image
                    src={require('@/assets/svg/info_icon.svg')}
                    alt='eye'
                    width={16}
                    height={16}
                  />
                </Tooltip>
              )
            }
          },
        },
        {
          header: t('common:table.createdAt'),
          render: (v) => moment(v.createdAt).format('DD/MM/YYYY'),
          styleCell: {
            sx: {
              minWidth: 90,
            },
          },
        },
        {
          header: t('common:table.createdBy'),
          render: (val) =>
            truncateText(
              (val?.createdBy?.firstName
                ? val?.createdBy?.firstName + ' '
                : '') +
                (val?.createdBy?.lastName ? val?.createdBy?.lastName : '')
            ),
        },
        {
          header: t('common:status'),
          render: (val) => renderStatus(val?.status),
        },
        {
          header: t('common:action'),
          fieldName: 'action',
          neverHidden: true,
          render: (val) => {
            return (
              <div className='flex'>
                <Action
                  actionList={
                    val.status === STATUS_UAA.DRAFT
                      ? ['watch', 'edit', 'delete']
                      : ['watch', 'edit']
                  }
                  onWatchAction={() =>
                    router.push(
                      `${UAA_CHILDREN_PATH.SUB_MENU_MANAGEMENT}/view/${val.id}`
                    )
                  }
                  onEditAction={() =>
                    router.push(
                      `${UAA_CHILDREN_PATH.SUB_MENU_MANAGEMENT}/update/${val.id}`
                    )
                  }
                  onDeleteAction={() => {
                    showDialog(
                      <DialogDeleteSubMenu
                        id={val?.id}
                        refetch={refetch}
                        version={val?.version}
                      />
                    )
                  }}
                />
                {val?.status === STATUS_UAA.DRAFT && (
                  <Button
                    variant='outlined'
                    size='small'
                    className='ml-3'
                    onClick={() => {
                      showDialog(
                        <DialogChangeStatusSubMenu
                          id={val?.id}
                          refetch={refetch}
                          version={val?.version}
                        />
                      )
                    }}
                  >
                    {'Publish'}
                  </Button>
                )}
              </div>
            )
          },
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return {
    listSubMenu,
    loadingSubMenu,
    setFilter,
    filter,
    methodForm,
    onSubmit,
    columns,
    t,
  }
}
