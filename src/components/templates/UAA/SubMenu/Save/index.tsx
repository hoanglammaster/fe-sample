import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import CoreUploadBox from '@/components/atoms/CoreUploadBox'
import LoadingPage from '@/components/atoms/LoadingPage'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { REGEX } from '@/helper/regex'
import { STATUS_UAA, renderStatus, showCodeNameOption } from '@/helper/utils'
import { TRANSLATE_UAA } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Grid, Typography } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DialogChangeStatusSubMenu } from '../Dialog/PublishDialog'
import { getListApi, getListService, getListSystem } from '../service'
import DynamicActionCustom from './DynamicActionCustom'
import NormalApi from './NormalApi'
import { useSaveSubMenu } from './useSaveSubMenu'

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

export interface SaveSubMenuProps {
  viewId?: number
}

export const SaveSubMenu = (props: SaveSubMenuProps) => {
  const {
    methodForm,
    onSubmit,
    router,
    id,
    isView,
    isCreate,
    isUpdate,
    listAction,
    isLoadingAction,
    detailSubMenu,
    isLoadingDetailSubMenu,
    loadingSaveSubMenu,
    isUploading,
    fields,
    append,
    remove,
    appendNormal,
    fieldsNormal,
    removeNormal,
    itemType,
  } = useSaveSubMenu(props)

  const { viewId } = props

  const { control, watch, setValue, clearErrors } = methodForm

  const status = watch('status')

  const { showDialog } = useDialog()

  const { t } = useTranslation(TRANSLATE_UAA.SUB_MENU_MANAGEMENT)

  const renderForm = () => {
    return (
      <>
        {isLoadingDetailSubMenu ? (
          <LoadingPage />
        ) : (
          <form onSubmit={onSubmit}>
            <Box className='w-full'>
              <FormProvider {...methodForm}>
                <Grid
                  container
                  spacing={{ xs: 1, sm: 2, md: 3 }}
                  className='pt-10'
                >
                  <Grid item xs={6}>
                    <CoreAutoCompleteAPI
                      control={control}
                      name='systemId'
                      label={t('label.system')}
                      labelSearch='codeOrName'
                      fetchDataFn={getListSystem}
                      placeholder='Select System'
                      params={{ status: STATUS_UAA.PUBLISHED }}
                      labelPath='code'
                      labelPath2='name'
                      valuePath='id'
                      required={!isView}
                      readOnly={
                        isView || detailSubMenu?.status === STATUS_UAA.PUBLISHED
                      }
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CoreInput
                      control={control}
                      name='name'
                      label={t('label.subMenuName')}
                      required={!isView}
                      readOnly={isView}
                      rules={{
                        validate: (v: string) =>
                          v?.trim()?.length > 0 ||
                          t('common:validation.enter', {
                            msg: t('label.subMenuName'),
                          }),
                      }}
                      inputProps={{
                        maxLength: 255,
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CoreAutocomplete
                      control={control}
                      className='w-full'
                      name='type'
                      label={t('label.subMenuType')}
                      options={[
                        { label: 'Item', value: 'ITEM' },
                        { label: 'Collapse', value: 'COLLAPSE' },
                      ]}
                      labelPath='label'
                      valuePath='value'
                      required={!isView}
                      disableClearable
                      readOnly={
                        isView || detailSubMenu?.status === STATUS_UAA.PUBLISHED
                      }
                      onChangeValue={(v) => {
                        methodForm.clearErrors('serviceId')
                        methodForm.clearErrors('serviceCollapseId')
                        setValue('serviceId', null)
                        setValue('serviceCollapseId', null)
                        clearErrors('apiId')
                        setValue('apiId', null)
                        setValue('actionSubMenuRefs', [])
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    {itemType ? (
                      <CoreAutoCompleteAPI
                        control={control}
                        name='serviceId'
                        label={t('label.service')}
                        labelSearch='codeOrName'
                        fetchDataFn={getListService}
                        placeholder='Select Service'
                        params={{ status: STATUS_UAA.PUBLISHED }}
                        labelPath='code'
                        labelPath2='name'
                        valuePath='id'
                        required
                        onChangeValue={() => {
                          setValue('apiId', null)
                          clearErrors('apiId')
                        }}
                        readOnly={isView}
                      />
                    ) : (
                      <CoreAutoCompleteAPI
                        control={control}
                        name='serviceCollapseId'
                        label={t('label.service')}
                        labelSearch='codeOrName'
                        fetchDataFn={getListService}
                        placeholder='Select Service'
                        params={{ status: STATUS_UAA.PUBLISHED }}
                        labelPath='code'
                        labelPath2='name'
                        valuePath='id'
                        onChangeValue={() => {
                          setValue('apiId', null)
                        }}
                        readOnly={isView}
                      />
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <CoreAutoCompleteAPI
                      control={control}
                      name='apiId'
                      label={t('label.menuApi')}
                      labelSearch='codeOrName'
                      fetchDataFn={getListApi}
                      placeholder='Select Menu API'
                      params={{
                        status: STATUS_UAA.PUBLISHED,
                        serviceId: itemType
                          ? watch('serviceId')?.id
                          : watch('serviceCollapseId')?.id,
                        type: 'MENU',
                      }}
                      disabled={
                        isView
                          ? false
                          : itemType
                          ? !watch('serviceId')
                          : !watch('serviceCollapseId')
                      }
                      labelPath='code'
                      labelPath2='name'
                      valuePath='id'
                      disableDefaultRequired
                      rules={{
                        validate: (v: any) =>
                          watch('type') !== 'ITEM'
                            ? true
                            : !!v ||
                              t('common:validation.enter', {
                                msg: t('label.menuApi'),
                              }),
                      }}
                      required={
                        watch('type') === 'ITEM' && !isView ? true : false
                      }
                      readOnly={isView}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CoreInput
                      control={control}
                      name='route'
                      label={t('label.route')}
                      required={!isView}
                      readOnly={isView}
                      rules={{
                        validate: (v: any) =>
                          REGEX.NO_SPACE.test(v) ||
                          t('common:validation.isInvalid', {
                            label: t('label.route'),
                          }),
                      }}
                      inputProps={{
                        maxLength: 255,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CoreInput
                      control={control}
                      name='description'
                      label={t('label.description')}
                      readOnly={isView}
                      inputProps={{
                        maxLength: 255,
                      }}
                      inputType='multi'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CoreUploadBox
                      className='mb-10'
                      control={control}
                      name='iconUrl'
                      label='Icon'
                      isView={isView}
                    />
                  </Grid>

                  {fields?.length <= 0 && !isView && watch('type') === 'ITEM' && (
                    <Grid item xs={12}>
                      <Button
                        className='mb-10'
                        variant='outlined'
                        size='medium'
                        onClick={() =>
                          setValue('actionSubMenuRefs', [
                            {
                              apiId: null,
                              actionId: null,
                            },
                          ])
                        }
                      >
                        Add Action
                      </Button>
                    </Grid>
                  )}
                  {fields?.length > 0 && (
                    <Grid item xs={12}>
                      <Typography
                        style={{
                          fontWeight: 500,
                          fontSize: 18,
                        }}
                      >
                        {t('label.listActionOfSubMenu')}
                      </Typography>
                    </Grid>
                  )}
                  {fields.map((field, index) => {
                    const optionActionHandle = listAction
                      ?.filter(
                        (v: any) =>
                          !watch('actionSubMenuRefs')?.some(
                            (v2: any, idx: number) =>
                              v2?.actionId === v?.id && index !== idx
                          )
                      )
                      .sort((a: any, b: any) => b.index - a.index)
                    return (
                      <Grid
                        item
                        container
                        spacing={4}
                        style={{ paddingLeft: 0, paddingTop: 0 }}
                        className='flex items-start'
                        key={field?.key}
                      >
                        <Grid item xs={isView ? 12 : 11}>
                          <Box className='grid grid-cols-2 gap-15'>
                            <CoreAutocomplete
                              label='Action'
                              control={control}
                              name={`actionSubMenuRefs.${index}.actionId`}
                              readOnly={
                                (detailSubMenu?.actionSubMenuRefResponses
                                  ?.length >=
                                  index + 1 &&
                                  isUpdate &&
                                  status === STATUS_UAA.PUBLISHED) ||
                                isView
                              }
                              options={optionActionHandle?.map((item: any) => ({
                                ...item,
                                name: showCodeNameOption(
                                  item?.code,
                                  item?.name
                                ),
                              }))}
                              disableFilter
                              required={!isView}
                              valuePath='id'
                              labelPath='name'
                              loading={isLoadingAction}
                            />
                            <CoreAutoCompleteAPI
                              control={control}
                              name={`actionSubMenuRefs.${index}.api`}
                              label={t('label.api')}
                              fetchDataFn={getListApi}
                              params={{
                                status: STATUS_UAA.PUBLISHED,
                                type: 'ACTION',
                              }}
                              labelPath='code'
                              labelPath2='name'
                              valuePath='id'
                              readOnly={isView}
                              required
                            />
                          </Box>
                        </Grid>
                        {isView ? (
                          <></>
                        ) : (
                          <Grid item xs={1} className='mt-10'>
                            <DynamicActionCustom
                              handleAddItem={() =>
                                append({
                                  actionId: null,
                                  apiId: null,
                                })
                              }
                              handleRemoveItem={() => remove(index)}
                              index={index}
                              totalItem={fields?.length || 0}
                              disabledDeleteButton={
                                index < fieldsNormal.length &&
                                status === 'PUBLISHED'
                              }
                            />
                          </Grid>
                        )}
                      </Grid>
                    )
                  })}
                  {fieldsNormal?.length === 0 && !isView && (
                    <Grid item xs={12}>
                      <Button
                        className='mb-10'
                        variant='outlined'
                        size='medium'
                        onClick={() =>
                          setValue('apiSubMenuRefs', [
                            {
                              apiId: null,
                              serviceId: null,
                            },
                          ])
                        }
                      >
                        Add Normal API
                      </Button>
                    </Grid>
                  )}
                  {fieldsNormal?.length > 0 && (
                    <Grid item xs={12}>
                      <Typography
                        style={{
                          fontWeight: 500,
                          fontSize: 18,
                        }}
                      >
                        {t('label.listApiOfSubMenu')}
                      </Typography>
                    </Grid>
                  )}
                  {fieldsNormal.map((item, index) => {
                    return (
                      <NormalApi
                        item={item}
                        index={index}
                        appendApi={appendNormal}
                        removeApi={removeNormal}
                        fieldsApi={fieldsNormal}
                        isView={isView}
                        methodForm={methodForm}
                        t={t}
                        key={item?.key}
                      />
                    )
                  })}
                  <Grid item xs={12}>
                    <Typography variant='body2'>
                      {t('common:status')}: {renderStatus(watch('status'))}
                    </Typography>
                  </Grid>
                  {!viewId && (
                    <Grid item xs={12} className='flex justify-center mt-10'>
                      {isView ? (
                        status === STATUS_UAA.DRAFT && (
                          <>
                            <LoadingButton
                              variant='outlined'
                              onClick={() =>
                                showDialog(
                                  <DialogChangeStatusSubMenu
                                    id={id}
                                    version={watch('version')}
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
                            variant='text'
                            disabled={loadingSaveSubMenu || isUploading}
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
                            loading={loadingSaveSubMenu || isUploading}
                          >
                            {t('common:btn.save')}
                          </LoadingButton>
                        </>
                      )}
                    </Grid>
                  )}
                </Grid>
              </FormProvider>
            </Box>
          </form>
        )}
      </>
    )
  }

  if (!!viewId) {
    return <Box className='w-full p-10'>{renderForm()}</Box>
  }
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
      {renderForm()}
    </PageContainer>
  )
}
