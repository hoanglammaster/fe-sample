import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { TRANSLATE_UAA } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  methodForm: any
  loading?: boolean
  onSubmit: any
  listRoleType: any[]
  listTier: any[]
  listPermission: any[]
  loadingRoleType: boolean
  loadingTier: boolean
  loadingPermission: boolean
}

const SystemFeatureFilter = (props: Props) => {
  const {
    methodForm,
    onSubmit,
    loading,
    listTier,
    listPermission,
    listRoleType,
    loadingPermission,
    loadingRoleType,
    loadingTier,
  } = props
  const { control, watch, setValue } = methodForm
  const { t } = useTranslation(TRANSLATE_UAA.ROLE_TYPE_PERMISSION_MAPPING)
  const convertListSystem = (listRoleType ?? []).map((v2) => ({
    ...v2,
    name: `${v2?.roleTypeCode} - ${v2?.roleTypeName}`,
  }))
  const convertListTier = (listTier ?? []).map((v2) => ({
    ...v2,
    name: `${v2?.tierCode} - ${v2?.tierName}`,
  }))

  const convertListPermission = (listPermission ?? [])
    .filter((v) => v?.status === 'PUBLISHED')
    .map((v2) => ({
      ...v2,
      name: `${v2?.code} - ${v2?.name}`,
    }))

  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Typography variant='h3' className='mb-10'>
          {t('common:btn.searchByFilter')}
        </Typography>
        <Box className='grid grid-cols-3 gap-10 w-full mb-10'>
          <CoreAutocomplete
            options={[...convertListSystem, { id: null, name: 'All' }] ?? []}
            control={control}
            className='w-full'
            name='roleTypeId'
            valuePath='id'
            labelPath='name'
            label={t('label.roleType')}
            loading={loadingRoleType}
            disableClearable
            onChangeValue={() => setValue('tierId', null)}
          />
          <CoreAutocomplete
            options={[...convertListTier, { id: null, name: 'All' }] ?? []}
            control={control}
            className='w-full'
            name='tierId'
            valuePath='id'
            labelPath='name'
            label={t('label.tier')}
            loading={loadingTier}
            disableClearable
            disabled={!watch('roleTypeId')}
          />
          <CoreAutocomplete
            options={
              [...convertListPermission, { id: null, name: 'All' }] ?? []
            }
            control={control}
            className='w-full'
            name='groupPermissionId'
            valuePath='id'
            labelPath='name'
            label={t('label.permission')}
            loading={loadingPermission}
            disableClearable
          />
        </Box>
        <Box className='flex w-full justify-center'>
          <LoadingButton
            variant='contained'
            color='primary'
            className='mb-10'
            type='submit'
            loading={loading}
          >
            {t('common:btn.search')}
          </LoadingButton>
        </Box>
      </Box>
    </form>
  )
}

export default SystemFeatureFilter
