import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import CoreUploadBox from '@/components/atoms/CoreUploadBox'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { useUploadForm } from '@/config/zustand'
import { REGEX } from '@/helper/regex'
import useGetImage from '@/helper/useGetImage'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { LoadingButton } from '@mui/lab'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PublishDialog } from '../Dialog/PublishDialog'
import { useSystemForm } from './useSystemForm'

export const SYSTEM_TYPE = [
  {
    value: 'CLIENT',
    label: 'Client',
  },
  {
    value: 'CORE',
    label: 'Core',
  },
  {
    value: 'PARTNER',
    label: 'Partner',
  },
]

export const AddNewSystemManagement = () => {
  const [methods, handle] = useSystemForm()
  const {
    control,
    watch,
    setValue,
    loading,
    t,
    formState: { isDirty, isSubmitting },
    isView,
  } = methods

  const { onSubmit } = handle
  const router = useRouter()
  const { hideDialog, showDialog } = useDialog()

  const { slug } = router.query
  const isEdit = !!slug && slug !== 'create'
  const status = watch('status')

  const imageSystem = watch('imageUrl')

  const { handleGetUrlImage, loadingImage, urlImage } = useGetImage()

  const { isUploading } = useUploadForm()

  useEffect(() => {
    imageSystem && handleGetUrlImage(imageSystem)
  }, [imageSystem])

  return (
    <PageContainer
      title={
        <Box>
          <BreadcrumbUaa />
          <Typography variant='h1' className='mt-10'>
            {isView
              ? t('title.view')
              : t(isEdit ? 'title.update' : 'title.add')}
          </Typography>
        </Box>
      }
    >
      <Box className='flex flex-col items-center justify-center'>
        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={onSubmit} className='w-full max-w-[800px]'>
            <Box className='grid grid-cols-2 gap-15 mb-15'>
              <CoreInput
                control={control}
                name={'code'}
                label={t('label.code')}
                readOnly={isView || status === STATUS_UAA.PUBLISHED}
                inputProps={{ maxLength: 20 }}
                rules={{
                  required: t('rules.required'),
                  validate: {
                    isAlias: (v: string) =>
                      REGEX.CODE.test(v) ||
                      t('common:validation.isInvalid', {
                        label: t('label.code'),
                      }),
                  },
                }}
                required={!isView}
              />
              <CoreInput
                control={control}
                name={'name'}
                label={t('label.name')}
                inputProps={{ maxLength: 255 }}
                inputType='single'
                readOnly={isView}
                rules={{
                  required: t('common:validation.requiredField'),
                  validate: (v: string) =>
                    v.trim().length > 0 ||
                    t('common:validation.enter', { msg: t('label.name') }),
                }}
                required={!isView}
              />
              <CoreInput
                control={control}
                name={'systemLink'}
                label={t('label.link')}
                inputProps={{ maxLength: 500 }}
                readOnly={isView}
                className='mb-10'
                required={!isView}
                inputType='single'
                rules={{
                  required: t('validate.pleaseEnterUrl'),
                  validate: (v: string) =>
                    REGEX.NO_SPACE.test(v) || t('validate.invalidUrl'),
                }}
              />
              <CoreAutocomplete
                control={control}
                name='accessChannels'
                label={t('label.accessChannel')}
                multiple
                readOnly={isView}
                required={!isView}
                options={[
                  {
                    value: 'MOBILE',
                    label: 'MOBILE',
                  },
                  {
                    value: 'WEB',
                    label: 'WEB',
                  },
                  {
                    value: 'USSD',
                    label: 'USSD',
                  },
                  {
                    value: 'API',
                    label: 'API',
                  },
                  {
                    value: 'WEBVIEW',
                    label: 'WEBVIEW',
                  },
                ]}
                rules={{
                  required: t('common:validation.enter', {
                    msg: t('label.accessChannel'),
                  }),
                }}
              />
            </Box>
            {isView ? (
              !watch('imageUrl') ? (
                <div className='mb-10'>
                  <Typography variant='h4' className='mb-3'>
                    {t('label.img')}
                  </Typography>
                  <Typography variant='body2'>{t('label.noImg')}</Typography>
                </div>
              ) : (
                <CoreUploadBox
                  isView
                  className='mb-10'
                  control={control}
                  name='imageUrl'
                  label='Image'
                />
              )
            ) : (
              <CoreUploadBox
                className='mb-10'
                control={control}
                name='imageUrl'
                label='Image'
              />
            )}

            <CoreInput
              control={control}
              name={'description'}
              label={t('label.description')}
              inputProps={{ maxLength: 255 }}
              inputType='multi'
              readOnly={isView}
            />
            <Typography variant='body2' className='mt-10'>
              Status: {renderStatus(status)}
            </Typography>
          </form>
        )}
        <Box className='my-10'>
          <Box className='flex justify-center gap-10 mt-10'>
            {isView ? (
              status === STATUS_UAA.DRAFT && (
                <>
                  <LoadingButton
                    variant='outlined'
                    type='submit'
                    onClick={() =>
                      showDialog(<PublishDialog onSubmit={onSubmit} t={t} />)
                    }
                    loading={isSubmitting}
                  >
                    Publish
                  </LoadingButton>
                </>
              )
            ) : (
              <>
                <Button
                  variant='text'
                  onClick={() => router.push('/uaa/system-management')}
                >
                  {t('btn.cancel')}
                </Button>
                <LoadingButton
                  color='primary'
                  variant='contained'
                  type='submit'
                  onClick={() => onSubmit()}
                  loading={isSubmitting || isUploading}
                  // disabled={!isDirty}
                >
                  {t('btn.save')}
                </LoadingButton>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </PageContainer>
  )
}
