import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import LoadingPage from '@/components/atoms/LoadingPage'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { FormProvider, useFieldArray } from 'react-hook-form'
import { ColumnProps, TableMappingCustom } from './TableMappingCustom'
import useCreateUpdateClientScopeMapping from './useCreateUpdateClientScopeMapping'
import { Action } from '@/components/molecules/Action'
import CoreInput from '@/components/atoms/CoreInput'
import SearchTextField from './SearchTextField'

const CreateUpdateClientScopeMapping = () => {
  const {
    formFeatureContext,
    handleSubmit,
    isCreate,
    loading,
    loadingUpdate,
    listClient,
    listScope,
    isView,
    filterFeature,
    handleChangePaging,
    handleInputChange,
    loadingFeature,
    customPaging,
    setCustomPaging,
  } = useCreateUpdateClientScopeMapping()
  const router = useRouter()
  const { t } = useTranslation(TRANSLATE_UAA.CLIENT_SCOPE_MAPPING)

  const {
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = formFeatureContext

  const scopeList = watch('scopeList')

  const columnsFeature = useMemo(
    () =>
      [
        {
          fieldName: 'code',
          header: 'Scope Code',
        },
        {
          fieldName: 'name',
          header: 'Scope Name',
        },
      ] as ColumnProps[],
    []
  )

  const secondColumns = useMemo(
    () =>
      [
        {
          fieldName: 'code',
          header: 'Scope Code',
        },
        {
          fieldName: 'name',
          header: 'Scope Name',
        },
        ...(isView
          ? []
          : [
              {
                render: (row) => (
                  <Action
                    actionList={['delete']}
                    onDeleteAction={() =>
                      setValue(
                        'scopeList',
                        scopeList.filter((v) => v.id !== row.id)
                      )
                    }
                  />
                ),
              },
            ]),
      ] as ColumnProps[],
    [isView, scopeList, setValue]
  )

  const handleGetFormFeatureList = () => {
    const items: any[] = []
    const listFeatureForm = watch('scopeList') ?? []
    const startIndex = customPaging.page * customPaging.size
    for (let i = startIndex; i < startIndex + customPaging.size; i++) {
      const totalFeature = listFeatureForm[i]
      if (!!listFeatureForm[i]) {
        items.push({ ...totalFeature, index: i })
      }
    }
    return items
  }

  const handleChecked = (val: any) => {
    const listFeatureForm = watch('scopeList') ?? []
    return listFeatureForm.some((v) => v.id === val.id)
  }

  return (
    <PageContainer
      title={
        <Box>
          <BreadcrumbUaa />
          <Typography variant='h1' className='mt-10'>
            {isView
              ? t('title.view')
              : t(!isCreate ? 'title.update' : 'title.add')}
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
                <Box className='grid grid-cols-2 mb-10'>
                  <CoreAutocomplete
                    label={t('label.client')}
                    control={control}
                    name='clientId'
                    options={(listClient ?? []).map((v) => ({
                      ...v,
                      name: `${v?.code} - ${v?.name}`,
                    }))}
                    valuePath='id'
                    labelPath='name'
                    returnValueType='enum'
                    readOnly={isView || !isCreate}
                    required={!isView}
                  />
                </Box>
                {!isView && (
                  <>
                    <Box className='grid grid-cols-2 mb-10'>
                      <Box className='w-full'>
                        <Typography variant='subtitle2'>
                          {t('label.listScope')}
                        </Typography>
                        <SearchTextField
                          value={filterFeature.codeOrName}
                          handleInputChange={handleInputChange}
                          t={t}
                        />
                        {/* <TextField
                          value={filterFeature.codeOrName}
                          onChange={(e) => {
                            handleInputChange(e)
                          }}
                          variant='standard'
                          InputProps={{
                            endAdornment: (
                              <Image
                                src={require('@/assets/svg/iconSearch.svg')}
                                alt=''
                                width={16}
                                height={16}
                              />
                            ),
                          }}
                          className='w-full'
                          placeholder={t('label.listScopePlaceholder')}
                        /> */}
                      </Box>
                    </Box>
                    <TableMappingCustom
                      data={
                        listScope?.content?.filter(
                          (val) => !handleChecked(val)
                        ) ?? []
                      }
                      {...listScope}
                      {...filterFeature}
                      isLoading={loadingFeature}
                      columns={columnsFeature}
                      isShowColumnStt
                      onChangePageSize={handleChangePaging}
                      checkSelected={handleChecked}
                      onRowClick={(val: any) =>
                        !handleChecked(val) &&
                        setValue('scopeList', [val, ...watch('scopeList')])
                      }
                    />
                  </>
                )}

                <Typography variant='subtitle1' className='my-10'>
                  {isView ? t('label.listScope') : t('label.listScopeSelected')}
                </Typography>
                <TableMappingCustom
                  data={handleGetFormFeatureList()}
                  {...customPaging}
                  columns={secondColumns}
                  isShowColumnStt
                  totalPages={Math.ceil(
                    watch('scopeList')?.length / customPaging.size
                  )}
                  onChangePageSize={(val) =>
                    setCustomPaging({
                      page: val.page ?? 0,
                      size: val.size ?? 10,
                    })
                  }
                  paginationHidden={handleGetFormFeatureList()?.length < 1}
                />
                <Box className='flex justify-center mt-10'>
                  {isView ? (
                    <></>
                  ) : (
                    <>
                      <Button
                        size='large'
                        variant='text'
                        disabled={isSubmitting}
                        style={{ marginRight: 20 }}
                        className='h-23'
                        onClick={(e) =>
                          router.push(UAA_CHILDREN_PATH.CLIENT_SCOPE_MAPPING)
                        }
                      >
                        {t('form.cancel')}
                      </Button>
                      <LoadingButton
                        size='large'
                        className='h-23'
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
      </Box>
    </PageContainer>
  )
}

export default CreateUpdateClientScopeMapping
