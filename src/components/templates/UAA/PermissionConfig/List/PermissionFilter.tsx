import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { TRANSLATE_UAA } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  methodForm: any
  loading?: boolean
  onSubmit: any
  listProduct: any[]
}

const PermissionFilter = (props: Props) => {
  const { methodForm, onSubmit, loading, listProduct } = props
  const { control } = methodForm
  const { t } = useTranslation(TRANSLATE_UAA.PERMISSION_CONFIG)
  const { t: t2 } = useTranslation()
  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Typography variant='h3' className='mb-10'>
          {t2('btn.searchByFilter')}
        </Typography>
        <Box className='grid grid-cols-2 gap-20 w-fulL mb-10'>
          <CoreInput
            control={control}
            className='w-full'
            name='codeOrName'
            label={t('label.permission')}
            placeholder={t('placeholder.keyword')}
            inputProps={{ maxLength: 255 }}
          />
          <CoreAutocomplete
            control={control}
            label={t('search.system')}
            name='systemId'
            returnValueType='enum'
            labelPath='name'
            valuePath='id'
            options={[
              { id: null, name: 'All' },
              ...listProduct.map((v) => {
                return { ...v, name: `${v?.code ?? ''} - ${v?.name ?? ''}` }
              }),
            ]}
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

export default PermissionFilter
