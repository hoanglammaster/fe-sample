import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreInput from '@/components/atoms/CoreInput'
import LoadingPage from '@/components/atoms/LoadingPage'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { REGEX } from '@/helper/regex'
import { renderStatus } from '@/helper/utils'
import { UAA_CHILDREN_PATH } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import RoleTable from '../RoleTable'
import SelectSystem from './SelectSystem'
import useCreateUpdatePermissionConfig from './useCreateUpdatePermissionConfig'
import Image from 'next/image'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import { useDialog } from '@/components/hooks/dialog/useDialog'

const CreateUpdatePermissionConfig = () => {
  const {
    listFeature,
    methodForm,
    onSubmit,
    t,
    isCreate,
    isLoadingFeature,
    isView,
    showDialog,
    handleChangeStatus,
    hasFeatures,
    loadingPublish,
  } = useCreateUpdatePermissionConfig()
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methodForm
  const systemId = watch('systemId')
  const listApi = watch('featureActionRefs')
  const router = useRouter()
  const status = watch('status')
  return (
    <PageContainer
      title={
        <Box>
          <BreadcrumbUaa />
          <Typography variant='h1' className='mt-10'>
            {t(
              isView ? 'title.view' : !isCreate ? 'title.update' : 'title.add'
            )}
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
              readOnly={isView || status === 'PUBLISHED'}
              inputProps={{ maxLength: 20 }}
              transform={{
                output: (e) => {
                  const newValue = e.target.value ?? ''
                  return newValue.toUpperCase()
                },
              }}
              rules={{
                required: t('rules.required'),
                validate: {
                  trimRequired: (v: any) =>
                    v.trim().length > 0 ||
                    t('common:validation.enter', { msg: t('label.code') }),
                  isAlias: (v: any) =>
                    REGEX.CODE_STRING_NUMBER_ONLY_CUS.test(v) ||
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
                validate: {
                  trimRequired: (v: any) =>
                    v.trim().length > 0 ||
                    t('common:validation.enter', { msg: t('label.name') }),
                  // isName: (v: any) =>
                  //   REGEX.VIETNAMESE_AND_NUMBER.test(v) ||
                  //   t('validate.permissionName'),
                },
              }}
            />
            <SelectSystem
              label={t('label.system')}
              control={control}
              required={true}
              name='systemId'
              readOnly={isView || status === 'PUBLISHED'}
              rules={{ required: t('common:validation.required') }}
              returnValueType='enum'
              onChangeValue={() => setValue('featureActionRefs', [])}
            />
          </div>
        </div>
        {systemId && (
          <>
            <Box className='my-10'>
              <Typography variant='subtitle2'>List of Feature</Typography>
            </Box>
            {!isView && (
              <div className=' w-full gap-10 grid grid-cols-2'>
                {/* <TextField
              value={searchFeature}
              onChange={(e) => setSearchFeature(e.target.value)}
              variant='standard'
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
              className='w-full'
              inputProps={{ maxLength: 255 }}
              placeholder='Search by Feature Code or Name'
            /> */}
                <CoreInput
                  control={control}
                  name='searchFeature'
                  placeholder='Search by Feature Code or Name'
                  label=''
                  inputProps={{ maxLength: 255 }}
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
              </div>
            )}
          </>
        )}

        {isLoadingFeature ? (
          <div className='flex items-center h-100'>
            <LoadingPage />
          </div>
        ) : systemId && listFeature.length > 0 ? (
          <RoleTable
            listFeature={listFeature.map((v) => {
              return {
                ...v,
                name: `${v?.code ?? ''} - ${v?.name ?? ''}`,
              }
            })}
            readOnly={isView}
            listCheckedId={listApi}
            setListCheckedId={(val: any) => setValue('featureActionRefs', val)}
          />
        ) : (
          (systemId && hasFeatures) && (
            <Box className='w-full flex items-center justify-center my-10'>
              <Typography variant='body1'>
                {t('common:table.no_data')}
              </Typography>
            </Box>
          )
        )}
        <Typography variant='body2' className='mt-10'>
          Status: {renderStatus(status)}
        </Typography>
        {!isView && (
          <div className='text-center mt-24'>
            <Button
              size='large'
              className='mr-15'
              variant='text'
              onClick={(e) => router.push(UAA_CHILDREN_PATH.PERMISSION_CONFIG)}
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
          </div>
        )}
        {status === 'DRAFT' && isView && (
          <div className='mt-24 flex justify-center'>
            <LoadingButton
              variant='outlined'
              size='large'
              className='h-23'
              loading={loadingPublish}
              onClick={() =>
                showDialog(
                  <PublishDialog onSubmit={handleChangeStatus} t={t} />
                )
              }
            >
              {t('common:btn.publish')}
            </LoadingButton>
          </div>
        )}
      </form>
    </PageContainer>
  )
}

export default CreateUpdatePermissionConfig
