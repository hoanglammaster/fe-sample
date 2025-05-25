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
}

const SystemFilter = (props: Props) => {
  const { methodForm, onSubmit, loading } = props
  const { control, watch } = methodForm
  const { t } = useTranslation(TRANSLATE_UAA.SYSTEM_MANAGEMENT)
  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Typography variant='h3' className='mb-10'>
          {t('common:searchByFilter')}
        </Typography>
        <Box className='grid grid-cols-2 gap-10 w-fulL mb-10'>
          <CoreInput
            control={control}
            className='w-full'
            name='codeOrName'
            label={t('title.title')}
            placeholder={t('placeholder.search')}
            inputProps={{ maxLength: 255 }}
          />
          <Box>
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
      </Box>
    </form>
  )
}

export default SystemFilter
