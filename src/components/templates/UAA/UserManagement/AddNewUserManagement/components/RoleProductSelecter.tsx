import { Box } from '@mui/system'
import React from 'react'
import SelectRoleAutocomplete from './SelectRoleAutocomplete'
import { useUserDetail } from '../useUserDetail'
import DynamicAction from './DynamicAction'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'

const RoleProductSelecter = (props: any) => {
  const { name, append, remove, total, index, control, watch, t } = props
  const { listProduct } = useUserDetail()
  const productId = watch(`${name}.id`)

  return (
    <Box className='flex w-full my-16 gap-15'>
      <CoreAutocomplete
        label={'System'}
        control={control}
        name={`${name}.id`}
        required
        className='w-full'
        valuePath='id'
        labelPath='name'
        returnValueType='enum'
        options={listProduct}
        rules={{
          required: t('common:validation.required'),
        }}
      />
      <SelectRoleAutocomplete
        name={name}
        control={control}
        productId={productId}
        className='w-full'
      />
      <Box className='flex items-center justify-center w-25'>
        <DynamicAction
          totalItem={total}
          index={index}
          handleAddItem={() => append({})}
          handleRemoveItem={() => remove(index)}
        />
      </Box>
    </Box>
  )
}

export default RoleProductSelecter
