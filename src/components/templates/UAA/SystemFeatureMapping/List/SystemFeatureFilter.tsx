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
  listFeature: any[]
  loadingSystem: boolean
  loadingFeature: boolean
}

const SystemFeatureFilter = (props: Props) => {
  const {
    methodForm,
    onSubmit,
    loading,
    listFeature,
    listSystem,
    loadingFeature,
    loadingSystem,
  } = props
  console.log(listFeature, listSystem, 'watchData')
  const { control, watch } = methodForm
  const { t } = useTranslation(TRANSLATE_UAA.FEATURE)
  const convertListSystem = (listSystem ?? [])
    .filter((v) => v?.status === 'PUBLISHED')
    .map((v2) => ({
      ...v2,
      name: `${v2?.code} - ${v2?.name}`,
    }))
  const convertListFeature = (listFeature ?? [])
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
        <Box className='grid grid-cols-2 gap-10 w-fulL mb-10'>
          <CoreAutocomplete
            options={[...convertListSystem, { id: null, name: 'All' }] ?? []}
            control={control}
            className='w-full'
            name='systemId'
            valuePath='id'
            labelPath='name'
            label={t('label.system')}
            loading={loadingSystem}
          />
          <CoreAutocomplete
            options={[...convertListFeature, { id: null, name: 'All' }] ?? []}
            control={control}
            className='w-full'
            name='featureId'
            valuePath='id'
            labelPath='name'
            label={t('label.feature')}
            loading={loadingFeature}
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
