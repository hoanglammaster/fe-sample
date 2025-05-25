import { useRouter } from 'next/router'
import { useClientList } from './useClientList'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { CustomTable } from '@/components/organism/TableCustom'
import CoreInput from '@/components/atoms/CoreInput'
import { LoadingButton } from '@mui/lab'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { listTypeClient } from '../Save'
import { useTranslation } from 'react-i18next'

export const ListClient = () => {
  const {
    filter,
    listClient,
    loading,
    methodForm: { control },
    onSubmit,
    setFilter,
    columns,
    loadingClient,
  } = useClientList()

  const router = useRouter()
  const { hideDialog, showDialog } = useDialog()

  const { t } = useTranslation(TRANSLATE_UAA.CLIENT)

  return (
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography className='mr-10' variant='h1'>
            {t('title.list')}
          </Typography>
          <Link
            href={`${UAA_CHILDREN_PATH.CLIENT_MANAGEMENT}/create`}
            className='no-underline'
          >
            <Button variant='outlined' size='medium'>
              {t('common:btn.addNew')}
            </Button>
          </Link>
        </Box>
      }
    >
      <form onSubmit={onSubmit}>
        <Box>
          <Typography variant='h3' className='mb-10'>
            {t('common:searchByFilter')}
          </Typography>
          <Box className='grid grid-cols-2 gap-10 w-fulL mb-10'>
            <CoreInput
              control={control}
              className='w-full'
              name='codeOrName'
              label='Search'
              inputProps={{ maxLength: 255 }}
              placeholder='Search by Client Code or Name'
            />
            <CoreAutocomplete
              control={control}
              className='w-full'
              name='type'
              label='Type'
              options={listTypeClient
                .map((v) => {
                  return { ...v, name: t(v.name) }
                })
                .concat({
                  id: '',
                  name: 'All',
                })}
              placeholder='Type'
              labelPath='name'
              valuePath='id'
            />
          </Box>
          <Box className='flex w-full justify-center'>
            <LoadingButton
              variant='contained'
              color='primary'
              className='mb-10'
              type='submit'
              loading={loading}
            >
              Search
            </LoadingButton>
          </Box>
        </Box>
      </form>
      <CustomTable
        columns={columns}
        {...listClient}
        data={listClient?.content ?? []}
        {...filter}
        loading={loading}
        onChangePageSize={(val: any) => setFilter(val)}
        isShowColumnStt
        isLoading={loading || loadingClient}
        paginationHidden={listClient?.content.length < 1}
        onRowClick={(row: any) => {
          router.push(`${UAA_CHILDREN_PATH.CLIENT_MANAGEMENT}/view/${row?.id}`)
        }}
      />
    </PageContainer>
  )
}
