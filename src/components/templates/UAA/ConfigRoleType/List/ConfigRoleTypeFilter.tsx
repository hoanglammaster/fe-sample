import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { TRANSLATE_UAA } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  methodForm: any
  loading?: boolean
  onSubmit: any
  listSystem: any[]
  listPermission: any[]
}

const ConfigRoleTypeFilter = (props: Props) => {
  const { methodForm, onSubmit, loading, listPermission, listSystem } = props
  const { control, watch } = methodForm
  const { t } = useTranslation(TRANSLATE_UAA.CONFIG_ROLE_TYPE)
  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Typography variant='h3' className='mb-10'>
          {t('common:btn.searchByFilter')}
        </Typography>
        <Box className='grid grid-cols-2 gap-10 w-fulL mb-10'>
          <CoreInput
            control={control}
            className='w-full'
            name='search'
            label={t('filter.search')}
          />
          <CoreAutocomplete
            control={control}
            className='w-full'
            name='systemId'
            returnValueType='enum'
            valuePath='id'
            labelPath='name'
            options={listSystem}
            label={t('filter.system')}
          />
          <CoreAutocomplete
            control={control}
            className='w-full'
            name='groupPermissionId'
            returnValueType='enum'
            valuePath='id'
            labelPath='name'
            options={listPermission}
            label={t('filter.permission')}
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

export default ConfigRoleTypeFilter
