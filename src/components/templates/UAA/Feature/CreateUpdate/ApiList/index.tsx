/* eslint-disable react-hooks/exhaustive-deps */
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { Action } from '@/components/molecules/Action'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { TRANSLATE_UAA } from '@/routes'
import { Box, Button, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { checkApiMapped, useGetListOptionApi } from '../service'
import { errorMsg } from '@/helper/message'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ErrorDialog } from '@/components/atoms/ErrorDialog'
import { truncateText } from '@/components/atoms/TooltipCustom'

interface Props {
  listService: any[]
  disabled?: boolean
  featureId: number
}
const ApiList = (props: Props) => {
  const { listService, disabled, featureId } = props
  const { watch, setValue, control } = useFormContext()
  const { showDialog, hideDialog } = useDialog()
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

  const handleCheckApiMapped = async (row: any, index: number) => {
    try {
      await checkApiMapped({ featureId, apiId: row?.id })
      remove(index)
    } catch (e) {}
  }

  const columns = useMemo(
    () =>
      [
        {
          header: 'Service',
          neverHidden: true,
          render: (v) => (
            <div>
              {truncateText(
                (v?.serviceCode ? v?.serviceCode + ' - ' : '') +
                  (v?.serviceName ? v?.serviceName : ''),
                40
              )}
            </div>
          ),
        },
        {
          header: 'API',
          neverHidden: true,
          render: (v) => (
            <div className='w-full'>
              {truncateText(
                (v?.code ? v?.code + ' - ' : '') + (v?.name ? v?.name : ''),
                50
              )}
            </div>
          ),
        },
        ...(disabled
          ? []
          : [
              {
                header: '',
                fieldName: 'name',
                render: (row, index) =>
                  !disabled && (
                    <Action
                      actionList={['delete']}
                      onDeleteAction={() => {
                        if (!!featureId) {
                          handleCheckApiMapped(row, index)
                        } else {
                          remove(index)
                        }
                      }}
                    />
                  ),
              },
            ]),
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
            options={listService.map((service) => ({
              ...service,
              name: `${service.code} - ${service.name}`,
            }))}
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
            size='medium'
            variant='outlined'
            color='primary'
            sx={{ minWidth: '82px' }}
            // disabled={!watch('searchApiId')}
            onClick={() => {
              if (!!watch('searchApiId')) {
                append({
                  ...listApiSelect.find((v) => v.id === watch('searchApiId')),
                  serviceName: listService.find(
                    (v) => v.code === watch('searchServiceCode')
                  )?.name,
                  serviceCode: listService.find(
                    (v) => v.code === watch('searchServiceCode')
                  )?.code,
                })
                setValue('searchApiId', null)
              } else if (!watch('searchApiId') || !watch('searchServiceCode')) {
                // errorMsg(t('validate.validateServiceApi'))
                showDialog(
                  <ErrorDialog
                    message={t('validate.validateServiceApi')}
                    onClose={hideDialog}
                  />
                )
              } else {
              }
            }}
          >
            Add
          </Button>
        </Box>
      )}
      {listFields?.length > 0 && (
        <CustomTable
          isShowColumnStt
          columns={columns}
          data={listFields ?? []}
          paginationHidden
        />
      )}
    </Box>
  )
}

export default ApiList
