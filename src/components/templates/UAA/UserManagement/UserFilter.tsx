import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { TRANSLATE_UAA } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { watch } from 'fs'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  methodForm: any
  loading?: boolean
  onSubmit: any
  listRoleType: any[]
  listTier: any[]
}

const UserFilter = (props: Props) => {
  const { methodForm, onSubmit, loading, listRoleType, listTier } = props
  const { control, watch } = methodForm
  const { t } = useTranslation(TRANSLATE_UAA.USER)
  const { t: t2 } = useTranslation()

  const listStatus = [
    {
      value: null,
      label: 'All',
    },
    {
      value: 'ACTIVE',
      label: 'Active',
    },
    {
      value: 'LOCKED',
      label: 'Locked',
    },
    {
      value: 'TERMINATED',
      label: 'Terminated',
    },
  ]

  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Typography variant='h3' className='mb-10'>
          {t2('btn.searchByFilter')}
        </Typography>
        <Box className='grid grid-cols-3 gap-10 w-fulL mb-10'>
          <CoreInput
            control={control}
            className='w-full'
            name='search'
            label={t('search.search')}
            placeholder={t('search.searchName')}
            inputProps={{ maxLength: 255 }}
          />
          <CoreAutocomplete
            control={control}
            label={t('label.roleType')}
            name='roleTypeId'
            returnValueType='enum'
            labelPath='roleTypeName'
            valuePath='id'
            options={[
              { id: null, roleTypeName: 'All' },
              ...listRoleType.map((v) => ({
                ...v,
                roleTypeName: `${v?.roleTypeCode} - ${v?.roleTypeName}`,
              })),
            ]}
          />
          <CoreAutocomplete
            control={control}
            label={t('label.tier')}
            name='tierId'
            returnValueType='enum'
            labelPath='tierNameCode'
            valuePath='id'
            disabled={!watch('roleTypeId')}
            options={[
              { id: null, tierNameCode: 'All' },
              ...listTier.map((v) => {
                return {
                  ...v,
                  tierNameCode:
                    (v?.tierCode ?? '') + ' - ' + (v?.tierName ?? ''),
                }
              }),
            ]}
          />
          <CoreAutocomplete
            control={control}
            label={t('label.status')}
            name='status'
            returnValueType='enum'
            labelPath='label'
            valuePath='value'
            options={listStatus}
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

export default UserFilter
