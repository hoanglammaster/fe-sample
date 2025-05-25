import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { UAA_CHILDREN_PATH } from '@/routes'
import { Button, Typography } from '@mui/material'
import ActionFilter from './ActionFilter'
import useActionManagement from './useActionManagement'

const ActionManagement = () => {
  const [values, handles] = useActionManagement()
  const {
    t,
    formAction,
    columns,
    router,
    listAction,
    filterAction,
    loadingListAction,
  } = values
  const { setFilterAction, onSubmit } = handles
  return (
    <PageContainer
      title={
        <div className='flex items-center'>
          <Typography variant='h1' className='mr-10'>
            {t('title.title')}
          </Typography>
          <Button
            variant='outlined'
            size='medium'
            onClick={() =>
              router.push(`${UAA_CHILDREN_PATH.ACTION_MANAGEMENT}/create`)
            }
          >
            {t('common:btn.addNew')}
          </Button>
        </div>
      }
    >
      <ActionFilter form={formAction} onSubmit={onSubmit} />
      <div>
        <CustomTable
          columns={columns}
          data={
            listAction?.content.map((v) => ({ ...v, sequence: v?.index })) ?? []
          }
          onChangePageSize={(val) =>
            setFilterAction({ ...filterAction, ...val })
          }
          {...listAction}
          {...filterAction}
          paginationHidden={(listAction?.content ?? []).length < 1}
          isLoading={loadingListAction}
          isShowColumnStt
          onRowClick={(v) => {
            router.push(`${UAA_CHILDREN_PATH.ACTION_MANAGEMENT}/view/${v?.id}`)
          }}
        />
      </div>
    </PageContainer>
  )
}

export default ActionManagement
