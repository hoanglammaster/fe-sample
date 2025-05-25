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
  listScope: any[]
  listClient: any[]
  loadingListScope: boolean
  loadingListClient: boolean
}

const SystemFeatureFilter = (props: Props) => {
  const {
    methodForm,
    onSubmit,
    loading,
    listClient,
    listScope,
    loadingListClient,
    loadingListScope,
  } = props
  const { control, watch } = methodForm
  const { t } = useTranslation(TRANSLATE_UAA.CLIENT_SCOPE_MAPPING)
  const convertListScope = (listScope ?? [])
    .filter((v) => v?.status === 'PUBLISHED')
    .map((v2) => ({
      ...v2,
      name: `${v2?.code} - ${v2?.name}`,
    }))
  const convertListClient = (listClient ?? [])
    .filter((v) => v?.status === 'PUBLISHED' || 'ACTIVE')
    .map((v2) => ({
      ...v2,
      name: `${v2?.code} - ${v2?.name}`,
    }))
  console.log(listClient, 'watchList')
  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Typography variant='h3' className='mb-10'>
          {t('common:btn.searchByFilter')}
        </Typography>
        <Box className='grid grid-cols-2 gap-10 w-fulL mb-10'>
          <CoreAutocomplete
            options={[...convertListScope, { id: null, name: 'All' }] ?? []}
            control={control}
            className='w-full'
            name='scopeId'
            valuePath='id'
            labelPath='name'
            label={t('label.scope')}
            loading={loadingListScope}
            disableClearable
          />
          <CoreAutocomplete
            options={[...convertListClient, { id: null, name: 'All' }] ?? []}
            control={control}
            className='w-full'
            name='clientId'
            valuePath='id'
            labelPath='name'
            label={t('label.client')}
            loading={loadingListClient}
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
