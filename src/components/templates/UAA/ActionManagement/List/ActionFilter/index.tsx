import CoreInput from '@/components/atoms/CoreInput'
import { TRANSLATE_UAA } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  form: any
  onSubmit: (val: any) => void
}

const ActionFilter = (props: Props) => {
  const { form, onSubmit } = props
  const { control } = form
  const { t } = useTranslation(TRANSLATE_UAA.ACTION_MANAGEMENT)
  return (
    <form onSubmit={onSubmit}>
      <Typography variant='h3' className='mb-10'>
        {t('common:searchByFilter')}
      </Typography>
      <div className='grid grid-cols-2 gap-10 w-full mb-10'>
        <CoreInput
          control={control}
          name='codeOrName'
          label={t('label.action')}
          placeholder={t('placeholder.search')}
          inputProps={{ maxLength: 255 }}
        />
        <div>
          <LoadingButton type='submit' variant='contained' color='primary'>
            {t('common:btn.search')}
          </LoadingButton>
        </div>
      </div>
    </form>
  )
}

export default ActionFilter
