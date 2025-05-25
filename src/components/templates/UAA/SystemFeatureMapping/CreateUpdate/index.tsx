import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import LoadingPage from '@/components/atoms/LoadingPage'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import ListOfFeature from './ListOfFeature'
import useCreateUpdateFeature from './useCreateUpdateFeature'

const CreateUpdateSystemFeatureMapping = () => {
  const {
    formFeatureContext,
    isCreate,
    loading,
    loadingUpdate,
    listFeature,
    listService,
    listSystem,
    listTransType,
    isView,
    filterFeature,
    id,
    customPaging,
    loadingFeature,
    loadingTransType,
    loadingService,
    handleSubmit,
    handleChangePaging,
    handleInputChange,
    setCustomPaging,
  } = useCreateUpdateFeature()
  const router = useRouter()
  const { t } = useTranslation(TRANSLATE_UAA.FEATURE)

  const {
    control,
    formState: { isSubmitting },
  } = formFeatureContext

  return (
    <PageContainer
      title={
        <Box>
          <BreadcrumbUaa />
          <Typography variant='h1' className='mt-10'>
            {isView
              ? t('title.viewFeatureMapping')
              : t(
                  !isCreate
                    ? 'title.updateFeatureMapping'
                    : 'title.addFeatureMapping'
                )}
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
                    label={t('form.system')}
                    control={control}
                    name='systemId'
                    options={(listSystem ?? []).map((v) => ({
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
                <ListOfFeature
                  formFeatureContext={formFeatureContext}
                  filterFeature={filterFeature}
                  listTransType={listTransType}
                  listService={listService}
                  listFeature={listFeature}
                  loadingFeature={loadingFeature}
                  loadingTransType={loadingTransType}
                  loadingService={loadingService}
                  isView={isView}
                  handleInputChange={handleInputChange}
                  handleChangePaging={handleChangePaging}
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
                        onClick={(e) =>
                          router.push(UAA_CHILDREN_PATH.SYSTEM_FEATURE_MAPPING)
                        }
                      >
                        {t('form.cancel')}
                      </Button>
                      <LoadingButton
                        size='large'
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

export default CreateUpdateSystemFeatureMapping
