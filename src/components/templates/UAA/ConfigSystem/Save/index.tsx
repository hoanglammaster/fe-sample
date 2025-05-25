import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Grid, Typography } from '@mui/material'
import { useSaveConfig } from './useSaveConfig'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import LoadingPage from '@/components/atoms/LoadingPage'
import { REGEX } from '@/helper/regex'

export const SaveConfig = () => {
  const [values, handles] = useSaveConfig()
  const { control, isLoadingSubmit, t, isView, isLoading, watch } = values
  const { onCancel, onSubmit } = handles

  return (
    <div className='bg-[#f4f4f4] w-full flex flex-col p-15'>
      <CoreBreadcrumbs
        textCurrent={isView ? t('common:btn.viewDetail') : t('common:btn.edit')}
        textPrev={t('title')}
        className='mb-16'
      />

      <div className='flex gap-10'>
        <Typography variant='h1'>
          {isView ? t('viewConfig') : t('editConfig')}
        </Typography>
      </div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className='bg-[#ffffff] mt-15 rounded-xl py-20 px-32'>
          <form onSubmit={onSubmit}>
            {/* <div className='flex flex-col gap-15'>
            <Typography variant='h4'>{t('text.configGroup')}</Typography>
            <CoreInput
              control={control}
              name='configGroupName'
              label={t('name')}
              disabled={!isView}
              readOnly={isView}
            />
            <CoreInput
              control={control}
              name='description'
              label={t('description')}
              disabled={!isView}
              readOnly={isView}
            />
          </div> */}
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreInput
                  control={control}
                  name='groupResponse.groupName'
                  label={t('text.configGroup')}
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreInput
                  control={control}
                  name='configKey'
                  label={t('key')}
                  readOnly
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreInput
                  control={control}
                  name='dataType'
                  label={t('datatype')}
                  readOnly
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreInput
                  control={control}
                  name='defaultValue'
                  label={t('defaultValue')}
                  readOnly
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreInput
                  control={control}
                  name='configValue'
                  label={t('value')}
                  // type={watch('dataType') === 'INTEGER' ? 'number' : undefined}
                  readOnly={isView}
                  required={!isView}
                  transform={{
                    input: (val: any) => {
                      if (watch('dataType') === 'INTEGER') {
                        return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      } else {
                        return val
                      }
                    },
                    output: (val: any) => {
                      const stringVal = val.target.value
                      if (watch('dataType')?.toUpperCase() === 'BOOLEAN') {
                        return stringVal
                      } else if (
                        watch('dataType')?.toUpperCase() === 'INTEGER'
                      ) {
                        return stringVal
                          ? stringVal?.replace(/\D/g, '').replace(/^0+/, '')
                          : val
                      } else {
                        return stringVal ?? val
                      }
                    },
                  }}
                  inputProps={{
                    maxLength: watch('dataType') === 'INTEGER' ? 12 : 255,
                  }}
                  rules={
                    watch('dataType')?.toUpperCase() === 'BOOLEAN'
                      ? {
                          validate: (v: string) =>
                            REGEX.BOOLEAN.test(v) ||
                            t('common:validation.isInvalid', {
                              label: t('value'),
                            }),
                        }
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CoreInput
                  control={control}
                  name='description'
                  multiline
                  label={t('description')}
                  readOnly
                />
              </Grid>
            </Grid>
            {!isView && (
              <div className='mt-16 space-x-12 text-center'>
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
      )}
    </div>
  )
}
