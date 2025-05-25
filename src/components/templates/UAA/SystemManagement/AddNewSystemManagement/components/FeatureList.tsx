import { CustomTable } from '@/components/organism/TableCustom'
import { ColumnProps } from '@/components/organism/TableCustom'
import React, { useCallback, useMemo } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import SearchAutocomplete from './SearchAutocomplete'
import { getListFeature } from '../../service'
import DeleteIcon from '@/assets/svg/delete.svg'
import Image from 'next/image'

type Val = {
  alias: string
  apis: any
  description: string
  id?: number
  isActivated: boolean
  name: string
}

const FeatureList = (props: any) => {
  const { watch, setValue, t } = props
  const getOptionFeature = async (name?: string) => {
    const res = await getListFeature({ name, page: 0, pageSize: 1000 })
    return res?.data?.data?.content ?? []
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listFeatureSelected = watch('featureIds') ?? []

  const handleDeleteFeature = useCallback(
    (idFeature: number) => {
      setValue(
        'featureIds',
        listFeatureSelected?.filter((value: Val) => value.id !== idFeature)
      )
    },
    [listFeatureSelected, setValue]
  )

  const columns = useMemo(
    () =>
      [
        {
          header: (
            <Typography variant='subtitle2'>
              {t('table-feature.code')}
            </Typography>
          ),
          fieldName: 'code',
        },
        {
          header: (
            <Typography variant='subtitle2'>
              {t('table-feature.name')}
            </Typography>
          ),
          fieldName: 'name',
        },

        {
          header: (
            <Typography variant='subtitle2'>{t('column.action')}</Typography>
          ),
          render: (row) => (
            <IconButton onClick={() => handleDeleteFeature(row?.id)}>
              <Image src={DeleteIcon} alt='' />
            </IconButton>
          ),
        },
      ] as ColumnProps[],
    [handleDeleteFeature, t]
  )

  return (
    <Box className='mt-20 mb-10'>
      <Box>
        <Typography
          variant='subtitle2'
          style={{ fontSize: '15px', paddingBottom: '10px' }}
        >
          {t('table-feature.title')}
        </Typography>
        <CustomTable
          data={listFeatureSelected ?? []}
          columns={columns}
          paginationHidden
        />
      </Box>

      <SearchAutocomplete
        fetchOption={() => getOptionFeature()}
        value={listFeatureSelected}
        onChange={(val: Val[]) => setValue('featureIds', val)}
        multiple
        valuePath='id'
        transitionDelay={1000}
      />
    </Box>
  )
}

export default FeatureList
