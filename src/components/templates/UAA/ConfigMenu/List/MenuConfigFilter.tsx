import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { flatFormOption } from './CreateMenuDialog'
import { useTranslation } from 'react-i18next'
import { TRANSLATE_UAA } from '@/routes'
import { STATUS_UAA } from '@/helper/utils'
import { LoadingButton } from '@mui/lab'

interface Props {
  loading?: boolean
  onChange: (val: any) => void
  listSystem: any[]
}

const MenuConfigFilter = (props: Props) => {
  const { listSystem, onChange, loading } = props
  const { t } = useTranslation(TRANSLATE_UAA.MENU)
  const { control, handleSubmit } = useForm<any>({
    defaultValues: {
      systemCode: null,
      platform: null,
    },
  })
  const listSystemOption = listSystem
    ?.filter((v) => v.status === STATUS_UAA.PUBLISHED)
    .map((v) => {
      return { ...v, name: v?.code + '-' + v?.name }
    })
  const onSubmit = handleSubmit((val) => onChange(val))
  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Typography variant='h3' className='mb-10'>
          {t('common:btn.searchByFilter')}
        </Typography>
        <Box className='grid grid-cols-2 gap-10 w-full mb-15'>
          <CoreAutocomplete
            label={t('text.platform')}
            control={control}
            name='platform'
            options={[{ id: null, name: 'All' }, ...flatFormOption]}
            disableClearable
            valuePath='id'
            labelPath='name'
            returnValueType='enum'
            hasAllOption
          />
          <CoreAutocomplete
            label={t('text.system')}
            disableClearable
            control={control}
            name='systemCode'
            options={[{ code: null, name: 'All' }, ...listSystemOption]}
            valuePath='code'
            labelPath='name'
            returnValueType='enum'
            hasAllOption
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

export default MenuConfigFilter
