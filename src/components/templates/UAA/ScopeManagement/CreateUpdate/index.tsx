import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import LoadingPage from '@/components/atoms/LoadingPage'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { REGEX } from '@/helper/regex'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { UAA_CHILDREN_PATH } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getListService } from '../../APIManangement/service'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import RoleTable from '../RoleTable'
import useCreateUpdateScope from './useCreateUpdateScope'

const CreateUpdateScope = () => {
  const {
    listFeature,
    methodForm,
    onSubmit,
    t,
    isCreate,
    searchApi,
    setSearchApi,
    isLoadingFeature,
    isView,
    // listService,
    // isLoadingService,
  } = useCreateUpdateScope()
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methodForm
  const listApi = watch('apiIds')
  const router = useRouter()
  const status = watch('status')

  const { showDialog } = useDialog()

  return (
    <PageContainer
      title={
        <Box>
          <BreadcrumbUaa />
          <Typography variant='h1' className='mt-10'>
            {t(isView ? 'title.view' : isCreate ? 'title.add' : 'title.update')}
          </Typography>
        </Box>
      }
    >
      <form onSubmit={onSubmit}>
        <div className='flex mt-12'>
          <div className=' w-full gap-10 grid grid-cols-2'>
            {/* <InfiniteScrollingDiv /> */}
            <CoreInput
              label={t('label.code')}
              control={control}
              name='code'
              required
              readOnly={isView || status === STATUS_UAA.PUBLISHED}
              inputProps={{ maxLength: 20 }}
              transform={{
                input: (e) => e,
                output: (e) => e.target.value.toUpperCase(),
              }}
              rules={{
                validate: {
                  isAlias: (v: any) =>
                    REGEX.CODE_CHARACTOR_NUMBER.test(v) ||
                    t('common:validation.isInvalid', {
                      label: t('label.code'),
                    }),
                },
              }}
            />
            <CoreInput
              label={t('label.name')}
              control={control}
              name='name'
              inputProps={{ maxLength: 50 }}
              required
              readOnly={isView}
              rules={{
                required: t('common:validation.requiredField'),
                validate: (v) =>
                  v.trim().length > 0 ||
                  t('common:validation.enter', { msg: t('label.name') }),
              }}
            />
          </div>
        </div>
        <Box className='mt-10'>
          <Typography sx={{ fontWeight: 700 }}>List of API</Typography>
        </Box>
        {!isView && (
          <Box className='w-full mt-5'>
            <Box className='grid grid-cols-2 gap-10'>
              <CoreAutoCompleteAPI
                name='service'
                control={control}
                label='Service'
                labelSearch='codeOrName'
                labelPath='code'
                labelPath2='name'
                valuePath='id'
                placeholder='Select Service'
                fetchDataFn={getListService}
                params={{ status: 'PUBLISHED' }}
                onChangeValue={(v) => {
                  setValue('serviceId', v?.id)
                }}
              />

              <CoreInput
                control={control}
                name='searchApi'
                label='API'
                placeholder='Search by API Code or Name'
                inputProps={{ maxLength: 255 }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <Image
                      src={require('@/assets/svg/iconSearch.svg')}
                      alt=''
                      height={15}
                      width={15}
                    />
                  ),
                }}
              />
            </Box>
          </Box>
        )}

        {isLoadingFeature ? (
          <div className='flex items-center h-100'>
            <LoadingPage />
          </div>
        ) : listFeature?.length > 0 ? (
          <RoleTable
            listFeature={listFeature}
            readOnly={isView}
            listCheckedId={listApi}
            setListCheckedId={(val: any) => setValue('apiIds', val)}
          />
        ) : (
          <Box className='w-full flex items-center justify-center my-10'>
            <Typography variant='body1'>{t('common:table.no_data')}</Typography>
          </Box>
        )}
        <Typography variant='body2' className='mt-10'>
          Status: {renderStatus(status)}
        </Typography>

        <div className='text-center mt-24'>
          {isView ? (
            watch('status') === STATUS_UAA.DRAFT && (
              <LoadingButton
                size='large'
                className='h-23'
                variant='outlined'
                // type='submit'
                onClick={() =>
                  showDialog(<PublishDialog onSubmit={onSubmit} t={t} />)
                }
                loading={isSubmitting}
              >
                Publish
              </LoadingButton>
            )
          ) : (
            <>
              <Button
                size='large'
                className='mr-15'
                variant='text'
                onClick={(e) => router.push(UAA_CHILDREN_PATH.SCOPE_MANAGEMENT)}
                disabled={isSubmitting}
              >
                {t('btn.cancel')}
              </Button>
              <LoadingButton
                size='large'
                type='submit'
                variant='contained'
                className='px-23 py-5'
                loading={isSubmitting}
              >
                {t('common:btn.save')}
              </LoadingButton>
            </>
          )}
        </div>
      </form>
    </PageContainer>
  )
}

export default CreateUpdateScope
