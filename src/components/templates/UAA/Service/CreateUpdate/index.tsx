import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreInput from '@/components/atoms/CoreInput'
import LoadingPage from '@/components/atoms/LoadingPage'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { REGEX } from '@/helper/regex'
import { STATUS_UAA } from '@/helper/utils'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import useCreateUpdateService from './useCreateUpdateService'

const CreateUpdateService = () => {
  const { t } = useTranslation(TRANSLATE_UAA.SERVICE)
  const {
    formServiceContext,
    handleSubmit,
    isCreate,
    loading,
    isView,
    handleChangeStatus,
  } = useCreateUpdateService()
  const {
    watch,
    control,
    formState: { isSubmitting },
  } = formServiceContext
  const router = useRouter()
  const status = watch('status')
  const { hideDialog, showDialog } = useDialog()

  return (
    <PageContainer
      title={
        <Box>
          <BreadcrumbUaa />
          <Typography variant='h1' className='mt-10'>
            {isView
              ? t('title.viewService')
              : t(!isCreate ? 'title.updateService' : 'title.addService')}
          </Typography>
        </Box>
      }
    >
      <Box className='flex items-center justify-center py-15'>
        {loading ? (
          <LoadingPage />
        ) : (
          <Box className='w-full max-w-screen-laptop'>
            <FormProvider {...formServiceContext}>
              <form onSubmit={handleSubmit}>
                <Box className='flex flex-wrap w-full mb-15 gap-15 tablet:flex-nowrap'>
                  <CoreInput
                    control={control}
                    name='code'
                    className='w-full'
                    label={t('form.serviceCode')}
                    required={!isView}
                    readOnly={isView || status === STATUS_UAA.PUBLISHED}
                    inputProps={{ maxLength: 20 }}
                    rules={{
                      validate: {
                        isAlias: (v: any) =>
                          REGEX.CODE.test(v) ||
                          t('common:validation.isInvalid', {
                            label: t('form.serviceCode'),
                          }),
                      },
                    }}
                  />
                  <CoreInput
                    control={control}
                    name='name'
                    className='w-full'
                    inputProps={{ maxLength: 255 }}
                    readOnly={isView}
                    // disabled={isView || status === STATUS_UAA.PUBLISHED}
                    label={t('form.serviceName')}
                    required={!isView}
                    rules={{
                      required: t('rules.required'),
                      validate: (v) =>
                        v.trim().length > 0 ||
                        t('common:validation.enter', {
                          msg: t('form.serviceName'),
                        }),
                    }}
                    inputType={isView ? 'multi' : 'single'}
                  />
                </Box>
                <CoreInput
                  control={control}
                  name='urlReference'
                  readOnly={isView}
                  label={t('form.urlRef')}
                  className='w-full mb-15'
                  inputProps={{ maxLength: 255 }}
                  required
                  rules={{
                    required: t('rules.required'),
                    validate: (v: any) =>
                      REGEX.NO_SPACE.test(v) || t('rules.url'),
                  }}
                  inputType='single'
                />
                <CoreInput
                  control={control}
                  readOnly={isView}
                  className='w-full mb-15'
                  name='description'
                  inputType={isView ? 'multi' : 'single'}
                  inputProps={{ maxLength: 255 }}
                  label={t('form.description')}
                  placeholder={''}
                />
                <Typography variant='body2'>
                  Status:{' '}
                  <span
                    style={{
                      color: status === 'DRAFT' ? '#F57322' : '#4DBC6C',
                    }}
                  >
                    {status === 'DRAFT' ? 'Draft' : 'Published'}
                  </span>
                </Typography>
                <Box className='flex justify-center'>
                  {isView ? (
                    status === STATUS_UAA.DRAFT && (
                      <>
                        <LoadingButton
                          size='large'
                          className='h-23'
                          variant='outlined'
                          loading={isSubmitting}
                          onClick={() =>
                            showDialog(
                              <PublishDialog
                                onSubmit={handleChangeStatus}
                                t={t}
                              />
                            )
                          }
                        >
                          Publish
                        </LoadingButton>
                      </>
                    )
                  ) : (
                    <>
                      <Button
                        size='large'
                        sx={{ marginRight: '20px' }}
                        variant='text'
                        onClick={(e) => router.push(UAA_CHILDREN_PATH.SERVICE)}
                        disabled={isSubmitting}
                      >
                        {t('form.cancel')}
                      </Button>
                      <LoadingButton
                        size='large'
                        variant='contained'
                        type='submit'
                        loading={isSubmitting}
                      >
                        {t('form.save')}
                      </LoadingButton>
                    </>
                  )}
                </Box>
              </form>
            </FormProvider>
          </Box>
        )}
      </Box>
    </PageContainer>
  )
}

export default CreateUpdateService
