/* eslint-disable react-hooks/exhaustive-deps */
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { Action } from '@/components/molecules/Action'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { TRANSLATE_UAA } from '@/routes'
import { Box, Button, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useGetListOptionApi } from '../service'

interface Props {
  listService: any[]
  disabled?: boolean
}
const ApiList = (props: Props) => {
  const { listService, disabled } = props
  const { watch, setValue, control } = useFormContext()

  const { t } = useTranslation(TRANSLATE_UAA.FEATURE)

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'apis',
    keyName: 'key',
  })

  const serviceCode = watch('searchServiceCode')

  const { data, isLoading } = useGetListOptionApi(
    {
      serviceCode,
      page: 0,
      size: 100,
      status: 'PUBLISHED',
    },
    {
      enabled: !!serviceCode,
    }
  )

  const listApiSelect = data?.data?.data?.content ?? []

  const listFields = watch('apis')

  const columns = useMemo(
    () =>
      [
        { header: 'Service', fieldName: 'serviceName' },
        { header: 'Api', fieldName: 'name' },
        {
          header: '',
          fieldName: 'name',
          render: (row, index) =>
            !disabled && (
              <Action
                actionList={['delete']}
                onDeleteAction={() => remove(index)}
              />
            ),
        },
      ] as ColumnProps[],
    []
  )

  return (
    <Box className='mb-10'>
      <Typography
        fontWeight={790}
        fontSize={16}
        variant='subtitle2'
        className='mb-10'
      >
        {t('form.listApi')}
      </Typography>

      {!disabled && (
        <Box className='flex w-full my-15 items-center'>
          <CoreAutocomplete
            control={control}
            label={t('form.service')}
            name='searchServiceCode'
            options={listService}
            valuePath='code'
            labelPath='name'
            className='w-full mr-15'
            onChangeValue={(v) => {
              setValue('searchApiId', null)
            }}
          />
          <CoreAutocomplete
            className='w-full mr-15'
            control={control}
            loading={isLoading}
            label={t('form.api')}
            name='searchApiId'
            options={listApiSelect
              .filter((item) => !listFields.some((v2) => v2.id === item.id))
              .map((v) => {
                return { ...v, name: `${v.code} - ${v.name}` }
              })}
            valuePath='id'
            labelPath='name'
          />
          <Button
            size='small'
            variant='outlined'
            color='primary'
            disabled={!watch('searchApiId')}
            onClick={() => {
              append({
                ...listApiSelect.find((v) => v.id === watch('searchApiId')),
                serviceName: listService.find(
                  (v) => v.code === watch('searchServiceCode')
                )?.name,
              })
              setValue('searchApiId', null)
            }}
          >
            Add
          </Button>
        </Box>
      )}
      <CustomTable columns={columns} data={listFields ?? []} paginationHidden />
    </Box>
  )
}

export default ApiList
