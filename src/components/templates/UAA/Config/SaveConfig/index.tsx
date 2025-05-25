import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import LoadingPage from '@/components/atoms/LoadingPage'
import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useSaveConfig } from './useSaveConfig'
import { renderStatus } from '@/helper/utils'

export const SaveConfig = () => {
  const { t } = useTranslation('uaa/config')
  const [values, handles] = useSaveConfig()
  const {
    control,
    isUpdate,
    watch,
    register,
    isLoadingSubmit,
    isLoading,
    setValue,
    isView,
    data,
  } = values
  const { onSubmit, onCancel } = handles

  if (isLoading) return <LoadingPage />

  return (
    <div className='bg-[#f4f4f4] w-full flex flex-col p-15'>
      <CoreBreadcrumbs
        textCurrent={isView ? 'View detail' : isUpdate ? 'Edit' : ''}
        textPrev={t('title')}
        className='mb-16'
      />

      <div className='flex gap-10'>
        <Typography variant='h1'>
          {isView
            ? 'View Detail Config'
            : isUpdate
            ? 'Edit Config'
            : 'Add New Config'}
        </Typography>
      </div>

      <form
        className='block bg-[#ffffff] mt-15 rounded-xl py-25 px-60 min-h-[380px]'
        onSubmit={onSubmit}
      >
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='mb-12'>
          <Grid item xs={12} sm={12}>
            <Typography variant='h4'>Config group</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CoreInput
              control={control}
              name='configGroupName'
              disabled={isUpdate && !isView}
              label={t('configGroupName')}
              readOnly={isView}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CoreInput
              control={control}
              name='description'
              label={t('description')}
              readOnly={isView}
              disabled={isUpdate && !isView}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant='h4'>Config key</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='configKey'
              disabled={isUpdate && !isView}
              label={t('key')}
              readOnly={isView}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='configValue'
              rules={{
                required: t('common:validation.enter', { msg: 'value' }),
              }}
              label={t('value')}
              readOnly={isView}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='dataType'
              disabled={isUpdate && !isView}
              label={t('dataType')}
              readOnly={isView}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='defaultValue'
              disabled={isUpdate && !isView}
              label={t('defaultValue')}
              readOnly={isView}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CoreInput
              control={control}
              name='description'
              disabled={isUpdate && !isView}
              label={t('description')}
              readOnly={isView}
            />
          </Grid>
        </Grid>

        {!isView && (
          <div className='mt-12 space-x-12 text-center'>
            <ButtonCustom theme='cancel' onClick={onCancel}>
              {t('common:btn.cancel')}
            </ButtonCustom>
            <ButtonCustom
              theme='submit'
              type='submit'
              loading={isLoadingSubmit}
            >
              {t('common:btn.save')}
            </ButtonCustom>
          </div>
        )}
      </form>
    </div>
  )
}
