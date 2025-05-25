/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import useCreateUpdateConfigRole from './useCreateUpdateConfigRole'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Box, Button, Typography } from '@mui/material'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { useTranslation } from 'react-i18next'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'
import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'

const CreateUpdateConfigRoleType = () => {
  const {
    methodForm,
    onSubmit,
    getRoleType,
    getTier,
    listRoleType,
    listSystem,
    listTier,
    getListPermission,
    listPermission,
    loading,
    isEdit,
  } = useCreateUpdateConfigRole()
  const router = useRouter()
  const { t } = useTranslation(TRANSLATE_UAA.CONFIG_ROLE_TYPE)
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methodForm
  const systemId = watch('systemId')
  const roleTypeId = watch('roleTypeId')

  useEffect(() => {
    if (systemId) {
      getRoleType(systemId)
      getListPermission(systemId)
    }
  }, [systemId])

  useEffect(() => {
    roleTypeId && getTier(roleTypeId)
  }, [roleTypeId])

  return (
    <PageContainer
      title={
        <Box>
          <BreadcrumbUaa />
          <Typography variant='h3' className='mt-10'>
            {t(isEdit ? 'title.update' : 'title.create')}
          </Typography>
        </Box>
      }
    >
      <form onSubmit={onSubmit}>
        <CoreAutocomplete
          name='systemId'
          control={control}
          options={listSystem}
          returnValueType='enum'
          label={t('form.system')}
          valuePath='id'
          labelPath='name'
          required
          rules={{ required: t('common:validation.required') }}
          onChangeValue={(e) => {
            setValue('roleTypeId', undefined)
            setValue('tierId', undefined)
            setValue('groupPermissionIds', [])
          }}
        />
        <Box className='grid grid-cols-2 gap-15 mt-15'>
          <CoreAutocomplete
            name='roleTypeId'
            control={control}
            options={listRoleType}
            returnValueType='enum'
            label={t('form.roleType')}
            valuePath='id'
            labelPath='roleTypeName'
            required
            disabled={!systemId}
            rules={{ required: t('common:validation.required') }}
          />
          <CoreAutocomplete
            name='tierId'
            control={control}
            options={listTier}
            returnValueType='enum'
            label={t('form.tier')}
            valuePath='id'
            labelPath='tierName'
            required
            disabled={!roleTypeId}
            rules={{ required: t('common:validation.required') }}
          />
          <CoreAutocomplete
            name='groupPermissionIds'
            control={control}
            options={listPermission}
            returnValueType='enum'
            label={t('form.permission')}
            valuePath='id'
            labelPath='name'
            required
            multiple
            disabled={!systemId}
            rules={{ required: t('common:validation.required') }}
          />
        </Box>
        <Box className='w-full flex flex-row justify-center my-15'>
          <Button
            size='large'
            variant='text'
            disabled={isSubmitting}
            style={{ marginRight: 30 }}
            onClick={(e) => router.push(UAA_CHILDREN_PATH.CONFIG_ROLE_TYPE)}
          >
            {t('common:btn.cancel')}
          </Button>
          <LoadingButton
            size='large'
            variant='contained'
            type='submit'
            loading={isSubmitting || loading}
          >
            {t(!isEdit ? 'common:btn.add' : 'common:btn.save')}
          </LoadingButton>
        </Box>
      </form>
    </PageContainer>
  )
}

export default CreateUpdateConfigRoleType
