import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import LoadingPage from '@/components/atoms/LoadingPage'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { RED } from '@/helper/colors'
import { REGEX } from '@/helper/regex'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { TRANSLATE_UAA } from '@/routes'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { Controller, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import ClientCredentials from './clientCredentials'
import { useSaveClient } from './useSaveClient'
import WhitelistIP from './whitelistIP'
import CoreCheckbox from '@/components/atomsUpdate/CoreCheckbox'

export const listTypeClient = [
  {
    id: 'PARTNER',
    name: 'label.partner',
  },
  {
    id: 'INTERNAL',
    name: 'label.internal',
  },
  {
    id: 'EXTERNAL',
    name: 'label.external',
  },
]

export const SaveClient = () => {
  const {
    formClientContext,
    router,
    listPartner,
    listService,
    loadingPartner,
    loadingService,
    isView,
    isCreate,
    loadingPage,
    accessToken,
    refreshToken,
    handleSubmit,
    getSecretKey,
    handlePublishClient,
  } = useSaveClient()
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitting },
    register,
  } = formClientContext

  const { hideDialog, showDialog } = useDialog()
  const { t } = useTranslation(TRANSLATE_UAA.CLIENT)

  const status = watch('status')
  const clientType = watch('type')
  const authenticationType = watch('authenticationType')
  console.log('ưatchhh', watch())

  return (
    <PageContainer
      title={
        <Box>
          <BreadcrumbUaa />
          <Typography variant='h1' className='mt-10'>
            {isCreate
              ? t('title.add')
              : isView
              ? t('title.view')
              : t('title.edit')}
          </Typography>
        </Box>
      }
    >
      {loadingPage ? (
        <LoadingPage />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box className='w-full'>
            <FormProvider {...formClientContext}>
              <Grid
                container
                spacing={{ xs: 1, sm: 2, md: 3 }}
                className='pt-10'
              >
                <Grid item xs={6}>
                  <CoreAutocomplete
                    label={t('label.type')}
                    control={control}
                    name='type'
                    options={listTypeClient.map((v) => {
                      return { ...v, name: t(v.name) }
                    })}
                    readOnly={isView || status === 'LOCKED'}
                    returnValueType='enum'
                    valuePath='id'
                    labelPath='name'
                    required
                    onChangeValue={() => {
                      setValue('code', '')
                      setValue('name', '')
                      setValue('nameExternal', '')
                      setValue('codeExternal', '')
                      setValue('partnerCode', null)
                      setValue('service', null)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  {clientType === 'PARTNER' && (
                    <CoreAutocomplete
                      label={t('label.partner')}
                      control={control}
                      name='partnerCode'
                      loading={loadingPartner}
                      options={(listPartner ?? []).map((v) => ({
                        ...v,
                        partnerName: `${v?.partnerCode} - ${v?.partnerName}`,
                      }))}
                      readOnly={isView || status === 'LOCKED'}
                      returnValueType='enum'
                      valuePath='code'
                      labelPath='partnerName'
                      required
                      // onChangeValue={(v) => {
                      //   console.log(v, 'watchVal')
                      //   if (!!listPartner.find((v2) => v2.code === v)) {
                      //     setValue(
                      //       'code',
                      //       listPartner.find((v2) => v2.code === v)?.partnerCode
                      //     )
                      //     setValue(
                      //       'name',
                      //       listPartner.find((v2) => v2.code === v)?.partnerName
                      //     )
                      //   }
                      //   if (!v) {
                      //     setValue('code', '')
                      //     setValue('name', '')
                      //   }
                      // }}
                    />
                  )}
                  {clientType === 'INTERNAL' && (
                    <CoreAutocomplete
                      label={t('label.service')}
                      control={control}
                      name='service'
                      readOnly={isView || status === 'LOCKED'}
                      options={listService.map((v) => ({
                        ...v,
                        name: `${v?.code} - ${v?.name}`,
                      }))}
                      returnValueType='option'
                      valuePath='code'
                      labelPath='name'
                      loading={loadingService}
                      required
                      onChangeValue={(v) => {
                        setValue(
                          'name',
                          listService.find((v2) => v2?.id === v?.id)?.name
                        )
                        setValue('code', v?.code)
                        if (!v) {
                          setValue('code', '')
                          setValue('name', '')
                        }
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {clientType !== 'INTERNAL' ? (
                    <CoreInput
                      control={control}
                      name='codeExternal'
                      label={t('label.clientCode')}
                      required={!isView}
                      readOnly={status === 'LOCKED' || isView}
                      transform={{
                        input: (e) => e,
                        output: (e) => e.target.value.toUpperCase(),
                      }}
                      inputProps={{ maxLength: 20 }}
                      rules={{
                        validate: {
                          validate1: (v: string) =>
                            v.trim()?.length > 0 ||
                            t('common:validation.enter', {
                              msg: t('label.clientCode'),
                            }),
                          validate2: (v: string) =>
                            REGEX.ACCOUNT_NUMBER.test(v) ||
                            t('common:validation.isInvalid', {
                              label: t('label.clientCode'),
                            }),
                        },
                      }}
                    />
                  ) : (
                    <CoreInput
                      control={control}
                      name='code'
                      label={t('label.clientCode')}
                      placeholder={' --'}
                      readOnly={
                        !clientType ||
                        ['INTERNAL'].includes(clientType) ||
                        isView
                      }
                      transform={{
                        input: (e) => e,
                        output: (e) => e.target.value.toUpperCase(),
                      }}
                      inputProps={{ maxLength: 20 }}
                      showPlaceholder
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {clientType !== 'INTERNAL' ? (
                    <CoreInput
                      control={control}
                      name='nameExternal'
                      label={t('label.clientName')}
                      inputProps={{ maxLength: 255 }}
                      required={!isView}
                      readOnly={isView}
                      rules={{
                        validate: {
                          validate1: (v: string) =>
                            v.trim().length > 0 ||
                            t('common:validation.enter', {
                              msg: t('label.clientName'),
                            }),
                        },
                      }}
                    />
                  ) : (
                    <CoreInput
                      control={control}
                      name='name'
                      label={t('label.clientName')}
                      placeholder={' --'}
                      readOnly={
                        !clientType ||
                        ['INTERNAL'].includes(clientType) ||
                        isView
                      }
                      inputProps={{ maxLength: 255 }}
                      showPlaceholder
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  <CoreInput
                    control={control}
                    name='representative'
                    readOnly={isView}
                    required={!isView}
                    label={t('label.representative')}
                    inputProps={{ maxLength: 100 }}
                    rules={{
                      validate: (v: string) =>
                        v?.trim()?.length > 0 ||
                        t('common:validation.enter', {
                          msg: t('label.representative'),
                        }),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CoreInput
                    control={control}
                    name='email'
                    readOnly={isView}
                    required={!isView}
                    label={t('label.email')}
                    inputProps={{ maxLength: 50 }}
                    rules={{
                      validate: {
                        validate1: (v: string) =>
                          v.trim().length > 0 ||
                          t('common:validation.enter', {
                            msg: t('label.email'),
                          }),
                        validate2: (v: string) =>
                          REGEX.EMAIL.test(v) ||
                          t('common:validation.isInvalid', {
                            label: t('label.email'),
                          }),
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CoreInput
                    control={control}
                    className='w-full mb-15'
                    name='description'
                    multiline
                    readOnly={isView}
                    inputType='multi'
                    inputProps={{ maxLength: 255 }}
                    label={t('label.description')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 700 }}>
                    {t('label.authen')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='authenticationType'
                    rules={{
                      required: t('common:validation.select', {
                        msg: t('label.authenticationType'),
                      }),
                    }}
                    render={({
                      field: { onChange, value, onBlur, ref },
                      fieldState: { error },
                    }) => {
                      return (
                        <Box className='ml-10'>
                          <RadioGroup
                            ref={ref}
                            value={value}
                            onChange={(e: any) => {
                              if (!(isView || watch('status') === 'LOCKED')) {
                                onChange(e.target.value)
                                if (isCreate) {
                                  setValue('clientId', '')
                                  setValue('clientSecret', '')
                                } else {
                                  !watch('accessTokenValiditySeconds') &&
                                    setValue(
                                      'accessTokenValiditySeconds',
                                      accessToken
                                    )
                                  !watch('refreshTokenValiditySeconds') &&
                                    setValue(
                                      'refreshTokenValiditySeconds',
                                      refreshToken
                                    )
                                }
                              }
                            }}
                          >
                            <div>
                              <FormControlLabel
                                value='CLIENT_CREDENTIALS'
                                control={<Radio />}
                                label={t('label.clientCre')}
                              />
                            </div>
                            {authenticationType === 'CLIENT_CREDENTIALS' && (
                              <Grid item xs={12}>
                                <ClientCredentials
                                  methodForm={formClientContext}
                                  isView={isView}
                                  onSubmit={getSecretKey}
                                />
                              </Grid>
                            )}
                          </RadioGroup>
                          {error && (
                            <Typography sx={{ color: RED }} variant='body2'>
                              {error.message}
                            </Typography>
                          )}
                        </Box>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CoreCheckbox
                    control={control}
                    name='isUsingIP'
                    label={t('label.usingIpAddress')}
                    readOnly={isView || status === 'LOCKED'}
                    onChangeValue={(val) => {
                      setValue('ipAddresses', !!val ? [''] : [])
                    }}
                  />
                  {!!watch('isUsingIP') && (
                    <>
                      <Typography variant='body2' className='my-6 ml-10'>
                        {t('label.listIP')}
                      </Typography>
                      <WhitelistIP
                        isView={isView}
                        methodForm={formClientContext}
                      />
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    {t('common:status')}: {renderStatus(watch('status'))}
                  </Typography>
                </Grid>
                <Grid item xs={12} className='flex justify-center mt-10'>
                  {isView ? (
                    status === STATUS_UAA.DRAFT && (
                      <>
                        <LoadingButton
                          variant='outlined'
                          onClick={() =>
                            showDialog(
                              <PublishDialog
                                onSubmit={handlePublishClient}
                                t={t}
                              />
                            )
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
                        size='large'
                        variant='text'
                        disabled={isSubmitting}
                        style={{ marginRight: 20 }}
                        onClick={() => router.back()}
                      >
                        {t('common:btn.cancel')}
                      </Button>
                      <LoadingButton
                        size='large'
                        // className='h-23'
                        variant='contained'
                        type='submit'
                      >
                        {t('common:btn.save')}
                      </LoadingButton>
                    </>
                  )}
                </Grid>
              </Grid>
            </FormProvider>
          </Box>
        </form>
      )}
    </PageContainer>
  )
}
