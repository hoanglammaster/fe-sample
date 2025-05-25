import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CustomTable } from '@/components/organism/TableCustom'
import { TRANSLATE_UAA } from '@/routes'
import { Box, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useListOfFeature from './useListOfFeature'
import LoadingPage from '@/components/atoms/LoadingPage'
import TableFeature from './TableFeature'
interface Props {
  formFeatureContext: any
  filterFeature: any
  listTransType: any
  listService: any
  listFeature: any
  loadingFeature: boolean
  loadingTransType: boolean
  loadingService: boolean
  isView: boolean
  handleInputChange: (event: any) => void
  handleChangePaging: (val: any) => void
}

const ListOfFeature = (props: Props) => {
  const { t } = useTranslation(TRANSLATE_UAA.FEATURE)
  const {
    formFeatureContext,
    filterFeature,
    listTransType,
    listService,
    listFeature,
    loadingFeature,
    loadingTransType,
    loadingService,
    isView,
    handleInputChange,
    handleChangePaging,
  } = props
  const { control, setValue, watch } = formFeatureContext
  const { columns } = useListOfFeature({
    t,
    listFeature: listFeature?.content,
    setValue,
    isView,
    form: formFeatureContext,
  })
  const watchTransType = watch('transType')
  const [searchText, setSearchText] = useState('')
  const [customPaging, setCustomPaging] = useState({ page: 0, size: 10 })

  const handleGetFormFeatureList = () => {
    const items: any[] = []
    const listFeatureForm = watch('features') ?? []
    const startIndex = customPaging.page * customPaging.size
    for (let i = startIndex; i < startIndex + customPaging.size; i++) {
      const totalFeature = listFeatureForm[i]
      if (!!listFeatureForm[i]) {
        items.push(totalFeature)
      }
    }
    return items
  }

  return (
    <div>
      <Typography variant='subtitle2'>
        {isView ? t('label.listFeatureSelected') : t('label.listFeature')}
      </Typography>
      {isView ? (
        <div className='mt-5'>
          <TableFeature
            columns={columns}
            data={handleGetFormFeatureList()}
            {...customPaging}
            totalPages={Math.ceil(
              watch('features')?.length / customPaging.size
            )}
            onChangePageSize={(val) =>
              setCustomPaging({
                page: val.page ?? 0,
                size: val.size ?? 10,
              })
            }
          />
        </div>
      ) : (
        <div>
          <div className='grid grid-cols-2 gap-10 w-full mt-5 mb-10'>
            <CoreAutocomplete
              control={control}
              label={t('form.transType')}
              name='transType'
              options={
                (listTransType ?? [])
                  .map((v) => ({
                    ...v,
                    transType: v?.transTypeCode + ' - ' + v?.transTypeName,
                  }))
                  .concat({ transTypeCode: null, transType: 'All' }) ?? []
              }
              labelPath='transType'
              valuePath='transTypeCode'
              onChangeValue={(v) => {
                setValue('service', null)
              }}
              loading={loadingTransType}
              disableClearable
            />
            <CoreAutocomplete
              options={
                (listService ?? [])
                  .map((v) => ({
                    ...v,
                    serviceName: v?.serviceCode + ' - ' + v?.serviceName,
                  }))
                  .concat({ serviceCode: null, serviceName: 'All' }) ?? []
              }
              name='service'
              control={control}
              label={t('form.service')}
              valuePath='serviceCode'
              labelPath='serviceName'
              loading={loadingService}
              disabled={!watchTransType}
              disableClearable
            />
            <Box className='w-full'>
              <Typography
                sx={{
                  fontSize: '10px',
                  color: '#7A7A7A',
                  lineHeight: '1rem',
                  fontWeight: '550',
                }}
              >
                {t('label.feature')}
              </Typography>
              <TextField
                value={searchText}
                onChange={(e) => {
                  handleInputChange(e)
                  setSearchText(e.target.value)
                }}
                variant='standard'
                inputProps={{
                  maxLength: 255,
                }}
                InputProps={{
                  endAdornment: (
                    <Image
                      src={require('@/assets/svg/iconSearch.svg')}
                      alt=''
                      width={16}
                      height={16}
                    />
                  ),
                }}
                className='w-full'
                placeholder={t('label.listFeaturePlaceholder')}
              />
            </Box>
          </div>
          <div>
            {loadingFeature ? (
              <div className='flex items-center h-100'>
                <LoadingPage />
              </div>
            ) : listFeature?.content?.length > 0 ? (
              <TableFeature
                columns={columns}
                data={listFeature?.content ?? []}
                isLoading={loadingFeature}
                page={filterFeature.page}
                size={filterFeature.size}
                totalPages={listFeature.totalPages}
                onChangePageSize={handleChangePaging}
              />
            ) : (
              <Box className='w-full flex items-center justify-center my-10'>
                <Typography variant='body1'>
                  {t('common:table.no_data')}
                </Typography>
              </Box>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ListOfFeature
