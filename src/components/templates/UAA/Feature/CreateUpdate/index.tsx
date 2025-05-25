import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import LoadingPage from '@/components/atoms/LoadingPage'
import CoreInput from '@/components/atomsUpdate/CoreInput'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { REGEX } from '@/helper/regex'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import useCreateUpdateFeature from './useCreateUpdateFeature'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getListApis } from '../List/service'
import { useEffect, useState } from 'react'
import { BLUE } from '@/helper/colors'
import SubMenuDetailDialog from './SubMenuDetailDialog'

export const ACCESS_CHANNEL_OPTION = [
  {
    id: 'USSD',
    name: 'USSD',
  },
  {
    id: 'WEB',
    name: 'WEB',
  },
  {
    id: 'API',
    name: 'API',
  },
  {
    id: 'MOBILE',
    name: 'MOBILE',
  },
  {
    id: 'WEBVIEW',
    name: 'WEB VIEW',
  },
]

const CreateUpdateFeature = () => {
  const {
    formFeatureContext,
    handleSubmit,
    isCreate,
    loading,
    loadingUpdate,
    listService,
    isView,
    listTransType,
    listServiceTrans,
    listPartner,
    showDialog,
    getPartnerInfoDetail,
    slug,
    listSystem,
    loadingSystem,
    listMicroService,
    loadingMicroService,
    listSubPartner,
    loadingSubPartner,
    listSubMenu,
    loadingSubMenu,
  } = useCreateUpdateFeature()
  const router = useRouter()
  const { t } = useTranslation(TRANSLATE_UAA.FEATURE)
  const [optionAccess, setOptionAccess] = useState<any[]>([])
  const [subMenuId, setSubMenuId] = useState<number | null>(null)

  const {
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = formFeatureContext

  const status = watch('status')

  const serviceCode = watch('serviceCode')

  const optionChannelAccess =
    listSystem?.content?.find((v) => v.id === watch('systemId'))
      ?.accessChannels ?? []

  return (
    <PageContainer
      title={
        <Box>
          <BreadcrumbUaa />
          <Typography variant='h1' className='mt-10'>
            {isView
              ? t('title.viewFeature')
              : t(!isCreate ? 'title.updateFeature' : 'title.addFeature')}
          </Typography>
        </Box>
      }
    >
      <Box className='flex items-center justify-center py-15'>
        {loading ? (
          <LoadingPage />
        ) : (
          <Box className='w-full max-w-screen-laptop'>
            <FormProvider {...formFeatureContext}>
              <form onSubmit={handleSubmit}>
                <Box className='w-full grid grid-cols-2 mb-15 gap-15 sm:flex sm:flex-nowrap'>
                  <CoreAutocomplete
                    label={t('form.type')}
                    control={control}
                    name='type'
                    required={!isView}
                    disableClearable
                    options={[
                      {
                        id: 'NORMAL',
                        name: 'Normal',
                      },
                      {
                        id: 'PARTNER',
                        name: 'Partner Service',
                      },
                    ]}
                    returnValueType='enum'
                    valuePath='id'
                    labelPath='name'
                    readOnly={isView || status === STATUS_UAA.PUBLISHED}
                    // disabled={status === STATUS_UAA.PUBLISHED}
                    onChangeValue={(v) => {
                      setValue('transTypeCode', null)
                      setValue('codeNormal', '')
                      setValue('nameNormal', '')
                      setValue('code', '')
                      setValue('name', '')
                      setValue('serviceCode', null)
                      setValue('partnerCode', null)
                      setValue('isIntermediary', false)
                      setValue('subPartnerCode', null)
                      setValue('partnerId', null)
                    }}
                  />
                  <CoreAutocomplete
                    label={t('form.system')}
                    control={control}
                    name='systemId'
                    required={!isView}
                    loading={loadingSystem}
                    options={
                      listSystem?.content?.map((v) => {
                        return { ...v, name: `${v?.code} - ${v?.name}` }
                      }) ?? []
                    }
                    returnValueType='enum'
                    valuePath='id'
                    onChangeValue={(v) => {
                      setValue('accessChannel', null)
                      setValue('subMenuId', null)
                      setValue('microServiceId', null)
                      setValue('apis', [])
                    }}
                    labelPath='name'
                    readOnly={isView || status === STATUS_UAA.PUBLISHED}
                  />
                  {watch('type') === 'PARTNER' && (
                    <>
                      <CoreAutocomplete
                        label={t('form.transType')}
                        control={control}
                        name='transTypeCode'
                        options={(listTransType ?? []).map((v) => ({
                          ...v,
                          transTypeName: `${v?.transTypeCode} - ${v?.transTypeName}`,
                        }))}
                        returnValueType='enum'
                        valuePath='transTypeCode'
                        readOnly={isView || status === STATUS_UAA.PUBLISHED}
                        labelPath='transTypeName'
                        required={!isView}
                        onChangeValue={() => {
                          setValue('serviceCode', null)
                          setValue('codeNormal', '')
                          setValue('nameNormal', '')
                          setValue('code', '')
                          setValue('name', '')
                          setValue('partnerCode', null)
                          setValue('isIntermediary', false)
                        }}
                      />
                      <CoreAutocomplete
                        label={t('form.service')}
                        control={control}
                        name='serviceCode'
                        options={(listServiceTrans ?? []).map((v) => {
                          return {
                            ...v,
                            name: `${v?.serviceCode} - ${v?.serviceName}`,
                          }
                        })}
                        returnValueType='enum'
                        valuePath='serviceCode'
                        readOnly={isView || status === STATUS_UAA.PUBLISHED}
                        disabled={!watch('transTypeCode')}
                        labelPath='name'
                        required={!isView}
                        onChangeValue={(v) => {
                          setValue(
                            'serviceId',
                            listServiceTrans.find((v2) => v2.serviceCode === v)
                              ?.id ?? null
                          )
                          setValue('partnerCode', null)
                          setValue('code', '')
                          setValue('name', '')
                          setValue('partnerId', null)
                          setValue('isIntermediary', false)
                          setValue('subPartnerCode', null)
                        }}
                      />
                      <CoreAutocomplete
                        label={t('form.partner')}
                        control={control}
                        name='partnerCode'
                        options={listPartner?.map((v) => {
                          return {
                            ...v,
                            name: `${v?.roleTypeCode}.${v?.partnerCode} - ${v?.partnerName}`,
                          }
                        })}
                        returnValueType='enum'
                        valuePath='partnerCode'
                        readOnly={isView || status === STATUS_UAA.PUBLISHED}
                        disabled={!watch('serviceCode')}
                        labelPath='name'
                        required={!isView}
                        onChangeValue={(val) => {
                          if (!val) {
                            setValue('code', '')
                            setValue('name', '')
                          }
                          const chosenPartner = listPartner.find(
                            (v) => v.partnerCode === val
                          )
                          const newData = chosenPartner?.services?.[0]

                          if (!!newData) {
                            setValue('code', newData?.partnerServiceCode)
                            const newName =
                              listServiceTrans.find(
                                (v2) => v2.serviceCode === serviceCode
                              )?.serviceName +
                              '.' +
                              chosenPartner?.partnerName
                            setValue('name', newName)
                          }

                          const partnerId = chosenPartner?.partnerId
                          const isShowSubPartner = chosenPartner?.isIntermediary
                          setValue('partnerId', partnerId ?? null)
                          setValue('isIntermediary', isShowSubPartner ?? false)
                          setValue('subPartnerCode', null)
                        }}
                      />
                      {!!watch('isIntermediary') && (
                        <CoreAutocomplete
                          label={t('form.subPartner')}
                          control={control}
                          name='subPartnerCode'
                          loading={loadingSubPartner}
                          options={
                            listSubPartner?.data?.map((v) => {
                              return {
                                ...v,
                                name: `${v?.roleTypeCode}.${v?.partnerCode} - ${v?.partnerName}`,
                              }
                            }) ?? []
                          }
                          returnValueType='enum'
                          valuePath='partnerCode'
                          readOnly={isView || status === STATUS_UAA.PUBLISHED}
                          labelPath='name'
                          required={!isView}
                        />
                      )}
                    </>
                  )}
                  {watch('type') === 'NORMAL' ? (
                    <CoreInput
                      control={control}
                      name='codeNormal'
                      className='w-full'
                      readOnly={
                        isView ||
                        status === STATUS_UAA.PUBLISHED ||
                        watch('type') === 'PARTNER'
                      }
                      label={t('form.featureCode')}
                      inputProps={{ maxLength: 255 }}
                      required={watch('type') === 'NORMAL' && !isView}
                      rules={{
                        validate: {
                          validate1: (v: string) =>
                            v.trim().length > 0 ||
                            t('common:validation.enter', {
                              msg: t('form.featureCode'),
                            }),
                          validate2: (v: string) =>
                            REGEX.CODE.test(v.trim()) ||
                            t('common:validation.isInvalid', {
                              label: t('form.featureCode'),
                            }),
                        },
                      }}
                    />
                  ) : (
                    <CoreInput
                      control={control}
                      name='code'
                      className='w-full'
                      readOnly={
                        isView ||
                        status === STATUS_UAA.PUBLISHED ||
                        watch('type') === 'PARTNER'
                      }
                      label={t('form.featureCode')}
                      inputProps={{ maxLength: 255 }}
                      showDashPlaceholder
                    />
                  )}

                  {watch('type') === 'NORMAL' ? (
                    <CoreInput
                      control={control}
                      name='nameNormal'
                      className='w-full'
                      label={t('form.featureName')}
                      readOnly={
                        isView ||
                        status === STATUS_UAA.PUBLISHED ||
                        watch('type') === 'PARTNER'
                      }
                      inputProps={{ maxLength: 255 }}
                      required={watch('type') === 'NORMAL' && !isView}
                      rules={{
                        validate: {
                          trimRequired: (v: any) =>
                            v.trim().length > 0 ||
                            t('common:validation.enter', {
                              msg: t('form.featureName'),
                            }),
                        },
                      }}
                    />
                  ) : (
                    <CoreInput
                      control={control}
                      name='name'
                      className='w-full'
                      label={t('form.featureName')}
                      readOnly={
                        isView ||
                        status === STATUS_UAA.PUBLISHED ||
                        watch('type') === 'PARTNER'
                      }
                      inputProps={{ maxLength: 255 }}
                      showDashPlaceholder
                    />
                  )}
                  <CoreAutocomplete
                    className='w-full'
                    label={t('form.accessChannel')}
                    control={control}
                    name='accessChannel'
                    options={optionChannelAccess.map((v) => {
                      return { id: v, name: v }
                    })}
                    required
                    readOnly={isView || status === STATUS_UAA.PUBLISHED}
                    valuePath='id'
                    labelPath='name'
                    returnValueType='enum'
                    onChangeValue={() => {
                      setValue('microServiceId', null)
                      setValue('subMenuId', null)
                      setValue('apis', [])
                    }}
                  />
                  {!!watch('accessChannel') && (
                    <>
                      <CoreAutocomplete
                        className='w-full'
                        label={t('form.microService')}
                        control={control}
                        name='microServiceId'
                        loading={loadingMicroService}
                        readOnly={isView || status === STATUS_UAA.PUBLISHED}
                        options={
                          listMicroService?.data?.content?.map((v) => {
                            return { ...v, name: `${v?.code} - ${v?.name}` }
                          }) ?? []
                        }
                        valuePath='id'
                        labelPath='name'
                        returnValueType='enum'
                        onChangeValue={() => setValue('apis', [])}
                        required
                      />
                      <CoreAutoCompleteAPI
                        control={control}
                        name='apis'
                        label={t('form.menuApi')}
                        labelSearch='codeOrName'
                        fetchDataFn={getListApis}
                        readOnly={isView || status === STATUS_UAA.PUBLISHED}
                        disabled={!watch('microServiceId')}
                        params={{
                          status: 'PUBLISHED',
                          type:
                            watch('accessChannel') === 'WEB'
                              ? 'MENU'
                              : 'NORMAL',
                          serviceId: watch('microServiceId'),
                        }}
                        multiple
                        labelPath='code'
                        labelPath2='name'
                        valuePath='id'
                        required
                        rules={{
                          required: t('common:validation.select', {
                            msg: t('form.menuApi'),
                          }),
                        }}
                      />
                    </>
                  )}
                  {watch('accessChannel') === 'WEB' && (
                    <>
                      <CoreAutocomplete
                        className='w-full'
                        label={t('form.subMenu')}
                        control={control}
                        name='subMenuId'
                        options={listSubMenu?.content ?? []}
                        readOnly={isView || status === STATUS_UAA.PUBLISHED}
                        valuePath='id'
                        labelPath='name'
                        returnValueType='enum'
                        required
                      />
                      {!!watch('subMenuId') && (
                        <Box>
                          <Typography
                            variant='body2'
                            sx={{
                              color: BLUE,
                              textDecoration: 'underline',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              !!watch('subMenuId') &&
                                setSubMenuId(watch('subMenuId') ?? null)
                            }}
                          >
                            {t('label.viewAction')}
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
                <CoreInput
                  control={control}
                  className='w-full mb-15'
                  name='description'
                  // multiline
                  inputType='multi'
                  readOnly={isView}
                  inputProps={{ maxLength: 255 }}
                  label={t('form.description')}
                />
                {/* <ApiList
                  listService={listService}
                  disabled={
                    isView
                    // || status === STATUS_UAA.PUBLISHED
                  }
                  featureId={slug}
                /> */}
                <Typography variant='body2'>
                  Status: {renderStatus(watch('status'))}
                </Typography>
                <Box className='flex justify-center mt-10'>
                  {isView ? (
                    status === STATUS_UAA.DRAFT && (
                      <>
                        <LoadingButton
                          size='large'
                          className='h-23'
                          variant='outlined'
                          onClick={() =>
                            showDialog(
                              <PublishDialog onSubmit={handleSubmit} t={t} />
                            )
                          }
                          loading={isSubmitting || loadingUpdate}
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
                        onClick={(e) => router.push(UAA_CHILDREN_PATH.FEATURE)}
                      >
                        {t('form.cancel')}
                      </Button>
                      <LoadingButton
                        size='large'
                        // className='h-23'
                        variant='contained'
                        type='submit'
                        loading={isSubmitting || loadingUpdate}
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
        {!!subMenuId && (
          <SubMenuDetailDialog
            open={!!subMenuId}
            onClose={() => setSubMenuId(null)}
            id={subMenuId}
          />
        )}
      </Box>
    </PageContainer>
  )
}

export default CreateUpdateFeature
