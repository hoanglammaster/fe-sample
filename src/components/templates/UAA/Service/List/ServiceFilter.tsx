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

const ServiceFilter = (props: Props) => {
  const { methodForm, onSubmit, loading } = props
  const { control } = methodForm
  const { t } = useTranslation(TRANSLATE_UAA.SERVICE)
  const { t: t2 } = useTranslation()
  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Typography variant='h3' className='mb-10'>
          {t2('btn.searchByFilter')}
        </Typography>
        <Box className='grid grid-cols-2 gap-10 w-full mb-10'>
          <CoreInput
            control={control}
            className='w-full'
            name='codeOrName'
            label={t('title.service')}
            placeholder={t('title.search')}
            inputProps={{ maxLength: 255 }}
          />
          <Box className='flex w-full mt-3'>
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

export default ServiceFilter
