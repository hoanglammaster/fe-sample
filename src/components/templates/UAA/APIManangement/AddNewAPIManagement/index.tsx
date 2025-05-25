import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import CoreCheckbox from '@/components/atomsUpdate/CoreCheckbox'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { REGEX } from '@/helper/regex'
import { STATUS_UAA, renderStatus } from '@/helper/utils'
import { LoadingButton } from '@mui/lab'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import { useAPIForm } from './useAPIForm'

export const LIST_API_TYPE = [
  {
    label: 'Normal',
    value: 'NORMAL',
  },
  {
    label: 'Menu',
    value: 'MENU',
  },
  {
    label: 'Action',
    value: 'ACTION',
  },
  {
    label: 'Job',
    value: 'JOB',
  },
  {
    label: 'Integration',
    value: 'INTEGRATION',
  },
  {
    label: 'Open API',
    value: 'OPEN_API',
  },
  {
    label: 'Public API',
    value: 'PUBLIC_API',
  },
]

export const LIST_API_METHOD = [
  {
    label: 'POST',
    value: 'POST',
  },
  {
    label: 'GET',
    value: 'GET',
  },
  {
    label: 'PUT',
    value: 'PUT',
  },
  {
    label: 'DELETE',
    value: 'DELETE',
  },
  {
    label: 'HEAD',
    value: 'HEAD',
  },
  {
    label: 'PATCH',
    value: 'PATCH',
  },
]

export const AddNewAPIManagement = () => {
  const [values, handle, t] = useAPIForm()
  const {
    register,
    control,
    watch,
    loading,
    formState: { isDirty, isSubmitting },
    isView,
    onPublished,
    listService,
  } = values

  const router = useRouter()
  const { slug } = router.query
  const isEdit = !!slug && slug !== 'create'
  const { hideDialog, showDialog } = useDialog()

  const { onSubmit } = handle
  const status = watch('status')
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
      pageTitle={isEdit ? t('title.update') : t('title.add')}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <form
          onSubmit={onSubmit}
          style={{ paddingLeft: '90px', paddingRight: '90px' }}
        >
          <CoreAutocomplete
            options={(listService ?? []).map((v) => ({
              ...v,
              name: `${v?.code} - ${v?.name}`,
            }))}
            control={control}
            name={'serviceId'}
            label={t('label.service')}
            className='w-full mb-15'
            returnValueType='enum'
            labelPath='name'
            valuePath='id'
            readOnly={isView || status === STATUS_UAA.PUBLISHED}
            // disabled={status === STATUS_UAA.PUBLISHED && !isView}
            rules={{
              required: t('common:validation.requiredField'),
            }}
            required={!isView}
          />
          <Box className='grid grid-cols-2 gap-12 mb-15'>
            <CoreInput
              control={control}
              name={'code'}
              label={t('label.code')}
              inputProps={{ maxLength: 50 }}
              rules={{
                required: t('common:validation.requiredField'),
                validate: (v: string) =>
                  REGEX.USERNAME.test(v) ||
                  t('common:validation.isInvalid', { label: t('label.code') }),
              }}
              readOnly={isView || status === STATUS_UAA.PUBLISHED}
              // disabled={status === STATUS_UAA.PUBLISHED && !isView}
              required={!isView}
            />
            <CoreInput
              control={control}
              readOnly={isView}
              name={'name'}
              label={t('label.name')}
              inputProps={{ maxLength: 255 }}
              rules={{
                required: t('common:validation.requiredField'),
                validate: {
                  trimValue: (v) => {
                    return (
                      v?.trim()?.length > 0 ||
                      t('common:validation.enter', { msg: t('label.name') })
                    )
                  },
                },
              }}
              inputType='single'
              required={!isView}
            />
            <CoreInput
              control={control}
              name={'endpoint'}
              label={t('label.endpoint')}
              inputProps={{ maxLength: 255 }}
              readOnly={isView}
              rules={{
                required: t('common:validation.requiredField'),
                validate: {
                  validate1: (v: string) =>
                    v.trim().length > 0 || t('validate.endPoint'),
                  validate2: (v: string) =>
                    REGEX.NO_SPACE.test(v) ||
                    t('common:validation.isInvalid', {
                      label: t('label.endpoint'),
                    }),
                },
              }}
              inputType={isView ? 'multi' : 'single'}
              required={!isView}
            />
            <CoreAutocomplete
              control={control}
              name={'method'}
              label={t('label.method')}
              readOnly={isView}
              options={[
                {
                  label: 'POST',
                  value: 'POST',
                },
                {
                  label: 'GET',
                  value: 'GET',
                },
                {
                  label: 'PUT',
                  value: 'PUT',
                },
                {
                  label: 'DELETE',
                  value: 'DELETE',
                },
                {
                  label: 'HEAD',
                  value: 'HEAD',
                },
                {
                  label: 'PATCH',
                  value: 'PATCH',
                },
              ]}
              returnValueType='enum'
              rules={{
                required: t('common:validation.requiredField'),
              }}
              required={!isView}
            />
            <CoreAutocomplete
              control={control}
              name={'type'}
              label={t('label.type')}
              options={LIST_API_TYPE}
              returnValueType='enum'
              rules={{
                required: t('common:validation.requiredField'),
              }}
              readOnly={isView}
              required={!isView}
            />
            <div className='pt-12'>
              <CoreCheckbox
                control={control}
                name='isAuthorized'
                label={t('label.unauthorized')}
                disabled={isView}
              />
            </div>
          </Box>
          <CoreInput
            control={control}
            name='description'
            inputType='multi'
            className='mb-15'
            inputProps={{ maxLength: 255 }}
            label={t('label.description')}
            readOnly={isView}
          />
          <Typography className='mt-10' variant='body2'>
            Status: {renderStatus(watch('status'))}
          </Typography>
          <Box className='my-10'>
            <Box className='flex justify-center gap-10 mt-10'>
              {isView ? (
                status === STATUS_UAA.DRAFT && (
                  <LoadingButton
                    variant='outlined'
                    loading={isSubmitting}
                    onClick={() =>
                      showDialog(
                        <PublishDialog
                          onSubmit={() => {
                            onPublished()
                            hideDialog()
                          }}
                          t={t}
                        />
                      )
                    }
                  >
                    Publish
                  </LoadingButton>
                )
              ) : (
                <>
                  <Button
                    variant='text'
                    style={{ padding: '0 25px' }}
                    onClick={() => router.push('/uaa/api-management')}
                  >
                    {t('btn.cancel')}
                  </Button>
                  <LoadingButton
                    variant='contained'
                    type='submit'
                    loading={isSubmitting}
                  >
                    {t('btn.save')}
                  </LoadingButton>
                </>
              )}
            </Box>
          </Box>
        </form>
      )}
    </PageContainer>
  )
}
