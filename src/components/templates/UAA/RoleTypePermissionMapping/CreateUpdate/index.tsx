import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import LoadingPage from '@/components/atoms/LoadingPage'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Breadcrumbs, Button, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { FormProvider } from 'react-hook-form'
import { ColumnProps, TableMappingCustom } from './TableMappingCustom'
import useCreateUpdateRoleTypePermissionMapping from './useCreateUpdateRoleTypePermissionMapping'
import { STATUS_UAA } from '@/helper/utils'
import { Action } from '@/components/molecules/Action'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import SearchTextField from './SearchTextField'

const CreateUpdateRoleTypePermissionMapping = () => {
  const {
    formFeatureContext,
    handleSubmit,
    isCreate,
    loading,
    loadingUpdate,
    listScope,
    isView,
    filterFeature,
    handleChangePaging,
    handleInputChange,
    loadingFeature,
    customPaging,
    setCustomPaging,
    listRoleType,
    listTier,
    loadingRoleType,
    loadingTier,
  } = useCreateUpdateRoleTypePermissionMapping()
  const router = useRouter()
  const { t } = useTranslation(TRANSLATE_UAA.ROLE_TYPE_PERMISSION_MAPPING)

  const {
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = formFeatureContext

  const listPermissionMapping = watch('groupPermissionList') ?? []

  const columnsFeature = useMemo(
    () =>
      [
        {
          header: 'System',
          render: (row) =>
            `${row?.system?.code ?? ''} - ${row?.system?.name ?? ''}`,
        },
        {
          fieldName: 'code',
          header: 'Permission Group Code',
        },
        {
          fieldName: 'name',
          header: 'Permission Group Name',
        },
      ] as ColumnProps[],
    []
  )
  const handleGetFormFeatureList = () => {
    const items: any[] = []
    const listFeatureForm = watch('groupPermissionList') ?? []
    const startIndex = customPaging.page * customPaging.size
    for (let i = startIndex; i < startIndex + customPaging.size; i++) {
      const totalFeature = listFeatureForm[i]
      if (!!listFeatureForm[i]) {
        items.push(totalFeature)
      }
    }
    return items
  }

  const columnsFeatureMapping = useMemo(
    () =>
      [
        {
          header: 'System',
          render: (row) =>
            `${row?.system?.code ?? ''} - ${row?.system?.name ?? ''}`,
        },
        {
          fieldName: 'code',
          header: 'Permission Group Code',
        },
        {
          fieldName: 'name',
          header: 'Permission Group Name',
        },
        ...(isView
          ? []
          : [
              {
                render: (row) => (
                  <Action
                    actionList={['delete']}
                    onDeleteAction={() => {
                      if (
                        handleGetFormFeatureList().length === 1 &&
                        customPaging.page > 0
                      ) {
                        setCustomPaging({
                          ...customPaging,
                          page: customPaging.page - 1,
                        })
                      }
                      setValue(
                        'groupPermissionList',
                        listPermissionMapping.filter(
                          (v) => v.groupPermissionId !== row.id
                        )
                      )
                    }}
                  ></Action>
                ),
              },
            ]),
      ] as ColumnProps[],
    [
      customPaging,
      handleGetFormFeatureList,
      isView,
      listPermissionMapping,
      setCustomPaging,
      setValue,
    ]
  )

  const handleChecked = (val: any) => {
    const listFeatureForm = watch('groupPermissionList') ?? []
    return listFeatureForm.some((v) => v.groupPermissionId === val.id)
  }

  return (
    <PageContainer
      title={
        <Box>
          <CoreBreadcrumbs
            textCurrent={
              isView
                ? t('common:btn.viewDetail')
                : t(!isCreate ? 'common:btn.edit' : 'common:btn.addNew')
            }
            textPrev={t('title.title')}
            prevUrl={UAA_CHILDREN_PATH.ROLE_TYPE_PERMISSION_MAPPING}
          />
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
                <Box className='grid grid-cols-2 gap-10 mb-10'>
                  <CoreAutocomplete
                    label={t('label.roleType')}
                    control={control}
                    name='roleTypeId'
                    options={(listRoleType ?? []).map((v) => ({
                      ...v,
                      name: `${v?.roleTypeCode} - ${v?.roleTypeName}`,
                    }))}
                    valuePath='id'
                    labelPath='name'
                    returnValueType='enum'
                    readOnly={isView || !isCreate}
                    required={!isView}
                    loading={loadingRoleType}
                  />
                  <CoreAutocomplete
                    label={t('label.tier')}
                    control={control}
                    name='tierId'
                    options={(listTier ?? []).map((v) => ({
                      ...v,
                      name: `${v?.tierCode} - ${v?.tierName}`,
                    }))}
                    valuePath='id'
                    labelPath='name'
                    returnValueType='enum'
                    disabled={!watch('roleTypeId')}
                    readOnly={isView || !isCreate}
                    required={!isView}
                    loading={loadingTier}
                  />
                </Box>
                {!isView && (
                  <>
                    <Box className='grid grid-cols-2 gap-10 mb-10'>
                      <Box className='w-full'>
                        <Typography variant='subtitle1'>
                          {t('label.listPermission')}
                        </Typography>
                        {/* <TextField
                          value={filterFeature.systemOrGroup}
                          onChange={handleInputChange}
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
                          placeholder={t('label.listPermissionPlaceholder')}
                        /> */}
                        <SearchTextField
                          value={filterFeature.systemOrGroup}
                          handleInputChange={handleInputChange}
                          t={t}
                        />
                      </Box>
                    </Box>
                    <TableMappingCustom
                      data={
                        listScope?.content?.filter((v) => !handleChecked(v)) ??
                        []
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
                        setValue('groupPermissionList', [
                          { ...val, groupPermissionId: val.id },
                          ...watch('groupPermissionList'),
                        ])
                      }
                    />
                  </>
                )}

                <Typography variant='subtitle1' className='my-10'>
                  {isView
                    ? t('label.listPermission')
                    : t('label.listPermissionSelected')}
                </Typography>
                <TableMappingCustom
                  data={handleGetFormFeatureList()}
                  {...customPaging}
                  columns={columnsFeatureMapping}
                  isShowColumnStt
                  totalPages={Math.ceil(
                    watch('groupPermissionList')?.length / customPaging.size
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
                          router.push(
                            UAA_CHILDREN_PATH.ROLE_TYPE_PERMISSION_MAPPING
                          )
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

export default CreateUpdateRoleTypePermissionMapping
