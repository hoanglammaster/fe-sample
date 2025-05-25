import EditIcon from '@/components/Icon/EditIcon'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import useConfigDashboard from './useConfigDashboard'

const ListConfigDashboard = () => {
  const { t } = useTranslation(TRANSLATE_UAA.SCREEN_DASHBOARD)
  const { filter, listDashboard, listSystem, loading, setFilter } =
    useConfigDashboard()

  const router = useRouter()

  const tableColumns = useMemo(
    () =>
      [
        {
          header: (
            <Typography variant='subtitle2'>{t('column.system')}</Typography>
          ),
          render: (val: any) => {
            return (
              <Typography variant='body2'>
                {listSystem?.find((v) => v.id === val?.productId)?.name}
              </Typography>
            )
          },
        },
        {
          header: (
            <Typography variant='subtitle2'>{t('column.menu')}</Typography>
          ),
          render: (val: any) => {
            return (
              <Box>
                {val?.menus?.map((item: any, index: number) => {
                  return (
                    <Typography variant='body2' key={index}>
                      {item?.name}
                    </Typography>
                  )
                })}
              </Box>
            )
          },
        },
        ,
        {
          header: (
            <Typography variant='subtitle2'>{t('column.content')}</Typography>
          ),
          render: (val: any) => {
            return <div dangerouslySetInnerHTML={{ __html: val.description }} />
          },
        },
        {
          header: (
            <Typography variant='subtitle2'>{t('column.action')}</Typography>
          ),
          render: (val) => (
            <Box>
              <EditIcon
                ondblclick={() =>
                  router.push(
                    `${UAA_CHILDREN_PATH.CONFIG_DISPLAY_SYSTEM}/update/${val?.id}`
                  )
                }
              />
            </Box>
          ),
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listSystem, t]
  )
  return (
    <PageContainer
      title={t('config')}
      pageTitle={
        <Typography
          gutterBottom
          noWrap
          variant='h6'
          component='div'
          className='flex items-center gap-4'
        >
          {t('listMenu')}
        </Typography>
      }
      toolbarAction={
        <Button
          onClick={() =>
            router.push(`${UAA_CHILDREN_PATH.CONFIG_DISPLAY_SYSTEM}/create`)
          }
          variant='contained'
          color='primary'
          className='px-8 py-6'
        >
          {t('createMenuConfig')}
        </Button>
      }
    >
      <CustomTable
        columns={tableColumns}
        loading={loading}
        onChangePageSize={(val: any) => setFilter(val)}
        {...listDashboard}
      />
    </PageContainer>
  )
}

export default ListConfigDashboard
