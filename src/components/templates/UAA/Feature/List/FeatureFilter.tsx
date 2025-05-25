import CoreInput from '@/components/atoms/CoreInput'
import { TRANSLATE_UAA } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getListApis, getListSystems, useQueryGetListApis } from './service'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'

interface Props {
  methodForm: any
  loading?: boolean
  onSubmit: any
}

const FeatureFilter = (props: Props) => {
  const { methodForm, onSubmit, loading } = props
  const { control, watch } = methodForm
  const { t } = useTranslation(TRANSLATE_UAA.FEATURE)
  // const { data } = useQueryGetListApis({ status: 'PUBLISHED' })
  // const listApis = (data?.content ?? []).concat({ name: 'All', id: null })
  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Typography variant='h3' className='mb-10'>
          {t('common:btn.searchByFilter')}
        </Typography>
        <Box className='grid grid-cols-2 gap-10 w-fulL mb-10'>
          {/* <CoreInput
            control={control}
            className='w-full'
            name='name'
            label={t('table.featureName')}
          /> */}
          {/* <CoreAutocomplete
            control={control}
            name='apiId'
            options={listApis ?? []}
            label={t('label.api')}
            labelPath='name'
            valuePath='id'
          /> */}
          <CoreAutoCompleteAPI
            control={control}
            name='system'
            label={t('label.system')}
            placeholder=''
            labelSearch='codeOrName'
            fetchDataFn={getListSystems}
            params={{ status: 'PUBLISHED' }}
            labelPath='code'
            labelPath2='name'
            valuePath='id'
            hasAllOption
            disableClearable
          />
          <CoreInput
            control={control}
            className='w-full'
            name='codeOrName'
            label={t('common:btn.search')}
            placeholder={t('placeholder.search')}
            inputProps={{ maxLength: 255 }}
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

export default FeatureFilter
