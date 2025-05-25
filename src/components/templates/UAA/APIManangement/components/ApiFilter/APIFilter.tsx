import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { useFormCustom } from '@/lib/form'
import { LoadingButton } from '@mui/lab'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { kMaxLength } from 'buffer'
import { useState } from 'react'
import { LIST_API_METHOD, LIST_API_TYPE } from '../../AddNewAPIManagement'

type DefaultValues = {
  endpoint: string
  method: string
  type: string
  status: string
  systemId?: number
  serviceId: number | null
}

const ApiFilter = (props: any) => {
  const { t, setFilter, listService, filterApi } = props

  const defaultValues: DefaultValues = {
    endpoint: '',
    method: '',
    type: '',
    status: '',
    serviceId: null,
  }
  const { control, reset, getValues, handleSubmit } =
    useFormCustom<DefaultValues>({
      defaultValues,
    })

  const [isSearch, setIsSearch] = useState<boolean>(false)

  const handleSearch = () => {
    setIsSearch(true)
    const dataSearch: any = getValues()
    Object.keys(dataSearch).forEach((key) => {
      if (!dataSearch[key]) {
        delete dataSearch[key]
      }
    })
    const dataSearchKey = Object.keys(dataSearch)
    const trimDataSearchValues = Object.values(dataSearch)?.map((item: any) =>
      typeof item === 'string' ? item.trim() : item
    )
    trimDataSearchValues?.forEach((item, index) => {
      dataSearch[`${dataSearchKey[index]}`] = item
    })
    setFilter({
      ...dataSearch,
      page: 0,
      size: filterApi?.size ?? 20,
    })
    setIsSearch(false)
  }

  const [isReset, setIsReset] = useState(false)

  const handleReset = async () => {
    setIsReset(true)
    setFilter({ page: 0, size: 10 })
    reset({ ...defaultValues })
    setIsReset(false)
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <Box>
        <Typography variant='h3' className='mb-10'>
          {t('common:btn.searchByFilter')}
        </Typography>
        <Box className='grid grid-cols-3 gap-10 w-full mb-10'>
          <CoreInput
            name='codeOrName'
            control={control}
            className='w-full'
            label={t('label.search')}
            placeholder={t('placeholder.search')}
            inputProps={{ maxLength: 255 }}
          />
          {/* <CoreInput
            name='code'
            control={control}
            className='w-full'
            label={t('label.code')}
          />
          <CoreInput
            name='name'
            control={control}
            className='w-full'
            label={t('label.name')}
          /> */}
          <CoreAutocomplete
            name='serviceId'
            className='w-full'
            returnValueType='enum'
            control={control}
            options={(listService ?? [])
              .map((v) => ({
                ...v,
                name: `${v?.code} - ${v?.name}`,
              }))
              .concat({
                id: null,
                name: 'All',
              })}
            labelPath='name'
            valuePath='id'
            label={t('label.service')}
          />
          <CoreAutocomplete
            name='method'
            className='w-full'
            control={control}
            options={[
              ...LIST_API_METHOD,
              {
                label: 'All',
                value: '',
              },
            ]}
            labelPath='label'
            valuePath='value'
            returnValueType='enum'
            label={t('label.method')}
          />
          <CoreAutocomplete
            control={control}
            name='type'
            options={[
              ...LIST_API_TYPE,
              {
                value: '',
                label: 'All',
              },
            ]}
            label={t('label.type')}
            labelPath='label'
            valuePath='value'
          />
          <CoreAutocomplete
            control={control}
            name='status'
            options={[
              {
                value: 'PUBLISHED',
                label: 'Published',
              },
              {
                value: 'DRAFT',
                label: 'Draft',
              },
              {
                value: '',
                label: 'All',
              },
            ]}
            label={t('common:status')}
          />
        </Box>
        <Box className='flex justify-center w-full space-x-10'>
          <LoadingButton
            type='submit'
            variant='contained'
            color='primary'
            loading={isSearch}
          >
            Search
          </LoadingButton>
        </Box>
      </Box>
    </form>
  )
}

export default ApiFilter
