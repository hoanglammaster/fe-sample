import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { Box, Grid } from '@mui/material'
import React from 'react'
import DynamicActionCustom from './DynamicActionCustom'
import { getListApi, getListService } from '../service'
import { STATUS_UAA } from '@/helper/utils'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'

interface Props {
  item: any
  index: number
  isView: boolean
  methodForm: any
  appendApi: any
  removeApi: any
  fieldsApi: any
  t: any
}

const NormalApi = (props: Props) => {
  const {
    appendApi,
    index,
    isView,
    item,
    methodForm,
    removeApi,
    fieldsApi,
    t,
  } = props

  const { watch, control, setValue } = methodForm

  const serviceId = watch(`apiSubMenuRefs.${index}.service`)?.id

  const listExceptValue = watch('apiSubMenuRefs')
    .filter(
      (v, index2) => index !== index2 && v.service?.id === serviceId && !!v.api
    )
    .map((v) => {
      return { id: v.api.id }
    })

  return (
    <Grid
      item
      container
      spacing={4}
      style={{ paddingLeft: 0, paddingTop: 0 }}
      className='flex item-start'
    >
      <Grid item xs={isView ? 12 : 11}>
        <Box className=' grid grid-cols-2 gap-15'>
          <CoreAutoCompleteAPI
            control={control}
            name={`apiSubMenuRefs.${index}.service`}
            label={t('label.service')}
            fetchDataFn={getListService}
            params={{ status: STATUS_UAA.PUBLISHED }}
            labelPath='code'
            labelPath2='name'
            valuePath='id'
            labelSearch='codeOrName'
            required
            readOnly={isView}
            onChangeValue={(v: any) =>
              setValue(`apiSubMenuRefs.${index}.api`, null)
            }
          />
          <CoreAutoCompleteAPI
            control={control}
            name={`apiSubMenuRefs.${index}.api`}
            label={t('label.api')}
            labelSearch='codeOrName'
            fetchDataFn={getListApi}
            params={{ status: STATUS_UAA.PUBLISHED, type: 'NORMAL', serviceId }}
            labelPath='code'
            labelPath2='name'
            valuePath='id'
            required
            readOnly={isView}
            disabled={!isView && !watch(`apiSubMenuRefs.${index}.service`)}
            exceptValues={listExceptValue}
          />
        </Box>
      </Grid>
      {isView ? (
        <></>
      ) : (
        <Grid item xs={1} className='mt-10'>
          <DynamicActionCustom
            handleAddItem={() =>
              appendApi({
                api: null,
                service: null,
              })
            }
            handleRemoveItem={() => removeApi(index)}
            index={index}
            totalItem={fieldsApi?.length || 0}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default NormalApi
